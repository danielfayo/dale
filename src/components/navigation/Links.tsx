"use client"

import { Bell, Coins, Home, Package2, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type LinksProps = {
    
};

const Links:React.FC<LinksProps> = () => {
    const pathName = usePathname()

    const linkStyle = "flex gap-2 text-card-foreground items-center text-[18px]"
    
    return (
        <div className='flex flex-col gap-8 mt-10'>
        <Link className={`${linkStyle}  ${pathName === "/overview" && "text-primary"}`} href={"/overview"}><Home size={18}/> Home</Link>
        <Link className={`${linkStyle}  ${pathName === "/products" && "text-primary"} ${pathName === "/createproduct" && "text-primary"} ${pathName.split("/").includes("products") && "text-primary"} ${pathName.split("/").includes("editproduct") && "text-primary"}`} href={"/products"}><Package2 size={18}/> Products</Link>
        <Link className={linkStyle} href={""}><Coins size={18}/> Transactions</Link>
        <Link className={linkStyle} href={""}><Bell size={18}/> Notifications</Link>
        <Link className={`${linkStyle}  ${pathName === "/settings" && "text-primary"}`} href={"/settings"}><Settings size={18}/> Settings</Link>
        </div>
    )
}
export default Links;