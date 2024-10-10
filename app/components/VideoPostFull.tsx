import Image from "next/image"
import { ThumbsUp, MessageSquareText, Bookmark, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

import { VideoPost } from "./VideoPost"

const user = {
    name: "Jane Oceania",
    avatar: "/images/img6.jpg", 
}
const src = "https://d2q3rw0ca832q8.cloudfront.net/videos/12072256_2160_3840_30fps.mp4";

export const VideoPostFull = () => {
    return (
        <div className=" ">
                <div className="relative max-w-[360px] h-[70vh] flex flex-col justify-center bg-black rounded-lg">
                    <VideoPost src={src} />
                    <div className="absolute max-w-[360px] h-[70vh] flex flex-col justify-between rounded-lg p-2 w-full">
                        <div className="flex justify-between w-full">
                            <div className="flex justify-start items-center gap-4 cursor-pointer z-50">
                                <Image
                                    src={user.avatar}
                                    width={48}
                                    height={48}
                                    alt=""
                                    className="rounded-full object-cover size-12"
                                />
                                <span className="text-large text-white">{user.name}</span>
                            </div>
                            <span className="text-white italic font-light">21 h</span>
                        </div>
                        <div className="rounded-lg h-[70px] grid grid-cols-4 text-white z-50">
                            <div className="p-2 flex flex-col items-center">
                                <Button size="icon" className="bg-black shadow-none hover:bg-black p-0">
                                    <ThumbsUp />
                                </Button>
                                <span>4</span>
                            </div>
                            <div className="p-2 flex flex-col items-center">
                                <Button size="icon" className="bg-black shadow-none hover:bg-black p-0">
                                    <MessageSquareText />
                                </Button>
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