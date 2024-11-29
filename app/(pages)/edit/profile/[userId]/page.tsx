"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EditProfileSchema } from "@/app/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormItem,
    FormControl,
    FormField,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageForm } from "@/app/components/ImageForm";

interface EditProfileProps {
    params: {
        userId: string;
    }
}

export default function EditProfile({
    params
}: EditProfileProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof EditProfileSchema>>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            username: "",
            bio: ""
        }
    })

    const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
        console.log(values);
    }

    return (
        <div className="pt-16 h-screen p-6 flex flex-col items-center">
            <span className="text-center text-2xl mb-2">Edit Profile</span>
            <div className="h-full w-full rounded-lg grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2">
                <div className="p-4 flex justify-center items-center">
                    <ImageForm />
                </div>
                <div className="p-6 sm:p-12">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="A little bit about yourself" {...field} className=" h-24 sm:h-60"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
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
                </div>
            </div>
        </div>
    )
}