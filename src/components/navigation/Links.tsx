import { Bell, Coins, Home, Package2, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type LinksProps = {
    
};

const Links:React.FC<LinksProps> = () => {

    const linkStyle = "flex gap-2 text-card-foreground items-center text-[18px]"
    
    return (
        <div className='flex flex-col gap-8 mt-10'>
        <Link className={linkStyle} href={""}><Home size={18}/> Home</Link>
        <Link className={linkStyle} href={""}><Package2 size={18}/> Products</Link>
        <Link className={linkStyle} href={""}><Coins size={18}/> Transactions</Link>
        <Link className={linkStyle} href={""}><Bell size={18}/> Notifications</Link>
        <Link className={linkStyle} href={""}><Settings size={18}/> Settings</Link>
        </div>
    )
}
export default Links;