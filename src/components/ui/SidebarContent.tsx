import { fetchUserDetails } from '@/firebase/fetchUserDetails';
import Link from 'next/link';
import React from 'react';
import { Button } from './button';
import { User } from '@/lib/types';

type SidebarContentProps = {
    userDetails: User
};

const SidebarContent:React.FC<SidebarContentProps> = ({userDetails}) => {
  
    // console.log(userDetails)
    
    return (
        <>
        {userDetails.typeOfUser === "seller" && (
        <>
          <div className="flex flex-col gap-4 mt-8">
            <Link href={"/"}>Home</Link>
            <Link href={""}>Products</Link>
            <Link href={""}>Payouts</Link>
            <Link href={""}>Notifications</Link>
            <Link href={""}>Settings</Link>
          </div>
          <Button variant="secondary" className="mt-8">
            Create a new product
          </Button>
        </>
      )}
        </>
    )
}
export default SidebarContent;