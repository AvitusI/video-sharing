"use server";

import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { google, github } from "@/lib/oauth";
import { lucia, validateRequest } from "@/lib/auth";

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
