"use client";

import useGetProductData from "@/hooks/useGetProductData";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: { productId: string };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { result } = useGetProductData(params.productId);

  return (
    <div className="mt-8 px-4 max-w-[1280px] mx-auto lg:flex lg:gap-4">
      <div className="lg:w-2/3">
        <div className="relative w-full aspect-square max-h-[608px]">
          <Image src={result?.productCoverURL!} alt="" fill objectFit="cover" />
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <Badge variant={"secondary"}>{result?.productCategory}</Badge>
            <span className="text-xl">₦{result?.productPrice}</span>
          </div>
          <div>
            <span className="text-xl">{result?.productName}</span>
            <p className="text-base text-slate-300">{result?.productDesc}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/3">
        <h4 className="text-xl font-semibold">Checkout</h4>
        <span className="text-base opacity-80">
          Please enter your details below.
        </span>
        <div className="my-4 space-y-4">
          <div>
            <label htmlFor="">Email Address</label>
            <Input placeholder="eg. example@email.com" />
          </div>
          <Button className="w-full">Proceed to purchase</Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
