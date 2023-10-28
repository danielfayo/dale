"use client";

import { auth, firestore } from "@/firebase/clientApp";
import { ProductSnippet } from "@/lib/types";
import { updateProductSnippets } from "@/redux/features/productSnippetsSlice";
import { AppDispatc, useAppSelector } from "@/redux/store";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

const useFetchProducts = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState<any>();

  const productSnippets = useAppSelector(
    (state) => state.productSnippets.productSnippets
  );
  const dispatch = useDispatch<AppDispatc>();

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    setLoading(true);
    try {
      const productSnippetsRef = collection(firestore, `users/${user?.uid}/productSnippets`);
      const snippets = query(
        productSnippetsRef,
      );
      const snippetsSnapshot = await getDocs(snippets);
      const snip = snippetsSnapshot.docs.map(doc => ({...doc.data()}))
      dispatch(updateProductSnippets(snip as ProductSnippet[]))
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  return { productSnippets };
};
export default useFetchProducts;
