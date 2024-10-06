"use client"

import ScrollableFeed from "react-scrollable-feed"

import { useChatStore } from "@/store/chatStore"

export const ScrollableChat = () => {

    const chatMessages = useChatStore((state) => state.chatMessages)

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
                chatMessages.map((message) => (
                    <div 
                        key={message.id}
                        className="bg-green-300 p-2 rounded-md max-w-[300px]"
                    >
                        {message.content}
                    </div>
                ))
                    
            }           
        </ScrollableFeed>
    )
}