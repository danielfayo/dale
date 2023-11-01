import React, {  } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type SigninInputsProps = {
    signinForm: {email: string, password: string}
    handleChange: (event : React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    loading: boolean
};

const SigninInputs: React.FC<SigninInputsProps> = ({signinForm, handleChange, onSubmit, loading}) => {
  

  return (
    <>
      <div className="w-[20rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="mb-6 flex-col flex">
          <span className="text-2xl font-bold">Sign in to Dale</span>
          <span className="text-sm text-gray-400">
            Please enter your details below to signin
          </span>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-1 mb-4">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="eg. example@email.com"
              value={signinForm.email}
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
              value={signinForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button disabled={loading} type="submit" className="mt-8 mb-4 w-full">{loading ? (<Loader2 size={16}/>) : "Sign In"}</Button>
        </form>

        <span className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link className="text-primary underline underline-offset-2" href={"/register"}>
            Create an account
          </Link>
        </span>
      </div>
    </>
  );
};
export default SigninInputs;
