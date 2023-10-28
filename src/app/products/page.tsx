"use client";

import useFetchProducts from "@/hooks/useFetchProducts";
import PageContentLayout from "@/layouts/PageContentLayout";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  const { productSnippets } = useFetchProducts();

  return (
    <PageContentLayout pageName="Products">
      <div className="grid grid-rows-2 grid-cols-2 gap-4 lg:flex">
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>Total Revenue</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>Sales</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>This week</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>This month</span>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productSnippets.map((each, index) => (
              <TableRow key={index}>
                <TableCell>{each.productName}</TableCell>
                <TableCell>{each.sales}</TableCell>
                <TableCell>{each.sales * each.productPrice}</TableCell>
                <TableCell>{each.productPrice}</TableCell>
              </TableRow>
            ))}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </PageContentLayout>
  );
};
export default page;
