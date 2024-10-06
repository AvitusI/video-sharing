"use client";

import { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SidebarContext } from "./Sidebar";

interface SidebarItemProps {
  icon: any;
  text: string;
  alert?: any;
  path: string;
}

export const SidebarItem = ({ icon, text, alert, path }: SidebarItemProps) => {
  const { expanded } = useContext(SidebarContext);
  const router = useRouter();
  const pathname = usePathname();

  const active = pathname === path;

  return (
    <li
      onClick={() => router.push(path)}
      className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${
                  active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
            `}
    >
      {icon}
      <span
        className={`
            overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
        `}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`
                    absolute right-2 w-2 h-2 rounded bg-red-500 ${
                      expanded ? "" : "top-2"
                    }
                    `}
        />
      )}

      {!expanded && (
        <div
          className="absolute left-full rounded-md px-2 py-1 ml-6
                   bg-indigo-100 text-indigo-800 text-sm invisible
                   opacity-20 -translate-x-3 transition-all group-hover:visible
                   group-hover:opacity-100 group-hover:translate-x-0"
        >
          {text}
        </div>
      )}
    </li>
  );
};
