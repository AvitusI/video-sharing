import Image from "next/image"
import { Bookmark, EllipsisVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LikeButton } from "../buttons/LikeButton";
import { CommentButton } from "../buttons/CommentButton";

import { VideoPost } from "../VideoPost";

type FeedVideoProps = {
    id: string;
    name: string;
    avatar: string;
    src: string;
    likes: any[],
    userId: string // Logged in user
}

export const FeedVideo = ({
    id,
    name,
    avatar,
    src,
    likes,
    userId
}: FeedVideoProps) => {

    const isVideoLiked = likes.some((liker) => liker.liker.id === userId)

    return (
        <div className="">
                <div className="relative max-w-[360px] h-[70vh] flex flex-col justify-center bg-black rounded-lg">
                    <VideoPost src={src} />
                    <div className="absolute max-w-[360px] h-[70vh] flex flex-col justify-between rounded-lg p-2 w-full">
                        <div className="flex justify-between w-full">
                            <div className="flex justify-start items-center gap-4 cursor-pointer z-40">
                                <Image
                                    src={avatar}
                                    width={48}
                                    height={48}
                                    alt=""
                                    className="rounded-full object-cover size-12"
                                />
                                <span className="text-large text-white">{name}</span>
                            </div>
                            <span className="text-white italic font-light">21 h</span>
                        </div>
                        <div className="rounded-lg h-[70px] grid grid-cols-4 text-white z-40">
                            <div className="p-2 flex flex-col items-center">
                                <LikeButton 
                                    videoId={id}
                                    isVideoLiked={isVideoLiked}
                                />
                                <span>{likes.length > 0 ? likes.length : null}</span>
                            </div>
                            <div className="p-2 flex flex-col items-center">
                                <CommentButton videoId={id}/>
                                <span>2</span>
                            </div>
                            <div className="p-2 flex flex-col items-center">
                                <Button size="icon" className="bg-black shadow-none hover:bg-black p-0">
                                    <Bookmark />
                                </Button>
                                <span></span>
                            </div>
                            <div className="p-2 flex flex-col items-center">
                                <Button size="icon" className="bg-black shadow-none hover:bg-black p-0">
                                    <EllipsisVertical />
                                </Button>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}