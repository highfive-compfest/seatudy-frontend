"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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

  return (
    <>
      <nav className={`flex w-full justify-between items-center py-4 px-5 bg-white shadow-md fixed top-0 left-0 z-50 transition-transform duration-300 ${scrollingUp ? "translate-y-0" : "-translate-y-24"}`} data-testid="navbar">
        <div className="text-xl font-bold text-black">
          <Link href="/">
            {" "}
            <span className="text-blue-600">SEA</span>TUDY.
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="space-x-5 text-black h-max items-center hidden md:flex">
          <li className="relative group" data-testid="home-link">
            <Link href="/">
              <p className="hover:text-blue-500 cursor-pointer">Home</p>
            </Link>
          </li>
          <li className="relative group" data-testid="courses-link">
            <Link href="/discover_courses">
              <p className="flex items-center hover:text-blue-500 cursor-pointer">
                Courses
                <AiOutlineDown className="ml-1" />
              </p>
            </Link>

            <div className="absolute hidden group-hover:block bg-gray-100 shadow-lg p-4 rounded-lg min-w-72">
              <div className="mb-3">
                <input type="text" placeholder="Search courses..." className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div className="">
                <select className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="most-rated">Most Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </li>
          <li className="relative group" data-testid="category-link">
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
          <li data-testid="reviews-link">
            <Link href="/blog">
              <p className="hover:text-blue-500 cursor-pointer">Reviews</p>
            </Link>
          </li>
          <li data-testid="register-link">
            <Link href="/register">
              <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer mr-[-0.75em]">Register</p>
            </Link>
          </li>
          <li data-testid="login-link">
            <Link href="/login">
              <p className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Login</p>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-black" data-testid="menu-toggle">
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
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
        </ul>
      </div>
    </>
  );
};

export default Navbar;