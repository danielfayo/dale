"use client"

import React from 'react';
import { buttonVariants } from '../ui/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Link from 'next/link';

type LandingButtonProps = {
    
};

const LandingButton:React.FC<LandingButtonProps> = () => {
    const [user] = useAuthState(auth)
    
    return <div>
        <Link href={user ? "/overview" : "register"} className={`mt-4 w-full md:w-fit ${buttonVariants({variant: "default"})}`}>Start selling</Link>
    </div>
}
export default LandingButton;