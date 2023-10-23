import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageContentLayout from "@/layouts/PageContentLayout";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <PageContentLayout pageName="Settings">
      {/* profile
            email & password */}
      <div>
        <span className="text-base">Store Logo</span>
        <div className="h-40 w-40 bg-muted rounded-full mt-4"></div>
      </div>
      <div className="mt-8">
        <label htmlFor="">Store Name</label>
        <Input placeholder="e.g Declan Rice" />
      </div>
      <div className="mt-8">
        <label>Socials</label>
        <Textarea placeholder="Your bio goes here" />
      </div>
      <div className="mt-8">
        <label>Old Password</label>
        <Input placeholder="Type your old password here" />
      </div>
      <div className="mt-8">
        <label>New Password</label>
        <Input placeholder="Type your new password here" />
      </div>
      <Button>Save</Button>
    </PageContentLayout>
  );
};
export default page;
