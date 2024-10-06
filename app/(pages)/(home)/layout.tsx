import { SidebarWrapper } from "@/app/components/SidebarWrapper";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex">
      <SidebarWrapper />
      <div>{props.children}</div>
    </div>
  );
}
