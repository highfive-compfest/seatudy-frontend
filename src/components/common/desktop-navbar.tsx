"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { ProfileIcon } from "./profile-icon";
import { Course } from "@/types/course/course";
import { getPopularCourses, searchCourses } from "@/services/course";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { NotifIcon } from "./notif-icon";

interface NavbarProps {
  toggleCourses: () => void;
  toggleCategory: () => void;
  isCoursesOpen: boolean;
  isCategoryOpen: boolean;
  isLoggedIn: boolean;
}

const DropdownMenu = ({ items }: { items: JSX.Element[] }) => (
  <div className="scrollbar-hide absolute hidden group-hover:block bg-white shadow-lg p-2 rounded-lg min-w-72 border border-gray-200 overflow-y-auto max-h-80 right-0">
    {items.map((item, index) => React.cloneElement(item, { key: index }))}
  </div>
);

const CoursesDropdown = () => {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!query) {
        setCourses([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchCourses(query);
        setCourses(response.payload.courses);
      } catch (err) {
        setError("Failed to fetch courses.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  return (
    <DropdownMenu
      items={[
        <div className="flex flex-col space-y-2 p-2 rounded-md">
          <div className="flex items-center space-x-2 mb-3">
            <input
              type="text"
              placeholder="Search courses..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          {loading && <p className="text-blue-500 text-sm mb-2">Searching...</p>}
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          {courses.length > 0 ? (
            <ul className="space-y-2">
              {courses.map((course) => (
                <Link href={`/course_detail?id=${course.id}`} key={course.id}>
                  <li className="flex items-center space-x-3 py-2 px-3 border-b border-gray-200 hover:bg-gray-50">
                    <img src={course.image_url} alt={course.title} className="w-14 h-14 object-cover rounded-md" />
                    <span className="text-sm font-semibold text-gray-800">{course.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No results found.</p>
          )}
        </div>,
      ]}
    />
  );
};

const PopularDropdown = ({ courses }: { courses: Course[] }) => (
  <DropdownMenu
    items={courses.map((course) => (
      <Link href={`/course_detail?id=${course.id}`} key={course.id}>
        <div className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200 mb-2">
          <img src={course.image_url || "/default-image.png"} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
          <p className="text-sm font-semibold">{course.title}</p>
        </div>
      </Link>
    ))}
  />
);

export const DesktopNavbar: React.FC<NavbarProps> = ({ toggleCourses, toggleCategory, isCoursesOpen, isCategoryOpen, isLoggedIn }) => {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const role = getCookie("userRole") as string;

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
    <ul className="space-x-5 text-black h-max items-center hidden md:flex">
      <li className="relative group" data-testid="home-link">
        <Link href="/">
          <p className="hover:text-blue-500 cursor-pointer">Home</p>
        </Link>
      </li>
      <li className="relative group" data-testid="courses-link">
        <Link href="/discover_courses">
          <p className="flex items-center hover:text-blue-500 cursor-pointer">
            Discover
            <AiOutlineDown className="ml-1" />
          </p>
        </Link>
        <CoursesDropdown />
      </li>
      <li className="relative group" data-testid="category-link">
        <p className="flex items-center hover:text-blue-500 cursor-pointer">
          Popular
          <AiOutlineDown className="ml-1" />
        </p>
        {loading ? <p className="absolute bg-gray-100 p-3 rounded-lg min-w-48">Loading...</p> : error ? <p className="absolute bg-gray-100 p-3 rounded-lg min-w-48">{error}</p> : <PopularDropdown courses={popularCourses} />}
      </li>

      {isLoggedIn ? (
        <div className="flex gap-4 md:mr-10">
          <NotifIcon />
          <ProfileIcon />
        </div>
      ) : (
        <>
          <li data-testid="register-link">
            <Link href="/register">
              <p className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer mr-[-0.75em]">Register</p>
            </Link>
          </li>
          <li data-testid="login-link">
            <Link href="/login">
              <p className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-6 py-[0.6rem] rounded-full hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer">Login</p>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};
