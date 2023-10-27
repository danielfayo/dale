import Sidebar from "@/components/navigation/Sidebar";
import { PanelLeft } from "lucide-react";
import React, { useState } from "react";

import { User } from "@/lib/types";
import TopNav from "@/components/navigation/TopNav";

type PageContentLayoutProps = {
  children: React.ReactNode;
  pageName: string;
};

const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  pageName,
}) => {

  return (
    <div>
      <TopNav pageName={pageName} />
      <Sidebar />
      <div className={`pt-6 mx-4 lg:ml-[16rem]`}>
        <span className="text-2xl font-semibold hidden lg:block lg:mb-6">{pageName}</span>
        {children}
      </div>
    </div>
  );
};
export default PageContentLayout;
