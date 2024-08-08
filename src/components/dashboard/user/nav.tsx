"use client"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBook, FaHistory } from "react-icons/fa";

const links = [
    {
      name: "Courses",
      icon: <FaBook size={20} />,
    },
    {
      name: "Histories",
      icon: <FaHistory size={20} />,
    },
  ];

export const NavUser = ({isMenuOpen}:{isMenuOpen:boolean}) => {
    const [path, setPath] = useState<any>();

    const pathname = usePathname();

    useEffect(() => {
        setPath(pathname);
    }, [pathname]);

    
    return (
        <nav className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"} z-30 fixed md:static h-screen bg-blue-100 pt-[6rem] px-4 md:-translate-x-0 duration-200`}>
            {links.map(link=>(
                <Link className={`${path == `/dashboard/user/${link.name.toLowerCase()}` ? "bg-blue-300" : "hover:bg-gray-300"} flex items-center gap-2 my-2 rounded-full px-10 py-2`} href={`/dashboard/user/${link.name.toLocaleLowerCase()}`}>
                    {link.icon}
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}