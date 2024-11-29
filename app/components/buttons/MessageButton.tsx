"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { startChat } from "@/app/actions/chat.actions"
import { useChatStore, ChatType } from "@/store/chatStore"

interface MessageButtonProps {
    id: string
}

export const MessageButton = ({
    id
}: MessageButtonProps) => {

    const toggleIsSelectedChat = useChatStore((store) => store.toggleIsSelectedChat);
    const setSelectedChat = useChatStore((store) => store.setSelectedChat)

    const router = useRouter();

    const initiateChat = async () => {
        const chat = await startChat(id) as ChatType
        toggleIsSelectedChat(true)
        setSelectedChat(chat)
        router.push(`/messages/${chat?.chat.id}`)
    }
 
    return (
        <Button
            size="lg" 
            className="bg-green-500 text-white hover:bg-green-400 h-8 rounded-full"
            onClick={initiateChat}
        >
            Message
        </Button>
    )
}