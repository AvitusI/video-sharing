import Image from "next/image"

import { Button } from "@/components/ui/button"

export const FollowingCard = () => {
    return (
        <div className="relative w-[200px] h-[200px]">
                <video src="/videos/v1.mp4" autoPlay loop className="w-[200px] h-[200px] object-cover rounded-lg overflow-hidden"/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                        <Image
                            src="/images/her.jpg"
                            alt=""
                            width={56}
                            height={56}
                            className="size-14 object-cover rounded-full"
                        />
                        <span className="text-xl text-white">Anna Paul</span>
                        <Button size="sm" className="bg-green-500 uppercase hover:bg-green-400">follow</Button>
                    </div>
                </div>
        </div>
    )
}