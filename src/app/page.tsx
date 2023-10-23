"use client";

import { fetchUserDetails } from "@/firebase/fetchUserDetails";
import PageContentLayout from "@/layouts/PageContentLayout";

export default function Home() {
  const { userDetails } = fetchUserDetails();
  return (
    <>Landing Page</>
  );
}
