"use client"

import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CirclePlay } from "lucide-react";

import { getVideo } from "@/app/actions/video.actions";

interface VideoProps {
    videoId: string;
}


export const Video = ({
    videoId
}: VideoProps) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  
  const fetchVideo = async () => {
    const result = await getVideo(videoId);
    return result
  }

  const { data, isPending, isError } = useQuery({
    queryKey: ["video", videoId],
    queryFn: fetchVideo
  })


  // Update the progress bar as the video plays
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const percent = (currentTime / duration) * 100;
      setProgress(percent);
    }
  };

  // Handle video click to play/pause
  const handleVideoClick = (): void => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle progress bar click to seek video
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = (clickX / progressBar.offsetWidth) * 100;
      const newTime = (percent / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(percent);
    }
  };

  if (isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Just a moment...
      </div>
    )
  }

  if (isError || data.error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Failed to load video
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-[300px] mx-auto my-5 z-30 max-h-[300px] sm:max-w-[500px] sm:max-h-[500px] rounded-lg">
      <video
        ref={videoRef}
        src={data?.video?.url}
        loop
        muted
        playsInline
        className="w-full h-auto max-h-[300px] sm:max-h-[500px] object-cover cursor-pointer rounded-lg"
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate} // Tracks video progress
      />

      {/* Play button overlay */}
      {!isPlaying && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 text-2xl opacity-80 cursor-pointer z-10"
          onClick={handleVideoClick}
        >
          <CirclePlay size={48} />
        </div>
      )}

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-400 cursor-pointer"
        onClick={handleProgressClick} // Seek video when clicked
      >
        <div
          className="h-full bg-green-500"
          style={{ width: `${progress}%` }} // Updates as the video plays
        />
      </div>
    </div>
  );
};
