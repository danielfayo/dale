"use client"

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';

type ProfileTabProps = {
    
};

const ProfileTab:React.FC<ProfileTabProps> = () => {
    const [user] = useAuthState(auth)
    
    return (
        <>
        <div>
            <span className="text-base">Store Logo</span>
            <div className="h-40 w-40 bg-muted rounded-full mt-4 relative">
                <Image src={user?.photoURL as string} alt='profile photo' fill />
            </div>
          </div>
          <div className="mt-8">
            <label htmlFor="">Store Name</label>
            <Input placeholder="e.g Declan Rice" />
          </div>
          <div className="mt-8">
            <label>Bio</label>
            <Textarea placeholder="Your bio goes here" />
          </div>
          <Button>Save</Button>
        </>
    )
}
export default ProfileTab;