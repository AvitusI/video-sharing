"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type ButtonProps = {
  type: string;
};

export const CustomButton = ({ type }: ButtonProps) => {
  const router = useRouter();

  const uploadPhoto = () => router.push("/upload/photo");

  const uploadVideo = () => router.push("/upload/video");

  return (
    <>
      {type === "video" ? (
        <Button onClick={uploadVideo}>Upload video</Button>
      ) : (
        <Button onClick={uploadPhoto}>Upload photo</Button>
      )}
    </>
  );
};
