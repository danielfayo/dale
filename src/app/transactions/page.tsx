"use client";

import useGetTransactionData from "@/hooks/useGetTransactions";
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
import moment from "moment";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import useGetTotalRevenue from "@/hooks/useGetTotalRevenue";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const { result } = useGetTransactionData();
  const { totalRev } = useGetTotalRevenue();

  return (
    <PageContentLayout pageName="Transactions">
      <div className="mb-12 flex flex-col gap-4">
        <span>Account Balance</span>
        <span className="text-4xl font-semibold">₦{totalRev}</span>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result?.map((each, index) => (
              <TableRow key={each.transactionId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{each.customerEmail}</TableCell>
                <TableCell>{each.productName}</TableCell>
                <TableCell>{each.productPrice}</TableCell>
                <TableCell>
                  {moment(new Date(each.time.seconds * 1000)).format(
                    "DD MM YYYY"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </PageContentLayout>
  );
};
export default Page;
