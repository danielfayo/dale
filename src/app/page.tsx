"use client";

import { useFetchUserDetails } from "@/firebase/useFetchUserDetails";
import PageContentLayout from "@/layouts/PageContentLayout";

export default function Home() {
  const { userDetails } = useFetchUserDetails();
  return (
    <>Landing Page</>
  );
}
