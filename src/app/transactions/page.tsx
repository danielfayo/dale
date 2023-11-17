"use client";

import useGetTransactionData from "@/hooks/useGetTransactions";
import PageContentLayout from "@/layouts/PageContentLayout";
import React, { useEffect, useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const [user] = useAuthState(auth)
  const { result, loadingTransactions } = useGetTransactionData();
  const { totalRev } = useGetTotalRevenue();
  const [order, setOrder] = useState("newest");
  const router = useRouter()

  useEffect(()=> {
    if (user === null){
      router.push("/signin")
    }
  }, [user])

  const sortedTransactions = result
    ?.map((eachTransaction) => ({
      ...eachTransaction,
      date: eachTransaction.time.seconds,
    }))
    .sort((a, b) => order === "newest" ? b.date - a.date : a.date - b.date);

  return (
    <PageContentLayout pageName="Transactions">
      <div className="mb-12 flex flex-col gap-4">
        <span>Account Balance</span>
        {loadingTransactions ? (
          <Skeleton className="w-[200px] h-[50px]" />
        ) : (
          <span className="text-4xl font-semibold">₦ {totalRev}</span>
        )}
      </div>
      <>
        <div className="flex gap-4 mb-4">
          <Button
            className="text-xs py-1 rounded-full"
            onClick={() => setOrder("newest")}
            variant={`${order === "newest" ? "secondary" : "ghost"}`}
          >
            Newest First
          </Button>{" "}
          <Button
            className="text-xs py-1 rounded-full"
            onClick={() => setOrder("oldest")}
            variant={`${order === "oldest" ? "secondary" : "ghost"}`}
          >
            Oldest First
          </Button>
        </div>
        {loadingTransactions ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((each) => (
              <div key={each}>
                <Skeleton className="w-full h-[32px]" />
              </div>
            ))}
          </div>
        ) : (
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
                <>
                  {result?.length! > 0 ? (
                    <>
                      {sortedTransactions?.map((each, index) => (
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
                    </>
                  ) : (
                    <div className="mt-4 ">
                      <span className="opacity-80 text-xl">
                        You have no transactions yet
                      </span>
                    </div>
                  )}
                </>
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </>
    </PageContentLayout>
  );
};
export default Page;
