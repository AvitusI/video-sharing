"use client";

import { useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { FaUpload } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      className="flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50"
    >
      <input {...getInputProps()} id="imageUrl" className="cursor-pointer" />
      {imageUrl ? (
        <div className="flex">
          <Image
            src={imageUrl}
            alt="image"
            width={400}
            height={300}
            className="object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col text-center pt-12 border-dashed border-2 border-gray-300 rounded-md h-full">
          <FaUpload size={32} className="inline" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-12 mb-4">.png or .jpg extensions</p>
          <Button className="rounded-md" size="sm">
            Select From Computer
          </Button>
        </div>
      )}
    </div>
  );
}
