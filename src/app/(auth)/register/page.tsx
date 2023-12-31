"use client";

import SignupInputs from "@/components/auth/SignupInputs";
import { toast } from "@/components/ui/use-toast";
import { auth, firestore } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const [user] = useAuthState(auth)
  const [createUserWithEmailAndPassword, userCred, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()

  useEffect(()=> {
    if (user?.uid){
      router.push("/overview")
    }
  },[user])

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    } catch (error) {
      if (error) {
        toast({ title: "Something went wrong", variant: "destructive" });
      }
    }
  };

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", `${user.uid}`);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {

    if (userCred) {
      createUserDocument(userCred.user);
      toast({
        title: "Accout Created Successfully",
      });
      router.push("/store");
    }
  }, [userCred]);

  return (
    <SignupInputs
      handleChange={handleChange}
      signUpForm={signUpForm}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};
export default Page;
