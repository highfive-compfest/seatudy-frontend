"use client"
import Link from "next/link";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaBook, FaHistory } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const links = [
    {
        name : "Courses",
        icon : <FaBook size={20}/>
    },
    {
        name : "Histories",
        icon : <FaHistory size={20}/>
    }
]

export const NavUser = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [path, setPath] = useState<any>()
    
    const pathname = usePathname()

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(()=>{
        setPath(pathname)
    },[pathname])

    return (
        <header className="fixed left-0 right-0 py-4 flex bg-blue-100 justify-between z-40">
            <div className="ml-10 flex gap-2 items-center">
                <button onClick={toggleMenu} className="text-black md:hidden">
                    {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>
                <Link href="/" className="text-2xl font-bold text-black">
                    <span className="text-blue-600">SEA</span>TUDY.
                </Link>
            </div>
            <nav className={`absolute h-[100vh] bg-inherit px-4 pt-16 -z-10 md:-translate-x-0 duration-200 ${isMenuOpen?"translate-x-0":"-translate-x-full"}`}>
                {links.map(link=>(
                    <Link
                        key={link.name} 
                        className={`${ path == `/dashboard/user/${link.name.toLowerCase()}` ? "bg-blue-300" : "hover:bg-gray-300" } flex items-center gap-2 my-2 rounded-full px-10 py-2`} 
                        href={link.name.toLowerCase()}>
                        {link.icon}
                        {link.name}
                    </Link>
                ))}
            </nav>
            <div className="flex gap-2 items-center mr-10">
                <div 
                    style={{ backgroundImage : "url('https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg')" }} 
                    className="h-10 w-10 rounded-full bg-cover border-2 border-black"/>
                <IoIosArrowDown size={20}/>
                <MdOutlineNotificationsNone size={35}/>
            </div>
        </header>
    )
};
