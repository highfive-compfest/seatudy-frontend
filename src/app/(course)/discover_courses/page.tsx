"use client";
import CourseCard from "@/components/common/course-card";
import Hero from "@/components/discover_courses/discover-hero";
import Navbar from "@/components/common/main-navbar";
import React, { useEffect, useState } from "react";
import Footer from "@/components/common/main-footer";
import { getAllCourses, getPopularCourses } from "../../../services/course";
import { Course } from "@/types/course/course";

const DiscoverCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCoursesData = await getAllCourses();
        setCourses(allCoursesData.payload.courses);

        const popularCoursesData = await getPopularCourses();
        setPopularCourses(popularCoursesData.payload.courses);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />
      <Hero courses={courses} />

      <section className="mt-12 px-4">
        <h2 className="text-2xl font-bold mb-4 ml-5">Popular Courses</h2>
        <div className="overflow-x-auto scrollbar-hide mb-12">
          <div className="flex space-x-4">
            <div className="flex-shrink-0 md:w-[0.2em]"></div>
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
            <div className="flex-shrink-0 w-[1em]"></div>
          </div>
        </div>
      </section>

      <div className="overflow-x-auto scrollbar-hide mb-12">
        <h2 className="text-2xl font-bold mb-4 ml-9">Other Courses</h2>
        <div className="flex space-x-4 px-4">
          <div className="flex-shrink-0 md:w-[0.2em]"></div>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          <div className="flex-shrink-0 w-[1em]"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default DiscoverCoursesPage;
