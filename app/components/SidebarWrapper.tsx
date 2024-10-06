import { Sidebar } from "@/app/components/Sidebar";
import { SidebarItem } from "@/app/components/SidebarItem";
import {
  SquareArrowUp,
  Settings,
  Compass,
  UserRoundCheck,
  Users,
  Video,
  Mail,
  CircleUserRound,
} from "lucide-react";

export const SidebarWrapper = () => {
  return (
    <main>
      <Sidebar>
        <SidebarItem
          icon={<SquareArrowUp size={20} />}
          text="For You"
          path="/home"
        />
        <SidebarItem
          icon={<Compass size={20} />}
          text="Explore"
          path="/explore"
        />
        <SidebarItem
          icon={<UserRoundCheck size={20} />}
          text="Following"
          path="/following"
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Friends"
          path="/friends"
        />
        <SidebarItem icon={<Video size={20} />} text="LIVE" path="/live" />
        <SidebarItem
          icon={<Mail size={20} />}
          text="Messages"
          path="/messages"
          alert
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<CircleUserRound size={20} />}
          text="Profile"
          path="/profile"
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          path="/settings"
        />
      </Sidebar>
    </main>
  );
};
