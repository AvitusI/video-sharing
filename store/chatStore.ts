import { create } from "zustand";
import { persist } from "zustand/middleware"
//import { cookies } from "next/headers";

import { SelectChat, SelectUser } from "@/app/lib/db/schema";

interface Message {
  id: string
  content: string
  createdAt: Date
}

interface User {
  user: SelectUser
}

type Chat = SelectChat & {
    users: User[]
} | null


type ChatStrore = {
  isSelectedChat: boolean;
  toggleIsSelectedChat: (value: boolean) => void;
  selectedChat: Chat;
  setSelectedChat: (chat: Chat) => void;
  chatMessages: Message[];
  addChatMessage: (
    id: string,
    content: string,
    createdAt: Date
  ) => void;
};


export const useChatStore = create(
  persist<ChatStrore>((set) => ({
    isSelectedChat: false,
    toggleIsSelectedChat: (value: boolean) => {
      set((state) => ({ ...state, isSelectedChat: value }));
    },
    chatMessages: [],
    addChatMessage: (
      id: string,
      content: string,
      createdAt: Date
    ) => {
      return set((state) => {
        return {
          ...state,
          chatMessages: [
            ...state.chatMessages,
            {
              id,
              content,
              createdAt
            },
          ],
        }
      })
    },
    selectedChat: null,
    setSelectedChat: (
      chat: Chat
    ) => {
      return set((state) => {
        return {
          ...state,
          selectedChat: chat
        }
      })
    }
  }),
  {
    name: "chat-storage",
  }
));
