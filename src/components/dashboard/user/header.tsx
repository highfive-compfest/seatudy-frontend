"use client";
import Link from "next/link";
import { FaBook, FaHistory } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { SetStateAction, useEffect, useState, Dispatch } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { ProfileIcon } from "@/components/common/profile-icon";
import { NotifIcon } from "@/components/common/notif-icon";

// const links = [
//   {
//     name: "Courses",
//     icon: <FaBook size={20} />,
//   },
//   {
//     name: "Histories",
//     icon: <FaHistory size={20} />,
//   },
// ];
interface Type {
  isMenuOpen : boolean,
  setIsMenuOpen : Dispatch<SetStateAction<boolean>>
}

export const HeaderUser = ({isMenuOpen, setIsMenuOpen}:Type) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [path, setPath] = useState<any>();

  // const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // useEffect(() => {
  //   setPath(pathname);
  // }, [pathname]);

  return (
    <>
      <header className="fixed left-0 right-0 py-4 flex bg-blue-100 justify-between z-40">
        <div className="ml-10 flex gap-2 items-center">
          <button onClick={toggleMenu} className="text-black md:hidden">
            {isMenuOpen ? <AiOutlineClose size={18} /> : <AiOutlineMenu size={18} />}
          </button>
          <Link href="/" className="text-2xl font-bold text-black">
            <span className="text-blue-600">SEA</span>TUDY.
          </Link>
        </div>
        <div className="flex gap-2 mr-10">
          <ProfileIcon />
          <NotifIcon />
        </div>
      </header>
      {/* <nav className={`absolute top-0 bottom-0  bg-inherit px-4 pt-16 -z-10 md:-translate-x-0 duration-200 bg-blue-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {links.map((link) => (
          <Link key={link.name} className={`${path == `/dashboard/user/${link.name.toLowerCase()}` ? "bg-blue-300" : "hover:bg-gray-300"} flex items-center gap-2 my-2 rounded-full px-10 py-2`} href={link.name.toLowerCase()}>
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav> */}
    </>
  );
};
