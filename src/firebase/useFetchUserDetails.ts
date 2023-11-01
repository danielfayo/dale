"use client";

import { User } from "@/lib/types";
import { updateAllUser } from "@/redux/features/userDetailSlice";
import { AppDispatc, useAppSelector } from "@/redux/store";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, firestore } from "./clientApp";

export const useFetchUserDetails = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userDetails = useAppSelector((state) => state.userDetails.userDetails);
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
        dispatch(updateAllUser(docData as User))
      }
    } catch (error: any) {
        setError(error)
    }
    setLoading(false)
  };

  return {userDetails, loading, error}
};
