"use client";

import { useState } from "react";
import { Form, FormControl, FormField } from "@/components/ui/form";

//import { useUploadThing } from "@/lib/uploadthing";
import { VideoUploader } from "./VideoUploader";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function VideoForm() {
  const [files, setFiles] = useState([]);

  //const { startUpload } = useUploadThing("imageUploader");

  const form = useForm();

  const doSubmit = async (values: any) => {
    const uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      // const uploadedImages = await startUpload(files);

      const formData = new FormData();
      formData.append("file", uploadedImageUrl);

      try {
        const response = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!data) {
          return;
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(doSubmit)}>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormControl>
              <VideoUploader
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            </FormControl>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-300"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
