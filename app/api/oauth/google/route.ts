import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "@/lib/oauth";
import db from "@/app/lib/db";
import { userTable, oauthAccountTable } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

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

    const codeVerifier = cookies().get("codeVerifier")?.value;
    const savedState = cookies().get("state")?.value;

    if (!codeVerifier || !savedState) {
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

    const { accessToken, accessTokenExpiresAt, refreshToken } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );

    const googleData = (await googleRes.json()) as GoogleUser;

    await db.transaction(async (trx) => {
      const user = await trx.query.userTable.findFirst({
        where: eq(userTable.id, googleData.id),
      });

      if (!user) {
        const createdUserRes = await trx
          .insert(userTable)
          .values({
            email: googleData.email,
            id: googleData.id,
            username: googleData.name,
            profilePictureUrl: googleData.picture,
          })
          .returning({
            id: userTable.id,
          });

        if (createdUserRes.length === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "Failed to create user!",
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
            expiresAt: accessTokenExpiresAt,
            id: googleData.id,
            provider: "google",
            providerUserId: googleData.id,
            refreshToken,
            userId: googleData.id,
          });

        if (createdOAuthAccountRes.rowCount === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "Failed to create OAuth account!",
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
            expiresAt: accessTokenExpiresAt,
            refreshToken,
          })
          .where(eq(oauthAccountTable.id, googleData.id));

        if (updatedOAuthAccountRes.rowCount === 0) {
          trx.rollback();
          return Response.json(
            {
              error: "Failed to update OAuth account!",
            },
            {
              status: 500,
            }
          );
        }
      }
    });

    const session = await lucia.createSession(googleData.id, {
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

    cookies().set("codeVerifier", "", {
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
