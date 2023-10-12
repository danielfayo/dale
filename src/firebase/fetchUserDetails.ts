"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./clientApp";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";

export const fetchUserDetails = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const docRef = doc(firestore, "users", `${user?.uid}`);

  useEffect(()=> {
    handleFetchData()
  }, [user])

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const docSnapshot = await getDoc(docRef);
      const docData = docSnapshot.data();
      if (docData) {
        setData(docData as User);
      }
    } catch (error: any) {
        setError(error)
    }
    setLoading(false)
  };

  return {data, loading, error}
};
