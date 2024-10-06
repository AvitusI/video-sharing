import { useChatStore } from "@/store/chatStore";


export const getChatStore = () => {

  const chatStore = useChatStore.getState();

  return {
    isSelectedChat: chatStore.isSelectedChat,
    chat: chatStore.selectedChat
  };
};
