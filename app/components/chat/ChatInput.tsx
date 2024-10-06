"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
//import axios from "axios"
//import qs from "querystring"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useChatStore } from "@/store/chatStore";
import { EmojiPicker } from "./emoji-picker";

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = () => {
  const addChatMessages = useChatStore((state) => state.addChatMessage)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const id = Math.floor(Math.random() * 10000).toString()
    const content = value.content
    const createdAt = new Date(Date.now())

    addChatMessages(id, content, createdAt);
    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4">
                  <Input
                    disabled={isLoading}
                    className="px-12 py-6 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 rounded-lg"
                    {...field}
                    placeholder="Write something..."
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value}${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
