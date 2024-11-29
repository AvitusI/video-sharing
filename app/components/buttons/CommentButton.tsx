"use client";

import { useRouter } from "next/navigation";
import { MessageSquareText } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CommentButtonProps {
    videoId: string
}

export const CommentButton = ({
    videoId
}: CommentButtonProps) => {

    const router = useRouter();

    return (
        <Button 
            size="icon"
            className="bg-black shadow-none hover:bg-black p-0"
            onClick={() => router.push(`/videos/${videoId}`)}
        >
            <MessageSquareText />
        </Button>
    )
}