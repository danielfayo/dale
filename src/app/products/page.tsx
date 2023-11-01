"use client";

import useFetchProducts from "@/hooks/useFetchProducts";
import PageContentLayout from "@/layouts/PageContentLayout";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  const { productSnippets } = useFetchProducts();
  const router = useRouter()

  return (
    <PageContentLayout pageName="Products">
      <div className="flex ">
        <Link href={"/createproduct"} className={`mb-4 ml-auto hidden md:flex ${buttonVariants({variant: "outline"})}`}><PlusCircle size={18} className="mr-2" />Create new product</Link>
        <Link href={"/createproduct"} className={`mb-4 ml-auto md:hidden ${buttonVariants({variant: "outline"})}`}><PlusCircle size={18} /></Link>
      </div>
      <div className="flex flex-col gap-y-4 gap-x-8 sm:grid sm:grid-cols-2 sm:grid-rows-2">
        {productSnippets.map((prod, index) => (
          <Link href={`/products/${prod.productId}`} key={index} className="w-full cursor-pointer group">
            <div className="relative w-full h-60">
              <Image
                src={prod.productCoverURL!}
                fill
                alt="cover image"
                objectFit="cover"
              />
            </div>
            <Badge variant={"secondary"} className="mt-4">
              {prod.productCategory}
            </Badge>
            <div className="flex justify-between mt-2 gap-4">
              <span className="text-base group-hover:underline">
                {prod.productName}
              </span>
              <span className="text-lg">₦{prod.productPrice}</span>
            </div>
          </Link>
        ))}
      </div>
    </PageContentLayout>
  );
};
export default page;
