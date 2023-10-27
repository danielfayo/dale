import PageContentLayout from "@/layouts/PageContentLayout";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <PageContentLayout pageName="Products">
      <div className="grid grid-rows-2 grid-cols-2 gap-4 lg:flex">
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>Total Revenue</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>Today</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>This week</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>This month</span>
        </div>
      </div>
    </PageContentLayout>
  );
};
export default page;
