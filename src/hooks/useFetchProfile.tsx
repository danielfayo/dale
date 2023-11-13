"use client";

import { firestore } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetchProfile = (userId: string) => {
  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState<User>();
  const [error, setError] = useState();

  useEffect(() => {
    if (userId){
        getData();
    }
  }, [userId]);

  const getData = async () => {
    try {
      const userProfileRef = doc(firestore, "users", `${userId}`);
      const userProfile = await getDoc(userProfileRef);
      setProfile(userProfile.data() as User);
    } catch (error: any) {
      setError(error);
    }
    setFetching(false);
  };

  return { profile, fetching };
};
export default useFetchProfile;
