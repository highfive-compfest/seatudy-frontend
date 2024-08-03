"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCourses = () => setIsCoursesOpen(!isCoursesOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  return (
    <>
      <nav className="flex w-full justify-between items-center py-4 px-5 bg-white shadow-md absolute z-50">
        <div className="text-xl font-bold text-black">
          <Link href="/">
            {" "}
            <span className="text-blue-600">SEA</span>TUDY.
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="space-x-5 text-black h-max items-center hidden md:flex">
          <li className="relative group">
            <Link href="/">
              <p className="hover:text-blue-500 cursor-pointer">Home</p>
            </Link>
          </li>
          <li className="relative group">
            <p className="flex items-center hover:text-blue-500 cursor-pointer">
              Courses
              <AiOutlineDown className="ml-1" />
            </p>
            <div className="absolute hidden group-hover:block bg-gray-100 shadow-lg p-3 rounded min-w-48">
              <Link href="/courses/1">
                <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Course 1</p>
              </Link>
              <Link href="/courses/2">
                <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Course 2</p>
              </Link>
            </div>
          </li>
          <li className="relative group">
            <p className="flex items-center hover:text-blue-500 cursor-pointer">
              Category
              <AiOutlineDown className="ml-1" />
            </p>
            <div className="absolute hidden group-hover:block bg-gray-100 shadow-lg p-3 rounded min-w-48">
              <Link href="/page/1">
                <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Category 1</p>
              </Link>
              <Link href="/page/2">
                <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Category 2</p>
              </Link>
            </div>
          </li>
          <li>
            <Link href="/blog">
              <p className="hover:text-blue-500 cursor-pointer">Reviews</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="hover:text-blue-500 cursor-pointer">About Us</p>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer mr-[-0.75em]">Register</p>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <p className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Login</p>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black">
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute inset-0 bg-white shadow-lg transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-40 pt-16`}>
        <ul className="flex flex-col p-5 space-y-4">
          <li>
            <Link href="/">
              <p className="hover:text-blue-500 cursor-pointer px-3" onClick={toggleMenu}>
                Home
              </p>
            </Link>
          </li>
          <li>
            <button onClick={toggleCourses} className="flex items-center justify-between w-full px-3 py-2 text-black hover:bg-gray-200">
              <p className="flex items-center">Courses</p>
              {isCoursesOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </button>
            {isCoursesOpen && (
              <div className="flex flex-col pl-4 space-y-2 bg-gray-100 border border-gray-200 rounded">
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
            <button onClick={toggleCategory} className="flex items-center justify-between w-full px-3 py-2 text-black hover:bg-gray-200">
              <p className="flex items-center">Category</p>
              {isCategoryOpen ? <AiOutlineUp /> : <AiOutlineDown />}
            </button>
            {isCategoryOpen && (
              <div className="flex flex-col pl-4 space-y-2 bg-gray-100 border border-gray-200 rounded">
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
          <li>
            <Link href="/blog">
              <p className="hover:text-blue-500 cursor-pointer px-3 mb-3" onClick={toggleMenu}>
                Reviews
              </p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="hover:text-blue-500 cursor-pointer px-3 mb-3" onClick={toggleMenu}>
                About Us
              </p>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer" onClick={toggleMenu}>
                Register
              </p>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <p className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer" onClick={toggleMenu}>
                Login
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
