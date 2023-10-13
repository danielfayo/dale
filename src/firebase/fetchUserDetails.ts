"use client";

import { User } from "@/lib/types";
import { updateAllUser } from "@/redux/features/userDetailSlice";
import { AppDispatc } from "@/redux/store";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, firestore } from "./clientApp";

export const fetchUserDetails = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatc>()
  const docRef = doc(firestore, "users", `${user?.uid}`);

  useEffect(()=> {
    if (user){
      handleFetchData()
    }
  }, [user])

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const docSnapshot = await getDoc(docRef);
      const docData = docSnapshot.data();
      if (docData) {
        setData(docData as User);
        dispatch(updateAllUser(docData as User))
      }
    } catch (error: any) {
        setError(error)
    }
    setLoading(false)
  };

  return {data, loading, error}
};
