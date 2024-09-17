"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { google, github } from "@/lib/oauth";
import { generateCodeVerifier, generateState } from "arctic";
import { lucia, validateRequest } from "@/lib/auth";
import { SignUpSchema, SignInSchema } from "../types";
import db from "../lib/db";
import { emailVerificationTable, userTable } from "../lib/db/schema";
import { sendEmail } from "@/lib/mail";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  console.log(values);
  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateId(15);

  try {
    await db.insert(userTable).values({
      id: userId,
      username: values.username,
      email: values.email,
      hashedPassword,
    });

    // generate a random string 6 character long, numerical
    const code = Math.random().toString(36).substring(2, 8);

    await db.insert(emailVerificationTable).values({
      code,
      userId,
      sentAt: new Date(),
      id: generateId(15),
    });

    const token = jwt.sign(
      { email: values.email, code, userId },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      }
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify-email?token=${token}`;

    sendEmail({
      html: `<a href="${url}">Verify your email</a>.`,
      subject: "Verify your email",
      to: values.email,
    });

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (e: any) {
    console.error(e);
    return { error: e?.message };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.email, values.email),
    });

    if (!existingUser) {
      return { error: "User not found!" };
    }

    if (!existingUser.hashedPassword) {
      return { error: "User not found!" };
    }

    const isValidPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      values.password
    );

    if (!isValidPassword) {
      return { error: "Incorrect credentials" };
    }

    if (existingUser.isEmailVerified === false) {
      return { error: "Email not verified!", key: "email_not_verified!" };
    }

    const session = await lucia.createSession(existingUser.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: "Logged in successfully" };
  } catch (e: any) {
    return { error: e?.message };
  }
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return { error: "Unauthorized" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (e: any) {
    return { error: e?.message };
  }
};

export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authorizationURL = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["email", "profile"],
      }
    );

    return {
      success: true,
      data: authorizationURL,
    };
  } catch (e: any) {
    return {
      error: e?.message,
    };
  }
};

export const createGithubAuthorizationURL = async () => {
  try {
    const state = generateState();

    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authorizationURL = await github.createAuthorizationURL(state, {
      scopes: ["user:email"],
    });

    return {
      success: true,
      data: authorizationURL,
    };
  } catch (e: any) {
    return {
      error: e?.message,
    };
  }
};
