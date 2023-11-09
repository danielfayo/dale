"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="h-16 flex items-center px-4 w-full">
      <div className="flex justify-between w-full max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold">Dale</h1>
        {user ? (
          <div>
            <Link
              href={"/overview"}
              className={`${buttonVariants({ variant: "default" })}`}
            >
              Go to dashboard
            </Link>
          </div>
        ) : (
          <div className="space-x-2">
            <Link
              href={"/registar"}
              className={`${buttonVariants({ variant: "outline" })}`}
            >
              Registar
            </Link>
            <Link
              href={"/signin"}
              className={`${buttonVariants({ variant: "default" })}`}
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
