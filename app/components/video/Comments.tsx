"use client"

import { useQuery } from "@tanstack/react-query"

import  { Comment } from "./Comment"
import { CommentInput } from "./CommentInput"
import { getComments } from "@/app/actions/comment.actions"


interface CommentsProps {
    videoId: string
}

export const Comments = ({
    videoId
}: CommentsProps) => {

    const fetchComments = async () => {
        const data = await getComments(videoId)
        return  data
    }

    const { data, isPending, isError } = useQuery({
        queryKey: ["comments", videoId],
        queryFn: fetchComments
    })

    if (isPending) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                Loading comments...
            </div>
        )
    }

    if (isError || !data.success || !data.comments) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                Error fetching comments
            </div>
        )
    }

    return (
        <div className="size-full px-2 flex flex-col items-center">
            <div className="flex items-center justify-center p-4">
                <span className="text-lg">{data.comments.length} comments</span>
            </div>
            <div className="flex flex-1 flex-col overflow-auto size-full">
                {data?.comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        name={comment.user.username}
                        time={comment.createdAt.toString().substring(0, 24)}
                        avatar={comment.user.profilePictureUrl!}
                        content={comment.content}
                        likes={comment.likes}
                    />
                ))}
            </div>
            <div className="w-full">
                <CommentInput videoId={videoId} />
            </div>
        </div>
    )
}