"use client"

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { ChatInput } from "@/app/components/chat/ChatInput";
import { ScrollableChat } from "@/app/components/chat/ScrollableChat"
import { ChatHeader } from "../../../../../components/chat/ChatHeader";

import { useQuery } from "@tanstack/react-query";
import { useChatStore } from "@/store/chatStore";
import qs from "querystring"
import axios from "axios"

export default function Page() {

  const params = useParams()

  const chatId = params?.chatId;

  const addChatMessages = useChatStore((state) => state.addChatMessages)

  const fetchMessages = async () => {
    const query = qs.stringify({
      chatId
    });

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/?${query}`
      const { data } = await axios.get(url);
      return data;
  }

  const { data, status, error } = useQuery({
    queryKey: [`${chatId}/messages`],
    queryFn: fetchMessages,
    refetchInterval: 1000
  })

  useEffect(() => {
    addChatMessages(data?.messages || [])
  }, [addChatMessages, data])

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex items-center w-full">
        <ChatHeader />
      </div>
      <div className="flex flex-1 p-4 w-full overflow-hidden">
        <ScrollableChat
          chatId={chatId as string} 
          status={status} 
          error={error}
        />
      </div>
      <div className="w-full px-4">
        <ChatInput chatId={chatId as string} />
      </div>
    </div>
  );
}
