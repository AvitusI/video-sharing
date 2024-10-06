import { ChatInput } from "@/app/components/chat/ChatInput";
import { ScrollableChat } from "@/app/components/chat/ScrollableChat"
import { ChatHeader } from "../../../../../components/chat/ChatHeader";

export default function Page() {

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex items-center w-full">
        <ChatHeader />
      </div>
      <div className="flex flex-1 p-4 w-full overflow-hidden">
        <ScrollableChat />
      </div>
      <div className="w-full px-4">
        <ChatInput />
      </div>
    </div>
  );
}
