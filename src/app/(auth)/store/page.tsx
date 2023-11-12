"use client";

import StoreInputs from "@/components/auth/StoreInputs";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const [name, setName] = useState("");
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const success = await updateProfile({
        displayName: name,
        photoURL: `https://robohash.org/${name}?set=set4&&bgset=bg2`,
      });

      if (success) {
        toast({ title: "Details updated successfully" });
        router.push("/overview")
      }
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
