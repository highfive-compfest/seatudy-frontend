import Link from "next/link";
import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa6";
import { IoIosArrowDown, IoMdPerson } from "react-icons/io";
import { MdLogout } from "react-icons/md";

const links = [
    {
        href : "/topup",
        content : 6000,
        icon : <FaMoneyBill size={20}/>
    },
    {
        href : "/profile",
        content : "Profile",
        icon : <IoMdPerson size={20}/>
    },
]

export const ProfileIcon = () => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className="relative">
            <button className="flex gap-1 items-center" onClick={()=>setOpen(!isOpen)}>
                <div 
                    style={{ backgroundImage : "url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg')" }} 
                    className="h-10 w-10 rounded-full bg-cover border-2 border-black"/>
                <IoIosArrowDown size={20}/>
            </button>
            <div className={`${isOpen?'block':'hidden'} absolute flex flex-col bg-gray-100 top-12 -left-10 rounded-lg overflow-hidden`}>
                {links.map((link, idx)=>(
                    <Link key={idx} href={link.href}>
                        <div className={`${link.href === "/topup"?"border-b-[3px]":"border-b-0"} items-center flex gap-2 px-4 py-2 hover:bg-gray-200`}>
                            {link.icon}
                            <span>{link.content}</span>
                        </div>
                    </Link>
                ))}
                <button className="flex gap-2 px-4 py-2 items-center hover:bg-gray-200 text-red-500">
                    <MdLogout/>
                    <span className="text-nowrap">Log Out</span>
                </button>
            </div>
        </div>
    )
};
