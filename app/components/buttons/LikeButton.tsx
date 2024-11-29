"use client"

import { client } from "../providers/query-provider"
import { useMutation } from "@tanstack/react-query"
import { ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { likeVideo, unLikeVideo } from "@/app/actions/video.actions"

interface LikeButtonProps {
    videoId: string,
    isVideoLiked: boolean
}

export const LikeButton = ({
    videoId,
    isVideoLiked
}: LikeButtonProps) => {

    const likeAction = async () => {
        if (isVideoLiked) {
            const result = await unLikeVideo(videoId);
            return result
        }
        else {
            const result = await likeVideo(videoId);
            return result
        }
    }

    const { mutate } = useMutation({
        mutationFn: likeAction,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ["feed"]
            });
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <Button 
            size="icon" 
            className="bg-black shadow-none hover:bg-black p-0"
            onClick={() => mutate()}
        >
            <ThumbsUp />
        </Button>
    )
}