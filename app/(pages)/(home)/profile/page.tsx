"use client"

import { startChat } from "@/app/actions/chat.actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useChatStore } from "@/store/chatStore";

export default function Profile() {

  const toggleIsSelectedChat = useChatStore((state) => state.toggleIsSelectedChat)
  const setSelectedChat = useChatStore((state) => state.setSelectedChat)
  const selectedChat = useChatStore((state) => state.selectedChat)


  async function chat() {
    const res = await startChat("rgcpy9eq7g4170s")
    if (!res?.success) {
      toast({
        variant: "destructive",
        description: res?.chat ? res?.chat : res?.error
      });
    } else if (res?.success) {
      toast({
        variant: "default",
        description: "Chat retrieved successfully"
      })
      setSelectedChat(res.chat)
      toggleIsSelectedChat(true)
    }
  }

  return (
    <div>
      <Button onClick={chat}>
        Start chat
      </Button>
      {selectedChat && (
        <div>
          {selectedChat.users.map((user) => (
            JSON.stringify(user, null, " ")
          ))}
        </div>
      )}
    </div>
  )
}
