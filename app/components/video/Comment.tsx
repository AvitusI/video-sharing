import Image from "next/image"
import { Reply } from "lucide-react"

import { LikeCommentButton } from "../buttons/LikeCommentButton";
import { Button } from "@/components/ui/button";

interface CommentProps {
    id: string
    name: string
    avatar: string
    time: string
    content: string
    likes: any[]
}

export const Comment = ({
    id,
    name,
    avatar,
    time,
    content,
    likes
}: CommentProps) => {
    return (
        <div className="flex flex-col gap-2 my-4">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="flex justify-start items-center gap-4">
                            <Image
                                src={avatar}
                                alt="avatar"
                                width={48}
                                height={48}
                                className="size-12 rounded-full"
                            />
                            <span>{name}</span>
                        </div>
                        <div className="mr-3">
                            <span className="text-sm italic text-gray-500">{time}</span>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm">
                            {content}
                        </span>
                    </div>
                    <div></div>
                </div>
                <div className="grid grid-cols-2 py-2 gap-4">
                    <div className="flex flex-col items-center gap-1">
                        <LikeCommentButton commentId={id} isCommentLiked={true} />
                        <span className="text-sm">{likes.length}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Button
                            className="bg-white shadow-none p-0 text-black hover:bg-slate-200"
                        >
                            <Reply size={16} />
                        </Button>
                        <span className="text-sm">2</span>
                    </div>
                </div>
            </div>
    )
}