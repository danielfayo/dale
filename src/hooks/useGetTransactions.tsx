"use client";

import { toast } from "@/components/ui/use-toast";
import { firestore } from "@/firebase/clientApp";
import { Product } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const useGetProductData = (collectionId: string) => {
  const [result, setResult] = useState<Product>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, "products"),
        where("productId", "==", `${collectionId}`)
      );
      const snapShot = await getDocs(q)
      const snip = snapShot.docs.map(doc => ({...doc.data()}))
      setResult(snip[0] as Product)
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  return {result, loading};
};
export default useGetProductData;
