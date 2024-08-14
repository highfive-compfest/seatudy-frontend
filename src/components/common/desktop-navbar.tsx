"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { ProfileIcon } from "./profile-icon";
import { Course } from "@/types/course/course";
import { getPopularCourses } from "@/services/course";
import Image from "next/image";

interface NavbarProps {
  toggleCourses: () => void;
  toggleCategory: () => void;
  isCoursesOpen: boolean;
  isCategoryOpen: boolean;
  isLoggedIn: boolean;
}

const DropdownMenu = ({ items }: { items: JSX.Element[] }) => (
  <div className="scrollbar-hide absolute hidden group-hover:block bg-white shadow-lg p-4 rounded-lg min-w-72 border border-gray-200 overflow-y-auto max-h-80 right-0">
    {items.map((item, index) => React.cloneElement(item, { key: index }))}
  </div>
);

const CoursesDropdown = () => (
  <DropdownMenu
    items={[
      <div key="search" className="flex items-center space-x-2">
        <input type="text" placeholder="Search courses..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="button">
          Search
        </button>
      </div>,
    ]}
  />
);

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

const DiscussionsDropdown = () => <DropdownMenu items={[<p className="text-sm">Please log in first to access the discussions page</p>]} />;

export const DesktopNavbar: React.FC<NavbarProps> = ({ toggleCourses, toggleCategory, isCoursesOpen, isCategoryOpen, isLoggedIn }) => {
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
      <li className="relative group" data-testid="reviews-link">
        {isLoggedIn ? (
          <Link href="/discussions">
            <p className="hover:text-blue-500 cursor-pointer">Discussions</p>
          </Link>
        ) : (
          <p className="flex items-center hover:text-blue-500 cursor-pointer">Discussions</p>
        )}
        {!isLoggedIn && <DiscussionsDropdown />}
      </li>
      {isLoggedIn ? (
        <li data-testid="profile-link">
          <ProfileIcon />
        </li>
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
