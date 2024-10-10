"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { categoryEnums } from "../lib/db/schema";
import { postVideo } from "../actions/video.actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { VideoUploader } from "./VideoUploader";


export const VideoForm = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    //resetField , use it to reset the field
    formState: { isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      video: "",
      description: "",
      category: "other",
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
    }
  };

  const doSubmit = async (values: any) => {
    if (files.length > 0) {
      const newUrl = await handleFileUpload(files);
      if (newUrl) {
        values.url = newUrl.fileName;
      }
      console.log(values);
      const video = {
        url: values.url,
        description: values.description ? values.description : null,
        category: values.category,
      }
      const result = await postVideo(video);
      setUploading(false);
      if (result.success) {
        toast({
          variant: "default",
          description: "Video uploaded successfully"
        })
      } else {
        toast({
          variant: "destructive",
          description: result.message
        })
      }
    } else {
        toast({
          variant: "destructive",
          description: "Please select a video to upload"
        })
    }
  };

  return (
    <>
      <div className="h-screen w-screen p-4 sm:p-6 flex gap-3">
        <div className="hidden sm:w-1/3 sm:flex"></div>
        <div className="w-full sm:w-1/3">
          <div className="flex flex-col gap-2 p-2 sm:p-4">
            <h1 className="text-center text-2xl mb-4">Upload Video</h1>
            <form onSubmit={handleSubmit(doSubmit)}>
              <div className="flex flex-col p-2 gap-4">
                <div className="flex justify-center items-center">
                  <Controller
                    name="video"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <VideoUploader
                        onFieldChange={field.onChange}
                        setFiles={setFiles}
                        imageUrl={field.value}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm">
                    Description <span className="italic font-extralight text-gray-600">(Optional)</span> 
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md border-gray-500 focus:border-green-500 focus:outline-none"
                    {...register("description")}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm">Category <span className="italic font-extralight text-gray-600">(Optional)</span></label>
                  <select
                    className="w-full p-2 border rounded-md border-gray-500 focus:border-green-500 focus:outline-none"
                    {...register("category")}
                  >
                    {categoryEnums.enumValues.map((category) => (
                        <option key={category} value={category}>
                          {category === "animeAndComics" ? "Anime & Comics" : category === "singAndDance" ? "Sing & Dance" : category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    className="bg-green-500 hover:bg-green-400 w-full transition ease-in-out duration-300"
                    type="submit"
                    disabled={isSubmitting || uploading}
                  >
                    Submit
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
