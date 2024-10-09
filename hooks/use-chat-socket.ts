import { useEffect } from "react"

import { useSocket } from "@/app/components/providers/socket-provider"
import { useChatStore, Message } from "@/store/chatStore"

type ChatSocketProps = {
    chatKey: string
}

export const useChatSocket = ({
    chatKey
}: ChatSocketProps) => {
    const { socket } = useSocket()
    const addChatMessage = useChatStore((state) => state.addChatMessage)

    useEffect(() => {
        if (!socket) {
            return
        }

        socket.on(chatKey, (message: Message) => {
            addChatMessage(message)
            console.log(JSON.stringify(message, null, " "))
        })

        return () => {
            socket.off(chatKey)
        }
    }, [socket, chatKey, addChatMessage])
}