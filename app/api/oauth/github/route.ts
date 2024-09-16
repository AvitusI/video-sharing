import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { github } from "@/lib/oauth";
import db from "@/app/lib/db";
import { userTable, oauthAccountTable } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { generateId } from "lucia";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return Response.json(
        {
          error: "Invalid request",
        },
        {
          status: 400,
        }
      );
    }

    const savedState = cookies().get("state")?.value;

    if (!savedState) {
      return Response.json(
        {
          error: "Invalid request",
        },
        {
          status: 400,
        }
      );
    }

    if (savedState !== state) {
      return Response.json(
        {
          error: "State mismatch",
        },
        {
          status: 400,
        }
      );
    }

    const { accessToken } = await github.validateAuthorizationCode(code);

    const githubRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    const githubData = (await githubRes.json()) as any;

    await db.transaction(async (trx) => {
      const user = await trx.query.userTable.findFirst({
        where: eq(userTable.id, githubData.id),
      });

      if (!user) {
        const createdUserRes = await trx
          .insert(userTable)
          .values({
            id: githubData.id,
            username: githubData.name,
            profilePictureUrl: githubData.avatar_url,
          })
          .returning({
            id: userTable.id,
          });

        if (createdUserRes.length === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "Failed to create user",
            },
            {
              status: 500,
            }
          );
        }

        const createdOAuthAccountRes = await trx
          .insert(oauthAccountTable)
          .values({
            accessToken,
            id: generateId(15),
            provider: "github",
            providerUserId: githubData.id,
            userId: githubData.id,
          });

        if (createdOAuthAccountRes.rowCount === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "Failed to create OAuth account",
            },
            {
              status: 500,
            }
          );
        }
      } else {
        const updatedOAuthAccountRes = await trx
          .update(oauthAccountTable)
          .set({
            accessToken,
          })
          .where(eq(oauthAccountTable.userId, githubData.id));

        if (updatedOAuthAccountRes.rowCount === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "Failed to update OAuth account",
            },
            {
              status: 500,
            }
          );
        }
      }
    });

    const session = await lucia.createSession(githubData.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    cookies().set("state", "", {
      expires: new Date(0),
    });

    return NextResponse.redirect(
      new URL("/home", process.env.NEXT_PUBLIC_BASE_URL),
      { status: 302 }
    );
  } catch (e: any) {
    return Response.json(
      {
        error: e?.message,
      },
      {
        status: 500,
      }
    );
  }
};
