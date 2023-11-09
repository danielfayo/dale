"use client";

import SigninInputs from "@/components/auth/SigninInputs";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const [user] = useAuthState(auth)
    const router = useRouter()
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  useEffect(()=> {
    if (user?.uid){
      router.push("/overview")
    }
  },[user])

  const [signInWithEmailAndPassword, userCred, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [formError, setFormError] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSigninForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      signInWithEmailAndPassword(signinForm.email, signinForm.password);
      router.push("/overview")
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <>
      <SigninInputs
        handleChange={handleChange}
        onSubmit={handleSubmit}
        signinForm={signinForm}
        loading={loading}
      />
    </>
  );
};
export default Page;
