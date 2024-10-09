import { create } from "zustand";
import { persist } from "zustand/middleware"

import { SelectChat, InsertUser, InsertMessage, InsertChat } from "@/app/lib/db/schema";

export type Message = InsertMessage & {
  chat: InsertChat & {
    users: {
      user: InsertUser
    }[]
  }
}


export type ChatType = {
  chat: SelectChat & {
    users: {
      user: InsertUser
    }[]
  } 
} | null


type ChatStrore = {
  isSelectedChat: boolean;
  toggleIsSelectedChat: (value: boolean) => void;
  selectedChat: ChatType;
  setSelectedChat: (chat: ChatType) => void;
  chatMessages: Message[];
  addChatMessage: (
    message: Message
  ) => void;
  addChatMessages: (
    messages: Message[]
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
      message: Message
    ) => {
      return set((state) => {
        return {
          ...state,
          chatMessages: [
            ...state.chatMessages,
            message
          ],
        }
      })
    },
    selectedChat: null,
    setSelectedChat: (
      chat: ChatType
    ) => {
      return set((state) => {
        return {
          ...state,
          selectedChat: chat
        }
      })
    },
    addChatMessages: (
      messages: Message[]
    ) => {
      return set((state) => {
        if (messages.length === 0) {
          return state
        }
        return {
          ...state,
          chatMessages: [
            //...state.chatMessages, // This is because we won't need previous chat messages
            ...messages
          ]
        }        
      })
    }
  }),
  {
    name: "chat-storage",
  }
));
