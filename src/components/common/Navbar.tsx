import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex w-full justify-between items-center py-4 px-5 bg-white shadow-md absolute z-50">
        <div className="text-xl font-bold text-black">
          <span className="text-blue-600">SEA</span>TUDY.
        </div>
        <ul className=" space-x-5 text-black h-max items-center hidden md:flex">
          <li className="relative group">
            <Link href="/">
              <p className="hover:text-blue-500 cursor-pointer">Home</p>
            </Link>
          </li>
          <li className="relative group">
            <p className="hover:text-blue-500 cursor-pointer">Courses</p>
            <div className="absolute hidden group-hover:block bg-gray-100 shadow-lg p-3 rounded min-w-48">
              <Link href="/courses/1">
                <p className="block px-2 py-2 hover:bg-gray-200 cursor-pointer">Course 1</p>
              </Link>
              <Link href="/courses/2">
                <p className="block px-2 py-2 hover:bg-gray-200 cursor-pointer">Course 2</p>
              </Link>
            </div>
          </li>
          <li className="relative group">
            <p className="hover:text-blue-500 cursor-pointer">Category</p>
            <div className="absolute hidden group-hover:block bg-gray-100 shadow-lg p-3 rounded min-w-48">
              <Link href="/page/1">
                <p className="block px-2 py-2 hover:bg-gray-200 cursor-pointer">Category 1</p>
              </Link>
              <Link href="/page/2">
                <p className="block px-2 py-2 hover:bg-gray-200 cursor-pointer">Category 2</p>
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
            <Link href="/signin">
              <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer mr-[-0.75em]">Register</p>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <p className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Login</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
