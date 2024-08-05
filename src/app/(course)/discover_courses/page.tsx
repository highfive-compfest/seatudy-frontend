"use client";
import CourseCard from "@/components/common/CourseCard";
import Hero from "@/components/discover_courses/Hero";
import { courses } from "@/types/dummy/CourseDummy";
import Navbar from "@/components/common/Navbar";
import React from "react";
import Footer from "@/components/common/Footer";

const DiscoverCoursesPage = () => {
  fetch("course");
  return (
    <>
      <Navbar />
      <Hero />

      <div className="overflow-x-auto scrollbar-hide mb-12">
        <div className="flex space-x-4 px-4">
          <div className="flex-shrink-0 md:w-[0.2em]"></div>
          {courses.map((courses) => (
            <CourseCard key={courses.id} course={courses} />
          ))}
          <div className="flex-shrink-0 w-[1em]"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DiscoverCoursesPage;
