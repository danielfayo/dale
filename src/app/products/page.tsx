"use client";

import useFetchProducts from "@/hooks/useFetchProducts";
import PageContentLayout from "@/layouts/PageContentLayout";
import Image from "next/image";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const { productSnippets, loading } = useFetchProducts();

  return (
    <PageContentLayout
      pageName="Products"
      other={
        <div className="flex ">
          <Link
            href={"/createproduct"}
            className={`mr-4 hidden md:flex ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <PlusCircle size={18} className="mr-2" />
            Create new product
          </Link>
          <Link
            href={"/createproduct"}
            className={`mr-2 md:hidden ${buttonVariants({
              variant: "outline",
            })}`}
          >
            <PlusCircle size={18} />
          </Link>
        </div>
      }
    >
      {loading ? (
        <div className="flex flex-col gap-y-4 gap-x-8 sm:grid sm:grid-cols-2 sm:grid-rows-2">
          {[1, 2, 3, 4, 5, 6].map((each) => (
            <div className="space-y-2" key={each}>
              <Skeleton className="w-full h-60" />
              <div className="space-y-2">
                <Skeleton className="h-[20px] w-[60px]" />
                <div className="flex items-center justify-between">
                  <Skeleton className="w-[200px] h-[20px]" />
                  <Skeleton className="w-[100px] h-[20px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {productSnippets.length > 0 ? (
            <div className="flex flex-col gap-y-4 gap-x-8 sm:grid sm:grid-cols-2 sm:grid-rows-2">
              {productSnippets.map((prod, index) => (
                <Link
                  href={`/products/${prod.productId}`}
                  key={index}
                  className="w-full cursor-pointer group"
                >
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
          ) : (
            <div className="flex flex-col bg-card p-12 items-center rounded-lg">
              {/* <Image
            alt="empty"
            src="/assets/empty0.svg"
            width={200}
            height={200}
          /> */}
              <span className="text-2xl pb-4 text-center opacity-80">
                You no products yet
              </span>
              <Link className={`${buttonVariants()}`} href={"/createproduct"}>
                Create a new product
              </Link>
            </div>
          )}
        </>
      )}
    </PageContentLayout>
  );
};
export default Page;
