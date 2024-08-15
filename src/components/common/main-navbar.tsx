"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { MobileNavbar } from "./mobile-navbar";
import { DesktopNavbar } from "./desktop-navbar";
import { ProfileIcon } from "./profile-icon";
import Image from "next/image";
import { NotifIcon } from "./notif-icon";

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCourses = () => setIsCoursesOpen(!isCoursesOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollingUp(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const authToken = getCookie("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <nav className={`flex w-full justify-between items-center py-4 px-5 bg-white shadow-md fixed top-0 left-0 z-50 transition-transform duration-300 ${scrollingUp ? "translate-y-0" : "-translate-y-24"}`} data-testid="navbar">
        <div>
          <Link href="/" className="flex items-center">
            <Image src="/seatudy-logo.png" alt="SEA TUDY Logo" className="h-8 w-auto mr-2" width={128} height={128} />
            <div className="text-xl font-bold text-black">
              {" "}
              <span className="text-blue-600">SEA</span>TUDY.
            </div>
          </Link>
        </div>

        <DesktopNavbar toggleCourses={toggleCourses} toggleCategory={toggleCategory} isCoursesOpen={isCoursesOpen} isCategoryOpen={isCategoryOpen} isLoggedIn={isLoggedIn} />

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          {isLoggedIn ? (
            <div className="flex gap-4 mr-4">
              <NotifIcon />
              <ProfileIcon />
            </div>
          ) : (
            <></>
          )}

          <button onClick={toggleMenu} className="text-black" data-testid="menu-toggle">
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </nav>

      <MobileNavbar toggleMenu={toggleMenu} toggleCourses={toggleCourses} toggleCategory={toggleCategory} isCoursesOpen={isCoursesOpen} isCategoryOpen={isCategoryOpen} isMenuOpen={isMenuOpen} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Navbar;
