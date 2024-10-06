import Image from "next/image";
import { CircleArrowLeft, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button";

import { Chat } from "@/app/components/chat/Chat";

const chats = [
  {
    id: 1,
    user: "Kelvin",
    avatar: "/images/img3.jpg",
    latestmessage: "Hello there",
    time: "17:25 PM"
  },
  {
    id: 2,
    user: "Gee",
    avatar: "/images/img4.jpg",
    latestmessage: "Vp G unaendeleaje",
    time: "17:25 PM"
  },
  {
    id: 3,
    user: "Justine",
    avatar: "/images/img5.jpg",
    latestmessage: "Nshakuwa billionaire wa Pie",
    time: "17:25 PM"
  },
  {
    id: 4,
    user: "Hamisi",
    avatar: "/images/img6.jpg",
    latestmessage: "Avi vipi, ufunguo uliacha wapi?",
    time: "17:25 PM"
  },
  {
    id: 5,
    user: "Isaya",
    avatar: "/images/img7.jpg",
    latestmessage: "Nimetumia Next.js. Programming language ni JavaScript.",
    time: "17:25 PM"
  },
  {
    id: 6,
    user: "Isaya",
    avatar: "/images/img7.jpg",
    latestmessage: "Nimetumia Next.js. Programming language ni JavaScript.",
    time: "17:25 PM"
  },
  {
    id: 7,
    user: "Isaya",
    avatar: "/images/img7.jpg",
    latestmessage: "Nimetumia Next.js. Programming language ni JavaScript.",
    time: "17:25 PM"
  }
]

export default function Messages() {
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
      <div id="search" className="mb-6 w-full mt-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="text-gray-500"/>
          </div>
          <input
            placeholder="Search user to message"
            className="focus:ring-green-500 focus:border-green-500 focus:outline-none block w-full pl-10 sm:text-sm border-gray-500 rounded-full p-2 border placeholder:text-xsgray-500"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto gap-2 w-full no-scrollbar">
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            user={chat.user}
            avatar={chat.avatar}
            latestmessage={chat.latestmessage}
            time={chat.time}
          />
        ))}
      </div>
    </div>
  );
}