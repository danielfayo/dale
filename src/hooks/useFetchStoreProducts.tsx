"use client"

import { firestore } from "@/firebase/clientApp";
import { ProductSnippet } from "@/lib/types";
import { collection, query, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchStoreProducts = (storeId: string) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<ProductSnippet[]>();
    const [error, setError] = useState();

    useEffect(()=>{
        getData()
    }, [])

    const getData = async () => {
        try {
          const productSnippetsRef = collection(firestore, `users/${storeId}/productSnippets`);
          const snippets = query(
            productSnippetsRef,
          );
          const snippetsSnapshot = await getDocs(snippets);
          const snip = snippetsSnapshot.docs.map(doc => ({...doc.data()}))
          setResult(snip as ProductSnippet[])
        } catch (error: any) {
          setError(error);
        }
        setLoading(false);
      };
    
    return {result, loading}
}
export default useFetchStoreProducts;