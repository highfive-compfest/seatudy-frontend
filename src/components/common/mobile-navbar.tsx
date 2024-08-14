"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Course } from "@/types/course/course";
import { getPopularCourses } from "@/services/course";

interface NavbarProps {
  toggleCourses: () => void;
  toggleCategory: () => void;
  isCoursesOpen: boolean;
  isCategoryOpen: boolean;
  isLoggedIn: boolean;
}

export const MobileNavbar: React.FC<NavbarProps & { toggleMenu: () => void; isMenuOpen: boolean }> = ({ toggleMenu, toggleCourses, toggleCategory, isCoursesOpen, isCategoryOpen, isMenuOpen, isLoggedIn }) => {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const data = await getPopularCourses();
        setPopularCourses(data.payload.courses);
      } catch (err) {
        setError("Failed to fetch popular courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCourses();
  }, []);

  return (
    <div className={`fixed inset-0 bg-white shadow-md pt-24 ease-in-out duration-500 z-40 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} data-testid="mobile-menu">
      <ul className="flex flex-col p-5 space-y-4">
        <li>
          <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded overflow-hidden">
            <input type="text" placeholder="Search courses..." className="flex-1 px-4 py-2 border-none focus:outline-none text-medium placeholder-gray-500" />
            <button className="bg-blue-500 border-blue-500 border-2 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="button">
              Search
            </button>
          </div>
        </li>
        <li data-testid="mobile-home-link">
          <Link href="/">
            <p className="text-gray-700 hover:text-blue-500 cursor-pointer px-3 py-2 rounded-md transition duration-200" onClick={toggleMenu}>
              Home
            </p>
          </Link>
        </li>
        <li data-testid="mobile-discover-link">
          <Link href="/discover_courses">
            <p className="text-gray-700 hover:text-blue-500 cursor-pointer px-3 py-2 rounded-md transition duration-200" onClick={toggleMenu}>
              Discover
            </p>
          </Link>
        </li>
        <li>
          <button onClick={toggleCourses} className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md transition duration-200" data-testid="mobile-courses-button">
            <p className="flex items-center">Popular</p>
            {isCoursesOpen ? <AiOutlineUp /> : <AiOutlineDown />}
          </button>
          {isCoursesOpen && (
            <div className="flex flex-col pl-4 space-y-2 bg-gray-100 border border-gray-200 rounded-md mt-2 max-h-60 overflow-y-auto" data-testid="mobile-courses-dropdown">
              {loading ? (
                <p className="px-4 py-2 text-gray-500">Loading...</p>
              ) : error ? (
                <p className="px-4 py-2 text-red-500">{error}</p>
              ) : (
                popularCourses.map((course) => (
                  <Link href={`/course_detail?id=${course.id}`} key={course.id}>
                    <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-200 cursor-pointer transition duration-200 mb-2 rounded-md" onClick={toggleMenu}>
                      <img src={course.image_url || "/default-image.png"} alt={course.title} className="w-16 h-16 object-cover rounded-md" />
                      <p className="text-sm font-semibold">{course.title}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </li>

        {isLoggedIn ? (
          <></>
        ) : (
          <>
            <li data-testid="mobile-register-link">
              <Link href="/register">
                <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition duration-200" onClick={toggleMenu}>
                  Register
                </p>
              </Link>
            </li>
            <li data-testid="mobile-login-link">
              <Link href="/login">
                <p className="bg-blue-500 text-white border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer transition duration-200" onClick={toggleMenu}>
                  Login
                </p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
