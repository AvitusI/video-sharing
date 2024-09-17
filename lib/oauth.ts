import { Google, GitHub } from "arctic";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "https://video-sharing-gamma.vercel.app/api/oauth/google"
);

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
  {
    redirectURI: "https://video-sharing-gamma.vercel.app/api/oauth/github",
  }
);
