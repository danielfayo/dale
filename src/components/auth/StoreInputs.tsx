import React, {  } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

type StoreInputsProps = {
    name: string
    handleChange: (event : React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    loading: boolean
};

const StoreInputs: React.FC<StoreInputsProps> = ({name, handleChange, onSubmit, loading}) => {
  

  return (
    <>
      <div className="w-[20rem] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="mb-6 flex-col flex">
          <span className="text-2xl font-bold">Store Details</span>
          <span className="text-sm text-gray-400">
            Please enter the name of your store
          </span>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-1 mb-4">
            <label htmlFor="name">Store Name</label>
            <Input
              type="text"
              id="name"
              placeholder="eg. Example Store"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <Button disabled={loading} type="submit" className="mt-4 mb-4 w-full">{loading ? (<Loader2 size={16}/>) : "Continue"}</Button>
        </form>
      </div>
    </>
  );
};
export default StoreInputs;
