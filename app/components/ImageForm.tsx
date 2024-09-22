"use client";

import { useState } from "react";
import { Form, FormControl, FormField } from "@/components/ui/form";

import { useUploadThing } from "@/lib/uploadthing";
import { ImageUploader } from "./ImageUploader";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export function ImageForm() {
  const [files, setFiles] = useState([]);

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm();

  const doSubmit = async (values: any) => {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;

      console.log(uploadedImageUrl);
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
              <ImageUploader
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
