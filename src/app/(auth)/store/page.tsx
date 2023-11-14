"use client";

import StoreInputs from "@/components/auth/StoreInputs";
import { toast } from "@/components/ui/use-toast";
import { auth, firestore } from "@/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userDocRef = doc(firestore, "users", user?.uid!);
      await updateProfile({
        displayName: name,
        photoURL: `https://robohash.org/${name}?set=set4&&bgset=bg2`,
      });
      await updateDoc(userDocRef, {
        providerData: [
          {
            ...user?.providerData[0],
            displayName: name,
            photoURL: `https://robohash.org/${name}?set=set4&&bgset=bg2`,
          },
        ],
      });
      toast({ title: "Details updated successfully" });
      router.push("/overview");
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.log(error);
    }
  };

  return (
    <StoreInputs
      name={name}
      handleChange={handleChange}
      onSubmit={handleSubmit}
      loading={updating}
    />
  );
};
export default Page;
