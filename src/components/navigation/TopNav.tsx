import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Links from "./Links";

type TopNavProps = {
  pageName: string;
  other?: React.ReactNode
};

const TopNav: React.FC<TopNavProps> = ({ pageName, other }) => {
  return (
    <nav className="flex lg:hidden bg-card h-16 justify-between items-center px-4">
      <h1 className="truncate mr-4">{pageName}</h1>
      <div className="flex items-center">
        <div className=" flex items-center">

      {other}
        </div>
      <Sheet>
        <SheetTrigger className="lg:hidden cursor-pointer">
          <Menu />
        </SheetTrigger>
        <SheetContent
          side={"right"}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">dale</h1>
          </div>
          {/* <SidebarContent userDetails={userDetails} /> */}
          <Links/>
        </SheetContent>
      </Sheet>
      </div>
    </nav>
  );
};
export default TopNav;
