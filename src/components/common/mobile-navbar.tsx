"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface NavbarProps {
  toggleCourses: () => void;
  toggleCategory: () => void;
  isCoursesOpen: boolean;
  isCategoryOpen: boolean;
  isLoggedIn: boolean;
}

export const MobileNavbar: React.FC<NavbarProps & { toggleMenu: () => void; isMenuOpen: boolean }> = ({ toggleMenu, toggleCourses, toggleCategory, isCoursesOpen, isCategoryOpen, isMenuOpen, isLoggedIn }) => (
  <div className={isMenuOpen ? "md:hidden absolute inset-0 bg-white shadow-lg pt-16 ease-in-out duration-500 z-40" : "ease-in-out duration-500 fixed z-[-1] w-0 overflow-hidden opacity-0 pointer-events-none"} data-testid="mobile-menu">
    <ul className="flex flex-col p-5 space-y-4">
      <li data-testid="mobile-home-link">
        <Link href="/">
          <p className="hover:text-blue-500 cursor-pointer px-3" onClick={toggleMenu}>
            Home
          </p>
        </Link>
      </li>
      <li>
        <button onClick={toggleCourses} className="flex items-center justify-between w-full px-3 py-2 text-black hover:bg-gray-200" data-testid="mobile-courses-button">
          <p className="flex items-center">Courses</p>
          {isCoursesOpen ? <AiOutlineUp /> : <AiOutlineDown />}
        </button>
        {isCoursesOpen && (
          <div className="flex flex-col pl-4 space-y-2 bg-gray-100 border border-gray-200 rounded" data-testid="mobile-courses-dropdown">
            <Link href="/courses/1">
              <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                Course 1
              </p>
            </Link>
            <Link href="/courses/2">
              <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                Course 2
              </p>
            </Link>
          </div>
        )}
      </li>
      <li>
        <button onClick={toggleCategory} className="flex items-center justify-between w-full px-3 py-2 text-black hover:bg-gray-200" data-testid="mobile-category-button">
          <p className="flex items-center">Category</p>
          {isCategoryOpen ? <AiOutlineUp /> : <AiOutlineDown />}
        </button>
        {isCategoryOpen && (
          <div className="flex flex-col pl-4 space-y-2 bg-gray-100 border border-gray-200 rounded" data-testid="mobile-category-dropdown">
            <Link href="/page/1">
              <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                Category 1
              </p>
            </Link>
            <Link href="/page/2">
              <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                Category 2
              </p>
            </Link>
          </div>
        )}
      </li>
      <li data-testid="mobile-reviews-link">
        <Link href="/blog">
          <p className="hover:text-blue-500 cursor-pointer px-3 mb-3" onClick={toggleMenu}>
            Reviews
          </p>
        </Link>
      </li>
      {isLoggedIn ? (
        <li data-testid="profile-link">
          <></>
        </li>
      ) : (
        <>
          <li data-testid="mobile-register-link">
            <Link href="/register">
              <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer" onClick={toggleMenu}>
                Register
              </p>
            </Link>
          </li>
          <li data-testid="mobile-login-link">
            <Link href="/login">
              <p className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer" onClick={toggleMenu}>
                Login
              </p>
            </Link>
          </li>
        </>
      )}
    </ul>
  </div>
);
