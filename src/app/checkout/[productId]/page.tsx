"use client";

import useGetProductData from "@/hooks/useGetProductData";
import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Timestamp,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { Product, TransactionType } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchProfile from "@/hooks/useFetchProfile";

type PageProps = {
  params: { productId: string };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { result, loadingItem } = useGetProductData(params.productId);
  const { profile } = useFetchProfile(result?.creatorId!);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };


  const handlePurchase = async () => {
    if (!email)return
    setLoading(true);
    try {
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({
          product: result,
          email: email
        }),
      });

      const batch = writeBatch(firestore);
      const productDocRef = doc(firestore, "products", `${result?.productId}`);
      batch.update(productDocRef, { sales: increment(1) });
      const productSnippetDocRef = doc(
        firestore,
        `users/${result?.creatorId}/productSnippets/${result?.productId}`
      );
      batch.update(productSnippetDocRef, { sales: increment(1) });

      const newTransaction: TransactionType = {
        transactionId: nanoid(),
        time: serverTimestamp() as Timestamp,
        productName: result?.productName,
        productPrice: result?.productPrice,
        customerEmail: email,
      };
      const transactionDocRef = doc(
        firestore,
        `users/${result?.creatorId}/transactions/${newTransaction.transactionId}`
      );
      batch.set(transactionDocRef, newTransaction);

      await batch.commit();
      toast({ title: "Purchase Successfull" });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 px-4 max-w-[1280px] mx-auto md:flex md:gap-4">
      <div className="md:w-1/2 lg:w-2/3">
        <div className="relative w-full aspect-square max-h-[608px]">
          {loadingItem ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <Image
              src={result?.productCoverURL!}
              alt="product image"
              fill
              objectFit="cover"
            />
          )}
        </div>
        {loadingItem ? (
          <div className="space-y-4 mt-8">
            <Skeleton className="w-[200px] h-[24px]" />
            <div className="space-y-2">
              {[1, 2, 3].map((each) => (
                <Skeleton key={each} className="h-[20px] w-full" />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <Badge className="w-fit" variant={"secondary"}>
                  {result?.productCategory}
                </Badge>
                <Link
                  href={`/store/${result?.creatorId}`}
                  className="underline hover:text-primary"
                >
                  {profile?.providerData[0].displayName}
                </Link>
              </div>
              <span className="text-xl">₦{result?.productPrice}</span>
            </div>
            <div>
              <span className="text-xl">{result?.productName}</span>
              <p className="text-base opacity-80">{result?.productDesc}</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 md:w-1/2 md:mt-0 lg:w-1/3">
        <h4 className="text-xl font-semibold">Checkout</h4>
        <span className="text-base opacity-80">
          Please enter your details below.
        </span>
        <div className="my-4 space-y-4">
          <div>
            <label htmlFor="email">Email Address</label>
            <Input
              id="email"
              required
              placeholder="eg. example@email.com"
              value={email}
              onChange={handleChangeEmail}
            />
            {!email && <span className="text-xs text-red-400 my-4">Please enter a valid email</span>}
          </div>
          <div className="relative">
            <label htmlFor="">Card Number</label>
            <Input placeholder="eg. 1234 4567 8901 2345" type="number" />
            <div className="w-4 h-4 bg-background absolute bottom-[11px] right-3" />
          </div>
          <div className="relative">
            <label htmlFor="">Expiry Date</label>
            <Input placeholder="eg. 22/11" type="number" />
            <div className="w-4 h-4 bg-background absolute bottom-[11px] right-3" />
          </div>
          <div className="relative">
            <label htmlFor="">CVV</label>
            <Input placeholder="eg. 123" type="number" />
            <div className="w-4 h-4 bg-background absolute bottom-[11px] right-3" />
          </div>
          <Button onClick={handlePurchase} className="w-full">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Purchase"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
