"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { toast } from "../ui/use-toast";
import { updateProfile } from "firebase/auth";
import { Loader2 } from "lucide-react";

type ProfileTabProps = {};

const ProfileTab: React.FC<ProfileTabProps> = () => {
  const [user] = useAuthState(auth);
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>()
  const profilePhotoRef = useRef<HTMLInputElement>(null);

  const onSelectProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setProfilePhoto(readerEvent.target.result as string);
      }
    };
  };

  useEffect(() => {
    setStoreName(user?.displayName!);
  }, [user]);

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStoreName(event.target.value);
  };

  const handleUpadateName = () => {
    if (storeName.length < 4) {
      return toast({
        title: "Store name should be more than four characters",
        variant: "destructive",
      });
    }
    setLoading(true);
    try {
      updateProfile(user!, {
        displayName: storeName,
        photoURL: user?.photoURL,
      });
      toast({ title: "Store name updated successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="mt-8">
        <span className="text-base">Store Logo</span>

        <div className="relative w-24 h-24 mt-4 rounded-full mx-auto md:ml-0">
          {!profilePhoto ? (
            <Image
              src={user?.photoURL as string}
              alt="profile photo"
              fill
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <Image
              src={profilePhoto as string}
              alt="profile photo"
              fill
              objectFit="cover"
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>
        {/* <Button className="w-full mt-4 md:w-fit" variant={"secondary"} onClick={() => profilePhotoRef.current?.click()}>
          Change store image
        </Button> */}
        <Button className="w-full mt-4 md:w-fit" variant={"secondary"} onClick={() => profilePhotoRef.current?.click()}>
          Change store image
        </Button>
        <input type="file" hidden ref={profilePhotoRef} onChange={onSelectProfileImage} />
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
      <Button
        onClick={handleUpadateName}
        disabled={storeName === user?.displayName}
        variant={"secondary"}
        className="w-full md:w-fit mt-8"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : "Save"}
      </Button>
    </>
  );
};
export default ProfileTab;
