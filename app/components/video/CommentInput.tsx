"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { postComment } from "@/app/actions/comment.actions";
import { client } from "../providers/query-provider";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EmojiPicker } from "../chat/emoji-picker"

const formSchema = z.object({
    content: z.string().min(1)
})

interface CommentInputProps {
    videoId: string
}

export const CommentInput = ({
    videoId
}: CommentInputProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    type Body = {
        content: string,
        videoId: string
    }

    const sendComment = async ({ content, videoId }: Body) => {      
        const result = await postComment(videoId, content)
        return result
    }

    const { mutate } = useMutation({
        mutationFn: sendComment,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["comments", videoId] })
        },
        onError: (err) => {
            console.error(err)
        }
    })

    const router = useRouter();
    const isLoading = form.formState.isSubmitting;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = { content: values.content, videoId }
        mutate(data);
        form.reset();
        router.refresh();
    }

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
                                        placeholder="Write your comment..."
                                    />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker
                                            onChange={(emoji: string) => field.onChange(`${field.value}${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}