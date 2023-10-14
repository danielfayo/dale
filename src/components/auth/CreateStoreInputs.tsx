import React, {  } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CreateStoreInputsProps = {
    signUpForm: {email: string, password: string}
    handleChange: (event : React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
};

const CreateStoreInputs: React.FC<CreateStoreInputsProps> = ({signUpForm, handleChange, onSubmit}) => {
  
  return (
    <>
      <div className="w-[20rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="mb-6 flex-col flex">
          <span className="text-2xl font-bold">Become a seller on Dale</span>
          <span className="text-sm text-gray-400">
            Please enter your details below to create an account
          </span>
          <span className="text-sm text-gray-400 mt-4">
          Don't want to be a seller?{" "}
          <Link className="text-primary underline underline-offset-2" href={"/createaccount"}>
            Sign Up
          </Link>
        </span>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-1 mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="eg. example@email.com"
              value={signUpForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              placeholder="Enter a password"
              value={signUpForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="mt-8 mb-4 w-full">Create Account</Button>
        </form>

        <span className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link className="text-primary underline underline-offset-2" href={""}>
            Sign In
          </Link>
        </span>
      </div>
    </>
  );
};
export default CreateStoreInputs;