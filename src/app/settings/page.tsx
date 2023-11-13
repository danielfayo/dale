import EmailTab from "@/components/settings/EmailTab";
import PasswordTab from "@/components/settings/PasswordTab";
import ProfileTab from "@/components/settings/ProfileTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageContentLayout from "@/layouts/PageContentLayout";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <PageContentLayout pageName="Settings">
      <Tabs defaultValue="profile" className="w-full md:max-w-[480px]">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab/>
        </TabsContent>
        <TabsContent value="password">
          <PasswordTab/>
        </TabsContent>
        <TabsContent value="email">
          <EmailTab/>
        </TabsContent>
      </Tabs>
    </PageContentLayout>
  );
};
export default page;
