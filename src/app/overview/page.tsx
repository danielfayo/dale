"use client";

import { buttonVariants } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { auth } from "@/firebase/clientApp";
import useFetchProducts from "@/hooks/useFetchProducts";
import useGetTransactionData from "@/hooks/useGetTransactions";
import PageContentLayout from "@/layouts/PageContentLayout";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { Coins } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user] = useAuthState(auth);
  const { productSnippets, loading } = useFetchProducts();
  const { result, loadingTransactions } = useGetTransactionData();
  const router = useRouter()

  useEffect(()=> {
    if (user === null){
      router.push("/signin")
    }
  }, [user])

  let totalSales = 0;
  let totalRevenue = 0;
  for (let i = 0; i < productSnippets.length; i++) {
    totalSales += productSnippets[i].sales;
    const productRevenue =
      productSnippets[i].productPrice * productSnippets[i].sales;
    totalRevenue += productRevenue;
  }

  return (
    <PageContentLayout pageName="Home">
      <div className="flex gap-4 mb-8">
        <div className="w-full bg-card rounded-lg p-4 h-40 flex flex-col justify-between">
          <span>Total Revenue</span>
          {loading ? (
            <Skeleton className="w-[100px] h-[20px] rounded-full mb-4" />
          ) : (
            <span className="text-4xl font-semibold mb-4">
              ₦ {totalRevenue}
            </span>
          )}
        </div>
        <div className="w-full bg-card rounded-lg p-4 h-40 flex flex-col justify-between">
          <span>Total Sales</span>
          {loading ? (
            <Skeleton className="w-[100px] h-[20px] rounded-full mb-4" />
          ) : (
            <span className="text-4xl font-semibold mb-4">{totalSales}</span>
          )}
        </div>
      </div>
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((each) => (
            <Skeleton key={each} className="w-full h-[32px] md:h-[64px]" />
          ))}
        </div>
      ) : !productSnippets.length ? (
        <div className="flex flex-col bg-card p-12 items-center rounded-lg">
          {/* <Image
            alt="empty"
            src="/assets/empty0.svg"
            width={200}
            height={200}
          /> */}
          <span className="text-2xl pb-4 text-center opacity-80">
            You have no products yet
          </span>
          <Link className={`${buttonVariants()}`} href={"/createproduct"}>
            Create a new product
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
                <TableCell>{totalRevenue}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}

      <div className="flex flex-col my-6">
        <span className="text-xl">Activites</span>
        {loadingTransactions ? (
          <div className="space-y-4 mt-4">
            {[1, 2, 3, 4, 5].map((each) => (
              <div key={each} className="space-y-2">
                <div className="flex items-center w-full justify-between">
                  <Skeleton className="w-[100px] h-[20px]" />
                  <Skeleton className="w-[100px] h-[20px]" />
                </div>
                <Skeleton className="w-full h-[20px]" />
              </div>
            ))}
          </div>
        ) : result?.length! > 0 ? (
          <div className="flex flex-col gap-4 mt-4">
            {result?.map((res) => (
              <div className="flex flex-col gap-" key={res.transactionId}>
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Coins size={16} className="text-primary" />
                    <span className="opacity-80 text-sm font-normal">
                      New sale
                    </span>
                  </div>
                  <span className="opacity-80 text-sm">
                    {moment(new Date(res.time.seconds * 1000)).format(
                      "DD MM YYYY"
                    )}
                  </span>
                </div>
                <span className="">{res.productName}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card p-4 mt-2 rounded-lg flex justify-center">
            <span className="opacity-80">You have no activites yet</span>
          </div>
        )}
      </div>
    </PageContentLayout>
  );
}
