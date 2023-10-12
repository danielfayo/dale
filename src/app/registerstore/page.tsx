"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { auth, firestore } from "@/firebase/clientApp";
import { fetchUserDetails } from "@/firebase/fetchUserDetails";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  const {data} = fetchUserDetails()
  const [storeDetails, setStoreDetails] = useState({
    storeName: "",
    headline: "",
  });
  const [user] = useAuthState(auth);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStoreDetails((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userRef = doc(firestore, "users", `${user?.uid}`);
      await setDoc(
        userRef,
        {
          storeName: storeDetails.storeName,
          storeHeadline: storeDetails.headline,
        },
        { merge: true }
      );
      toast({
        title: "Store Created Succesfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data)

  return (
    <div className="w-[20rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="mb-8 flex-col flex">
        <span className="text-2xl font-bold">Create your store</span>
        <span className="text-sm text-gray-400">
          Please enter details about your store below
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-1 mb-4">
          <label htmlFor="email">Store Name</label>
          <Input
            type="text"
            id="storeName"
            placeholder="eg. Imaculate Store"
            required
            value={storeDetails.storeName}
            onChange={handleChange}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <label htmlFor="headline">Headline</label>
          <Textarea
            placeholder="Type your headline here."
            id="headline"
            required
            value={storeDetails.headline}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="mt-8 mb-4 w-full">
          Create Store
        </Button>
      </form>
    </div>
  );
};
export default page;
