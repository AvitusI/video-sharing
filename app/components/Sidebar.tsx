"use client";

import { useState, createContext } from "react";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  children: React.ReactNode;
}

export const SidebarContext = createContext<any>(false);

export const Sidebar = ({ children }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col bg-green-100 border-r shadow-sm rounded-md ${
          expanded ? "w-[300px]" : "w-[75px]"
        } `}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="/images/logo2.png"
            width={32}
            height={32}
            alt=""
            className={`overflow-hidden transition-all ${
              expanded ? "" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <Image
            src="/images/logo.png"
            width={44}
            height={44}
            alt=""
            className="rounded-md"
          />
          <div
            className={`
                            flex justify-between items-center
                            overflow-hidden transition-all ${
                              expanded ? "w-52 ml-3" : "w-0"
                            }
                        `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};
