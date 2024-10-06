//import NextVideo from "next-video";
//import sample from "@/videos/new-year.mp4";

import { VideoForm } from "@/app/components/VideoForm";

export default function VideoUpload() {
  return (
    <div className="h-screen flex items-center justify-center gap-4">
      <h1>Upload your content</h1>
      <VideoForm />
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
