"use client"

import { useQuery } from "@tanstack/react-query"

import { getReplies } from "@/app/actions/reply.actions"
import { Reply } from "./Reply"

interface RepliesProps {
    commentId: string
}

export const Replies = ({
    commentId
}: RepliesProps) => {

    const fetchReplies = async () => {
        const data = await getReplies(commentId)
        return data
    }

    const { data, isPending, isError } = useQuery({
        queryKey: ["replies", commentId],
        queryFn: fetchReplies
    })

    if (isPending) {
        return (
            <div className="flex h-full w-full justify-center items-center">
                <span>Loading replies...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex h-full w-full justify-center items-center">
                <span>Error fetching replies</span>
            </div>
        )
    }

    if (data?.replies?.length === 0) {
        return (
            <div className="flex h-full w-full justify-center items-center">
                <span className="text-gray-600">Be the first to reply</span>
            </div>
        )
    }

    console.log(data.replies?.length)

    return (
        <div className="flex-col size-full">
            {data?.replies?.map((reply) => (
               <Reply
                    key={reply.id}
                    id={reply.id}
                    name={reply.user.username}
                    time={reply.createdAt.toString().substring(0, 24)}
                    avatar={reply.user.profilePictureUrl!}
                    content={reply.content}
                    likes={reply.likes}
               />
            ))}
        </div>
    )
}