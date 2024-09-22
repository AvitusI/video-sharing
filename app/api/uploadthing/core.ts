import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { validateRequest } from "@/lib/auth";

const uploadBuilder = createUploadthing();

// Auth function is to check on server session and return the user session
const auth = async () => {
  const { session } = await validateRequest();
  return session;
};

// FileRouter for your app, can contain multiple FileRoutes
export const uTrouter = {
  // Define as many FileRoutes as you like, each with a unique
  imageUploader: uploadBuilder({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await auth();

      // If you throw, the user won't be able to upload
      if (!session) throw new UploadThingError("Unauthorized");

      // Whatever returned is accessible in onUploadComplete as `metadata`
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload
      console.log("Upload complete by user with ID", metadata.userId);
      console.log("file url", file.url);

      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
  videoUploader: uploadBuilder({ video: { maxFileSize: "16MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video uploaded by user with ID ", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UTrouter = typeof uTrouter;
