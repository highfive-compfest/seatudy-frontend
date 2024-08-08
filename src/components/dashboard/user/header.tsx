"use client";

import Link from "next/link";
import { SetStateAction, Dispatch } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { ProfileIcon } from "@/components/common/profile-icon";
import { NotifIcon } from "@/components/common/notif-icon";

interface Type {
  isMenuOpen : boolean,
  setIsMenuOpen : Dispatch<SetStateAction<boolean>>
}

export const HeaderUser = ({isMenuOpen, setIsMenuOpen}:Type) => {

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    </>
  );
};
