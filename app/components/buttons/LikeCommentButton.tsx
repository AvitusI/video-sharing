"use client"

import { client } from "../providers/query-provider"
import { useMutation } from "@tanstack/react-query"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { likeComment, unLikeComment } from "@/app/actions/comment.actions"


interface LikeButtonProps {
    commentId: string,
    isCommentLiked: boolean
}

export const LikeCommentButton = ({
    commentId,
    isCommentLiked
}: LikeButtonProps) => {


    const likeAction = async () => {
        const result = isCommentLiked ? await unLikeComment(commentId) : await likeComment(commentId);
        return result
    }

    const { mutate } = useMutation({
        mutationFn: likeAction,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ["comments"] // plus videoId
            });
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <Button 
            size="icon" 
            className="bg-white shadow-none p-0 text-black hover:bg-slate-200"
            onClick={() => mutate()}
        >
            <Heart size={16} />
        </Button>
    )
}