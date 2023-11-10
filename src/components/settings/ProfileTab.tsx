"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type ProfileTabProps = {};

const ProfileTab: React.FC<ProfileTabProps> = () => {
  const [user] = useAuthState(auth);
  const [storeName, setStoreName] = useState("")

  useEffect(()=> {setStoreName(user?.displayName!)}, [user])

  const handleStoreNameChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(event.target.value)
  }
  return (
    <>
      <div className="mt-8">
        <span className="text-base">Store Logo</span>
        <div className="h-40 w-40 bg-muted rounded-full mt-4 relative">
          <div className="relative w-32 h-32 mx-auto">
            {user?.photoURL && (
              <Image src={user?.photoURL as string} alt="profile photo" fill />
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="">Store Name</label>
        <Input
          placeholder="e.g Declan Rice"
          defaultValue={user?.displayName!}
          onChange={handleStoreNameChange}
        />
      </div>
      {/* <div className="mt-8">
            <label>Bio</label>
            <Textarea placeholder="Your bio goes here" />
          </div> */}
      <Button disabled={storeName === user?.displayName} className="w-full md:w-fit mt-8">Save</Button>
    </>
  );
};
export default ProfileTab;
