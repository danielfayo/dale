"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { toast } from "../ui/use-toast";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

type ProfileTabProps = {};

const ProfileTab: React.FC<ProfileTabProps> = () => {
  const [user] = useAuthState(auth);
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>();
  const profilePhotoRef = useRef<HTMLInputElement>(null);
  const [updateProfile, updating, error] = useUpdateProfile(auth);

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

  const handleUpdateProfile = async () => {
    if (storeName.length < 4) {
      return toast({
        title: "Store name should be more than four characters",
        variant: "destructive",
      });
    }
    setLoading(true);
    try {
      // let downloadURL = null;
      if (profilePhoto) {
        const profileImageRef = ref(
          storage,
          `productCovers/${user?.uid}/image`
        );
        await uploadString(profileImageRef, profilePhoto!, "data_url");
        const downloadURL = await getDownloadURL(profileImageRef);
        await updateDoc(doc(firestore, `users`, `${user?.uid}`), {
          providerData: [{ ...user?.providerData[0], photoURL: downloadURL }],
        });
        await updateProfile({
          displayName: user?.displayName,
          photoURL: downloadURL
        });
      }

      if (storeName) {
        await updateDoc(doc(firestore, `users`, `${user?.uid}`), {
          providerData: [{ ...user?.providerData[0], displayName: storeName }],
        });
        await updateProfile({
          displayName: storeName,
          photoURL: user?.photoURL,
        });
      }

      // await updateProfile({
      //   displayName: storeName ? storeName : user?.displayName,
      //   photoURL: downloadURL ? downloadURL : user?.photoURL,
      // });

      setProfilePhoto("");
      toast({ title: "Profile updated successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-xl">Update Profile</span>
        {user && (
          <Link
            href={`/store/${user?.uid}`}
            className={`flex items-center w-fit underline ${buttonVariants({
              variant: "link",
            })}`}
          >
            Preview <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      <div className="mt-8">
        <span className="text-base">Store Logo</span>

        <div className="relative w-24 h-24 mt-4 rounded-full">
          {!user?.uid && <Skeleton className="w-24 h-24 rounded-full" />}
          {!profilePhoto ? (
            <Image
              src={user?.photoURL as string}
              alt="profile photo"
              objectFit="cover"
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
        <div className="flex flex-col">
          <Button
            className="w-full mt-4 md:w-fit"
            variant={"secondary"}
            onClick={() => profilePhotoRef.current?.click()}
          >
            Select Image
          </Button>
          {profilePhoto && (
            <Button
              variant={"destructive"}
              className="w-full mt-4 md:w-fit"
              onClick={() => setProfilePhoto("")}
            >
              Remove Image
            </Button>
          )}
        </div>
        <input
          type="file"
          hidden
          ref={profilePhotoRef}
          onChange={onSelectProfileImage}
        />
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
        onClick={handleUpdateProfile}
        disabled={storeName === user?.displayName && !profilePhoto}
        className="w-full md:w-fit mt-8"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Update Profile"
        )}
      </Button>
    </>
  );
};
export default ProfileTab;
