"use client"

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { CircleArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button";

import { Chat } from "@/app/components/chat/Chat";
import { ChatType, useChatStore } from "@/store/chatStore";
import { retrieveChats } from "@/app/actions/chat.actions";

const retrieve = async () => {
  const userwithChats = await retrieveChats();
  return userwithChats;
}

export default function Messages() {

  const toggleIsSelectedChat = useChatStore((store) => store.toggleIsSelectedChat)
  const setSelectedChat = useChatStore((store) => store.setSelectedChat)
  const router = useRouter()

  const { data, status, error } = useQuery({
    queryKey: ["chats"],
    queryFn: retrieve
  })

  const onChatSelected = (chat: ChatType) => {
    toggleIsSelectedChat(true)
    setSelectedChat(chat)
    router.push(`/messages/${chat?.chat.id}`)
  }

  return (
    <div className="flex flex-col p-4 gap-2 items-center w-full h-screen">
      <div className="flex justify-end w-full">
        <Button size="icon" className="bg-green-500 text-white hover:bg-green-400">
          <CircleArrowLeft />
        </Button>
      </div>
      <div className="flex w-full">
        <div className="grid grid-cols-custom items-center gap-3">
          <Image
            src="/images/img1.jpg"
            width={64}
            height={64}
            alt=""
            className="rounded-full object-cover size-16"
          />
          <span className="font-semibold text-lg">
            Avy Freeshore
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto gap-2 w-full no-scrollbar mt-6">
        {status === "pending" ? (
          <div className="flex justify-center items-center h-full w-full">
            Loading your chats...
          </div>
        ) : status === "error" ? (
          <div>
            {error.message}
          </div>
        ) : (
          <div>
            {data.result?.chats.map((chat) => {
              const otherUser = chat.chat.users.find((user) => user.user.id !== data.result.id)
              const latestmessage = chat.chat.latestMessage ? chat.chat.latestMessage : "No message yet"
              const DATE_FORMAT = "HH:mm a"

              return (
                <div key={chat.chat.id} onClick={() => onChatSelected(chat)} className="hover:bg-slate-200 rounded-md">
                  <Chat
                    user={otherUser?.user.username as string}
                    avatar={otherUser?.user.profilePictureUrl as string}
                    latestmessage={latestmessage}
                    time={format(new Date(chat.chat.createdAt), DATE_FORMAT)}
                  />
                </div>
              )
              })}
          </div>
        )}
      </div>
    </div>
  );
}
