"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios"
import qs from "querystring"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUser } from "@/app/actions/user.actions";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { EmojiPicker } from "./emoji-picker";

const formSchema = z.object({
  content: z.string().min(1),
});

interface ChatInputProps {
  chatId: string;
}

export const ChatInput = ({
  chatId,
}: ChatInputProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const chatKey = `chat:${chatId}:messages`

  useChatSocket({ chatKey })


  const sendMessage = async (content: string) => {
    const user = await getUser()
    const query = qs.stringify({
      chatId,
      userId: user?.id
    })
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/socket/message/?${query}`
    const { data } = await axios.post(url, { content });
    return data;
  }

  const { mutate } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (msg) => {
      console.log(msg)
    },
    onError: (e) => {
      console.error(e)
    }
  })

  const router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    /*
    const id = Math.floor(Math.random() * 10000).toString()
    const content = value.content
    const createdAt = new Date(Date.now())

    addChatMessages(id, content, createdAt);
    */
    mutate(value.content) 
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
