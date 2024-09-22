//import NextVideo from "next-video";
//import sample from "@/videos/new-year.mp4";

import { S3UploadForm } from "@/app/components/S3UploadForm";

export default function VideoUpload() {
  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <h1>Upload your content</h1>
      <S3UploadForm />
    </div>
  );
}

/*
<div>
      <NextVideo
        src={sample}
        accentColor="green"
        autoPlay={true}
        className="max-w-[400px] h-[400px]"
      />
    </div>
  */
