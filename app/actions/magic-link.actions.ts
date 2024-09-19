"use server";

import { z } from "zod";
import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";

import { MagicLinkSchema } from "../types";
import db from "../lib/db";
import { magicLinkTable, userTable } from "../lib/db/schema";
import { sendEmail } from "@/lib/mail";

const generateMagicLink = async (email: string, userId: string) => {
  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/magic-link?token=${token}`;

  return {
    success: true,
    message: "Magic link generated successfully",
    data: {
      token,
      url,
    },
  };
};

export const signIn = async (values: z.infer<typeof MagicLinkSchema>) => {
  try {
    MagicLinkSchema.parse(values);

    const existedUser = await db.query.userTable.findFirst({
      where: eq(userTable.email, values.email),
    });

    if (existedUser) {
      // generate magic link
      const res = await generateMagicLink(values.email, existedUser.id);

      // save the token
      await db.insert(magicLinkTable).values({
        userId: existedUser.id,
        token: res.data.token,
      });

      // send email
      await sendEmail({
        html: `Sign in with the <a href=${res.data.url}>magic link<a>.`,
        subject: "Magic Link",
        to: values.email,
      });

      return {
        success: true,
        message: "Magic link sent to your email",
        data: null,
      };
    } else {
      // create the user
      const userId = generateId(15);

      await db.insert(userTable).values({
        email: values.email,
        id: userId,
      });

      // magic link generation
      const res = await generateMagicLink(values.email, userId);

      // save the token
      await db.insert(magicLinkTable).values({
        userId,
        token: res.data.token,
      });

      // send email
      await sendEmail({
        html: `Sign in with the <a href=${res.data.url}>magic link</a>.`,
        subject: "Magic Link",
        to: values.email,
      });

      return {
        success: true,
        message: "Magic link sent to your email",
        data: null,
      };
    }
  } catch (e: any) {
    return {
      success: false,
      message: e.message,
      data: null,
    };
  }
};
