"use client";

import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/firebase/clientApp";
import PageContentLayout from "@/layouts/PageContentLayout";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth)
  
  return (
    <PageContentLayout pageName="Home">
      <div className="flex flex-col bg-card p-12 items-center rounded-lg">
        <Image alt="empty" src="/assets/empty0.svg" width={200} height={200} />
        <span className="text-2xl pb-4 text-center text-gray-400">
          You don't have any products yet
        </span>
        <Link className={`${buttonVariants()}`} href={"/createproduct"}>Add a new product</Link>
      </div>
      <div className="flex flex-col mt-6">
        <span className="text-xl">Activites</span>
        <div className="bg-card p-4 mt-2 rounded-lg flex justify-center">
          <span className="text-gray-400">You have no activites yet</span>
        </div>
      </div>
    </PageContentLayout>
  );
}
