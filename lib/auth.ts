import { Lucia } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

import adapter from "@/app/lib/db/adapter";
import { roleEnums } from "@/app/lib/db/schema";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      profile_picture_url: attributes.profilePictureUrl,
      verifiedEmail: attributes.isEmailVerified,
      role: attributes.role,
      username: attributes.username,
    };
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId)
    return {
      user: null,
      session: null,
    };

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }

    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    //...
  }
  return { user, session };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  profilePictureUrl: string;
  isEmailVerified: boolean;
  role: (typeof roleEnums.enumName)[number];
  username: string;
}
