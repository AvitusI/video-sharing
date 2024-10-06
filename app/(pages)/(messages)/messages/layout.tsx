"use client"

import { useChatStore } from "@/store/chatStore";

interface LayoutProps {
  chatbox: React.ReactNode;
  children: React.ReactNode;
}

export default function Layout({ chatbox, children }: LayoutProps) {

  const isSelectedChat = useChatStore((state) => state.isSelectedChat)

  return (
    <div className="h-screen grid grid-cols-customized">
      <div className={`flex items-center justify-center border-r sm:flex ${isSelectedChat ? "hidden" : ""}`}>
        {children}
      </div>
      <div className={`w-full h-full sm:flex ${isSelectedChat ? "" : "hidden"}`}>{chatbox}</div>
    </div>
  );
}
