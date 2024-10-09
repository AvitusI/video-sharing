"use client"

import ScrollableFeed from "react-scrollable-feed"

import { useChatStore, Message } from "@/store/chatStore"

interface ScrollableChatProps {
    chatId?: string
    status?: any
    error?: any
}
 

export const ScrollableChat = ({
    status,
    error
}: ScrollableChatProps) => {

    const chatMessages = useChatStore((state) => state.chatMessages)


    if (status === "pending") {
        return (
            <div className="flex items-center justify-center w-full h-full">
                Loading messages...
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex items-center justify-center w-full h-full">
                Error: {error.message}
            </div>
        )
    }


    if (chatMessages.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                No messages yet
            </div>
        )
    }

    return (
        <ScrollableFeed 
            className="flex flex-col space-y-10 p-2 overflow-y-auto bg-slate-100 rounded-md w-full no-scrollbar"
        >
            {
                chatMessages?.map((message: Message, i: number) => (
                    <div 
                        key={`${message.id}/${i}`}
                        className="bg-green-300 p-2 rounded-md max-w-[300px]"
                    >
                        {message.content}
                    </div>
                ))
                    
            }           
        </ScrollableFeed>
    )
}