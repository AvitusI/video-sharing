"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { VideoIcon } from "lucide-react";

type VideoUploaderProps = {
  imageUrl: string;
  onFieldChange: any;
  setFiles: any;
};

export function VideoUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: VideoUploaderProps) {
  const convertFileToUrl = (file: any) => URL.createObjectURL(file);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, [onFieldChange, setFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [],
    },
    maxSize: 50 * 1024 * 1024,
  });

  return (
    <div
      className={`flex justify-center items-center border border-green-500 border-dashed rounded-md focus:outline-none w-[384px] ${imageUrl ? "h-auto border-none" : "h-[400px]"}`}
      {...getRootProps()}
    >
      <input {...getInputProps} id="image" className="cursor-pointer hidden" />
      {imageUrl ? (
        <video src={imageUrl} autoPlay loop className="w-[384px] h-auto max-h-[500px]" />
      ) : (
        <div className="flex flex-col items-center pt-2 p-4 gap-3">
          <p className="text-sm text-center text-gray-500">
            Drag &apos;n&apos; drop, or click to select video files
          </p>
          <span className="text-xs text-center">
            (max size - 50 Mb)
          </span>
          <VideoIcon size={48} />
        </div>
      )}
    </div>
  );
}
