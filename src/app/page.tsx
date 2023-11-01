"use client";

import { fetchUserDetails } from "@/firebase/useFetchUserDetails";
import PageContentLayout from "@/layouts/PageContentLayout";

export default function Home() {
  const { userDetails } = fetchUserDetails();
  return (
    <>Landing Page</>
  );
}
