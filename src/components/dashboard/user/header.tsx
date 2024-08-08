"use client";

import Link from "next/link";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { ProfileIcon } from "@/components/common/profile-icon";
import { NotifIcon } from "@/components/common/notif-icon";

interface Type {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const HeaderUser = ({ isMenuOpen, setIsMenuOpen }: Type) => {
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollingUp(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <header className={`flex w-full justify-between items-center py-4 px-5 bg-white shadow-md fixed top-0 left-0 z-50 transition-transform duration-300 ${scrollingUp ? "translate-y-0" : "-translate-y-24"}`}>
        <div className="md:ml-10 flex gap-4 items-center">
          <button onClick={toggleMenu} className="text-black md:hidden">
            {isMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
          <Link href="/" className="text-2xl font-bold text-black h-full items-center">
            <span className="text-blue-600">SEA</span>TUDY.
          </Link>
        </div>
        <div className="flex gap-4 md:mr-10">
          <NotifIcon />
          <ProfileIcon />
        </div>
      </header>
    </>
  );
};
