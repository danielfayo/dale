"use client";

import PageContentLayout from "@/layouts/PageContentLayout";
import React from "react";
import useGetProductData from "../../../hooks/useGetProductData";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type pageProps = {
  params: { productId: string };
};

const page: React.FC<pageProps> = ({ params }) => {
  const { result } = useGetProductData(params.productId);

  return (
    <PageContentLayout pageName={result?.productName as string}>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger className="mb-4 ml-auto">
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-none">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Product</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-8">
        <div className="relative w-full aspect-square max-h-[608px]">
          <Image src={result?.productCoverURL!} alt="" fill objectFit="cover" />
        </div>
        <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <Badge variant={"secondary"}>{result?.productCategory}</Badge>
            <span className="text-xl">₦{result?.productPrice}</span>
          </div>
          <p className="text-base text-slate-300">{result?.productDesc}</p>
        </div>
      </div>
    </PageContentLayout>
  );
};
export default page;
