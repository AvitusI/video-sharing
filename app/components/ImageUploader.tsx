"use client";

import { useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";

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
    accept: generateClientDropzoneAccept(["image/jpeg", "image/png"]),
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center size-72 cursor-pointer flex-col rounded-md"
    >
      <input {...getInputProps()} id="imageUrl" className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex">
          <Image
            src={imageUrl}
            alt="image"
            width={208}
            height={208}
            className="object-cover object-center size-52 rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center pt-12 border-dashed border-2 border-gray-300 rounded-full size-52">
          <FaUpload size={32} className="inline" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-12 mb-4">.png or .jpg extensions</p>
        </div>
      )}
    </div>
  );
}
