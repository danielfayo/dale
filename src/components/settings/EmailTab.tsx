"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "../ui/use-toast";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/navigation";

type EmailTabProps = {};

const EmailTab: React.FC<EmailTabProps> = () => {
  const [user] = useAuthState(auth);
  const [creds, setCreds] = useState({ password: "", email: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(()=> {
    if (user === null){
      router.push("/signin")
    }
  }, [user])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreds((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleUpdateEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!creds.password) {
      return toast({
        title: "Please fill in all inputs",
        variant: "destructive",
      });
    }

    if (!creds.email) {
      return toast({
        title: "Please fill in all inputs",
        variant: "destructive",
      });
    }
    const credentials = EmailAuthProvider.credential(
      user?.email!,
      creds.password
    );
    setLoading(true);
    try {
      await reauthenticateWithCredential(user!, credentials);
      await updateEmail(user!, creds.email);
      toast({ title: "Password Updated Successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdateEmail}>
      <div className="mt-8">
        <span className="text-xl">Update Email</span>
      </div>
      <div className="mt-8">
        <label>Your Password</label>
        <Input
          required
          type="password"
          id="password"
          placeholder="Password here"
          onChange={handleChange}
        />
      </div>
      <div className="mt-8">
        <label>New Email</label>
        <Input
          required
          type="email"
          id="email"
          placeholder="eg. example@email.com"
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
export default EmailTab;
