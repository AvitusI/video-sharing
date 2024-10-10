import { SidebarWrapper } from "@/app/components/SidebarWrapper";
import { Navbar } from "@/app/components/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex">
      <SidebarWrapper />
      <Navbar />
      <div className="flex-1 h-screen overflow-auto">
        <div>{props.children}</div>
        <div>{props.children}</div>
      </div>      
    </div>
  );
}
