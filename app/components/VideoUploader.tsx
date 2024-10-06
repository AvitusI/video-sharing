"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";

type ImageUploaderProps = {
  imageUrl: string;
  onFieldChange: any;
  setFiles: any;
};

export function ImageUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: ImageUploaderProps) {
  const convertFileToUrl = (file: any) => URL.createObjectURL(file);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [],
    },
    maxSize: 24 * 1024 * 1024,
  });

  return (
    <div
      className="flex justify-center items-center border border-green-500 border-dashed rounded-md focus:outline-none size-40"
      {...getRootProps()}
    >
      <input {...getInputProps} id="image" className="cursor-pointer hidden" />
      {imageUrl ? (
        <video src={imageUrl} autoPlay className="w-[360px] h-[360px]" />
      ) : (
        <div className="flex flex-col items-center pt-2 p-4 gap-3">
          <p className="text-sm text-center">
            Drag &apos;n&apos; drop, or click to select image files
          </p>
          <span className="text-xs text-center text-gray-400">
            (max size - 24 Mb)
          </span>
          <ImagePlus size={36} />
        </div>
      )}
    </div>
  );
}
