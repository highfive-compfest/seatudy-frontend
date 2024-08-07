"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { ProfileIcon } from "./profile-icon";

interface NavbarProps {
  toggleCourses: () => void;
  toggleCategory: () => void;
  isCoursesOpen: boolean;
  isCategoryOpen: boolean;
  isLoggedIn: boolean;
}

export const DesktopNavbar: React.FC<NavbarProps> = ({ toggleCourses, toggleCategory, isCoursesOpen, isCategoryOpen, isLoggedIn }) => (
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
    {isLoggedIn ? (
      <li data-testid="profile-link">
        <ProfileIcon />
      </li>
    ) : (
      <>
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
      </>
    )}
  </ul>
);
