"use client";

import { toast } from "@/components/ui/use-toast";
import { auth, firestore } from "@/firebase/clientApp";
import { Product, TransactionType } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useGetTransactionData = () => {
  const [result, setResult] = useState<TransactionType[]>();
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [user] = useAuthState(auth)

  useEffect(() => {
    getData()
  }, [user])

  const getData = async () => {
    // setLoadingTransactions(true);
    try {
      const q = query(
        collection(firestore, `users/${user?.uid}/transactions`),
      );
      const snapShot = await getDocs(q)
      const snip = snapShot.docs.map(doc => ({...doc.data()}))
      setResult(snip as TransactionType[])
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoadingTransactions(false);
  };

  return {result, loadingTransactions};
};
export default useGetTransactionData;
