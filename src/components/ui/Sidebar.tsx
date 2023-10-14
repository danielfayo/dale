import { PanelLeft } from "lucide-react";
import React from "react";
import SidebarContent from "./SidebarContent";
import { User } from "@/lib/types";

type SidebarProps = {
  isOpen: boolean
  toggle: () => void
  userDetails: User
};

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggle, userDetails}) => {
  const sellerLinks = [
    "Home",
    "Products",
    "Payouts",
    "Notifications",
    "Settings",
  ];
  const userLinks = ["Library", "Settings"];

  return (
    <nav className={`hidden md:block w-[15rem] bg-card border-r-[1px] border-border p-4 fixed h-screen transition-transform duration-300 ${isOpen ? "block translate-x-[0]" : "translate-x-[-15rem]"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">dale</h1>
        <PanelLeft onClick={toggle} className="cursor-pointer" />
      </div>
      <SidebarContent userDetails={userDetails}/>
    </nav>
  );
};
export default Sidebar;

/* https://robohash.org/example@email.com?set=set4 */
