import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageContentLayout from "@/layouts/PageContentLayout";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/settings/ProfileTab";
import PasswordTab from "@/components/settings/PasswordTab";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <PageContentLayout pageName="Settings">
      <Tabs defaultValue="profile" className="w-full md:max-w-[480px]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab/>
        </TabsContent>
        <TabsContent value="password">
          <PasswordTab/>
        </TabsContent>
      </Tabs>
    </PageContentLayout>
  );
};
export default page;
