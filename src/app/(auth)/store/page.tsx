"use client";

import StoreInputs from "@/components/auth/StoreInputs";
import React, { useState } from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <StoreInputs
      name={name}
      handleChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};
export default page;
