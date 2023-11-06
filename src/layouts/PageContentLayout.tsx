import Sidebar from "@/components/navigation/Sidebar";
import { PanelLeft } from "lucide-react";
import React, { useState } from "react";

import { User } from "@/lib/types";
import TopNav from "@/components/navigation/TopNav";

type PageContentLayoutProps = {
  children: React.ReactNode;
  pageName: string;
  other?: React.ReactNode;
};

const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  pageName,
  other,
}) => {
  return (
    <div>
      <TopNav pageName={pageName} other={other} />
      <Sidebar />
      <div className={`pt-6 mx-4 lg:ml-[16rem] lg:w-[calc(100vw-16rem)`}>
        <div className="max-w-[1024px] mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold hidden lg:block lg:mb-6">
              {pageName}
            </span>
            <div className="hidden lg:block">{other}</div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default PageContentLayout;
