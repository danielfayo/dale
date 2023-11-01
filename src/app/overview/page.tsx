"use client";

import { buttonVariants } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from "@/components/ui/table";
import { auth } from "@/firebase/clientApp";
import useFetchProducts from "@/hooks/useFetchProducts";
import PageContentLayout from "@/layouts/PageContentLayout";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const { productSnippets } = useFetchProducts();

  let totalSales = 0;
  for (let i = 0; i < productSnippets.length; i++) {
    totalSales += productSnippets[i].sales;
  }

  return (
    <PageContentLayout pageName="Home">
      <div className="flex gap-4 mb-8">
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>Total Revenue</span>
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40">
          <span>Total Sales</span>
        </div>
      </div>
      {!productSnippets.length ? (
        <div className="flex flex-col bg-card p-12 items-center rounded-lg">
          <Image
            alt="empty"
            src="/assets/empty0.svg"
            width={200}
            height={200}
          />
          <span className="text-2xl pb-4 text-center text-gray-400">
            You don&apos;t have any products yet
          </span>
          <Link className={`${buttonVariants()}`} href={"/createproduct"}>
            Add a new product
          </Link>
        </div>
      ) : (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSnippets.map((each, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Image
                      src={each.productCoverURL!}
                      alt="product cover"
                      width={80}
                      height={80}
                    />
                  </TableCell>
                  <TableCell>{each.productName}</TableCell>
                  <TableCell>{each.sales}</TableCell>
                  <TableCell>{each.sales * each.productPrice}</TableCell>
                  <TableCell>{each.productPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Total</TableCell>
                <TableCell>{totalSales}</TableCell>
                <TableCell>0</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      <div className="flex flex-col mt-6">
        <span className="text-xl">Activites</span>
        <div className="bg-card p-4 mt-2 rounded-lg flex justify-center">
          <span className="text-gray-400">You have no activites yet</span>
        </div>
      </div>
    </PageContentLayout>
  );
}
