import { PanelLeft } from "lucide-react";
import React from "react";
import { User } from "@/lib/types";
import Links from "./Links";

type SidebarProps = {
};

const Sidebar: React.FC<SidebarProps> = () => {

  return (
    <nav className={`hidden lg:block w-[15rem] bg-card border-border p-4 fixed h-screen`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">dale</h1>
      </div>
      <Links/>
    </nav>
  );
};
export default Sidebar;

/* https://robohash.org/example@email.com?set=set4 */
