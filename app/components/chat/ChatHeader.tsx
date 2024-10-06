"use client"

import Image from "next/image"
import { Undo2 } from "lucide-react"

import { useChatStore } from "@/store/chatStore"
import { Button } from "@/components/ui/button"

export const ChatHeader = () => {
    const toggleIsSelectedChat = useChatStore((state) => state.toggleIsSelectedChat)

    const handleClick = () => {
        toggleIsSelectedChat(false)
    }

    return (
        <div className="w-full flex justify-between py-4 px-6">
            <div className="flex justify-start items-center gap-4">
                <div>
                    <Image width={48} height={48} src="/images/her.jpg" alt="avatar" className="object-cover rounded-full size-12"/>
                </div>
                <span>Anne Smith</span>
            </div>
            <div>
                <Button
                    size="icon"
                    className={`bg-green-500 hover:bg-green-400 sm:hidden`}
                    onClick={handleClick}
                >
                    <Undo2 />
                </Button>
            </div>
        </div>
    )
}