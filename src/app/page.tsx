"use client"

import { fetchUserDetails } from '@/firebase/fetchUserDetails';
import PageContentLayout from '@/layouts/PageContentLayout'

export default function Home() {
  const { userDetails } = fetchUserDetails();
  return (
    <PageContentLayout userDetails={userDetails}>
      <div className=''>
hey
      </div>
    </PageContentLayout>
  )
}
