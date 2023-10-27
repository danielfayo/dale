"use client";

import SignupInputs from "@/components/auth/SignupInputs";
import { toast } from "@/components/ui/use-toast";
import { auth, firestore } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  const [createUserWithEmailAndPassword, userCred, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()

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
export default page;
