"use client"

import React, { useRef, useState } from "react";
import { CirclePlay } from "lucide-react";

interface VideoPostProps {
    src: string;
}

export const VideoPost = ({
    src
}: VideoPostProps) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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

  return (
    <div className="relative w-full max-w-[360px] mx-auto my-5 z-30">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="w-full h-auto object-cover cursor-pointer"
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
