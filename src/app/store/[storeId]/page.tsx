"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchProfile from "@/hooks/useFetchProfile";
import useFetchStoreProducts from "@/hooks/useFetchStoreProducts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type PageProps = {
  params: { storeId: string };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { profile, fetching } = useFetchProfile(params.storeId);
  const { result, loading } = useFetchStoreProducts(params.storeId);
  
  let totalSales = 0;
  if (result) {
    for (let i = 0; i < result!.length; i++) {
      const element = result![i];
      totalSales += element.sales;
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="h-60 bg-gradient-to-r from-primary to-primary-foreground" />
      <div className="mx-4">
        {fetching ? (
          <>
            <Skeleton className="w-16 h-16 rounded-full -mt-12 mx-auto" />
            <div className="flex flex-col mt-4 gap-2">
              <Skeleton className="w-[100px] h-6 mx-auto" />
              <Skeleton className="w-[100px] h-3 mx-auto" />
            </div>
          </>
        ) : (
          <>
            <div className="relative w-16 h-16 rounded-full -mt-12 mx-auto">
              <Image
                src={profile?.providerData[0].photoURL as string}
                alt="profile photo"
                objectFit="cover"
                fill
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div className="flex flex-col mt-4 text-center">
              <span className="text-xl font-semibold">
                {profile?.providerData[0].displayName}
              </span>
              <span className="text-sm opacity-80">
                {profile?.providerData[0].email}
              </span>
              <span>Total Sales: {totalSales}</span>
            </div>
          </>
        )}

        <div className="mt-8">
          <span className="text-lg font-semibold">Products</span>
          <div className="mt-2">
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
                {result?.length! > 0 ? (
                  <div className="flex flex-col gap-y-4 gap-x-8 sm:grid sm:grid-cols-2 sm:grid-rows-2">
                    {result?.map((prod, index) => (
                      <Link
                        href={`/checkout/${prod.productId}`}
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
                  <div className="flex flex-col bg-card py-12 px-2 items-center rounded-lg">
                    <span className="text-2xl text-center opacity-80">
                      {profile?.providerData[0].displayName} has no products
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
