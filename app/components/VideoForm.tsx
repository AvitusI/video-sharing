"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { ImageUploader } from "./VideoUploader";

export const VideoForm = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const {
    control,
    handleSubmit,
    //resetField , use it to reset the field
    formState: { isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      image: "",
    },
  });

  const handleFileUpload = async (files: any) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUploading(false);
      return data;
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const doSubmit = async (values: any) => {
    if (files.length > 0) {
      const newUrl = await handleFileUpload(files);
      if (newUrl) {
        values.image = newUrl;
      }
      console.log(values);
    }
  };

  return (
    <>
      <div className="h-screen w-screen p-4 sm:p-6 flex gap-3">
        <div className="hidden sm:w-1/3 sm:flex"></div>
        <div className="w-full sm:w-1/3">
          <div className="flex flex-col gap-2 p-2 sm:p-4">
            <h1 className="text-center text-2xl mb-4">Share your photo</h1>
            <form onSubmit={handleSubmit(doSubmit)}>
              <div className="flex flex-col p-2 gap-4">
                <div className="flex justify-center items-center">
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <ImageUploader
                        onFieldChange={field.onChange}
                        setFiles={setFiles}
                        imageUrl={field.value}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    className="bg-orange-500"
                    type="submit"
                    disabled={isSubmitting || uploading}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden sm:w-1/3 sm:flex"></div>
      </div>
    </>
  );
};
