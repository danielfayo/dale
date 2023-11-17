"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type PasswordTabProps = {};

const PasswordTab: React.FC<PasswordTabProps> = () => {
  const [user] = useAuthState(auth);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(()=> {
    if (user === null){
      router.push("/signin")
    }
  }, [user])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleUpdatePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!passwords.oldPassword) {
      return toast({
        title: "Please fill in all inputs",
        variant: "destructive",
      });
    }

    if (!passwords.newPassword) {
      return toast({
        title: "Please fill in all inputs",
        variant: "destructive",
      });
    }
    const credentials = EmailAuthProvider.credential(
      user?.email!,
      passwords.oldPassword
    );
    setLoading(true);
    try {
      await reauthenticateWithCredential(user!, credentials);
      await updatePassword(user!, passwords.newPassword);
      toast({ title: "Password Updated Successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdatePassword}>
      <div className="mt-8">
        <span className="text-xl">Update Password</span>
      </div>
      <div className="mt-8">
        <label>Old Password</label>
        <Input
          required
          type="password"
          id="oldPassword"
          placeholder="Old password here"
          onChange={handleChange}
        />
      </div>
      <div className="mt-8">
        <label>New Password</label>
        <Input
          required
          type="password"
          id="newPassword"
          placeholder="New password here"
          onChange={handleChange}
        />
      </div>

      <Button className="mt-8 w-full md:w-fit">
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          "Update Password"
        )}
      </Button>
    </form>
  );
};
export default PasswordTab;
