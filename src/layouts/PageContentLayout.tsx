"use client";

import Sidebar from "@/components/ui/Sidebar";
import { PanelLeft } from "lucide-react";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarContent from "@/components/ui/SidebarContent";

type PageContentLayoutProps = {
  children: React.ReactNode;
};

const PageContentLayout: React.FC<PageContentLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggle = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div>
      <Sidebar isOpen={sidebarOpen} toggle={handleToggle} />
      <div
        className={`${
          sidebarOpen ? "w-[calc(100vw - 15rem)] md:ml-[16rem]" : "ml-12"
        } transition-transform duration-300  pt-6 ml-12`}
      >
        <Sheet>
          <SheetTrigger className="md:hidden cursor-pointer fixed top-6 left-4">
            <PanelLeft />
          </SheetTrigger>
          <SheetContent side={"left"} className="w-[15rem] bg-card border-r-[1px] border-border p-4 fixed h-screen transition-transform duration-300">
            <nav
              // className={`w-[15rem] bg-card border-r-[1px] border-border p-4 fixed h-screen transition-transform duration-300 "
              // }`}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">dale</h1>
              </div>
              <SidebarContent />
            </nav>
          </SheetContent>
        </Sheet>

        {!sidebarOpen && (
          <PanelLeft
            className="cursor-pointer fixed top-6 left-4 text-card-foreground hidden md:block"
            onClick={handleToggle}
          />
        )}
        {children}
      </div>
    </div>
  );
};
export default PageContentLayout;
