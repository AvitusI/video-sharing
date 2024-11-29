import { ThumbsUp } from "lucide-react"
import Image from "next/image"

interface ReplyProps {
    id: string
    name: string
    time: string
    avatar: string
    content: string
    likes: any[]
}

export const Reply = ({
    id,
    name,
    time,
    avatar,
    content,
    likes
}: ReplyProps) => {
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
                <div className="grid grid-cols-1 py-2 gap-4">
                    <div className="flex flex-col items-center gap-1">
                        <ThumbsUp size={16}/>
                        <span className="text-sm">{likes.length}</span>
                    </div>
                </div>
            </div>
    )
}