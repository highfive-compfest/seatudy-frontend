"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CourseCard from "../common/course-card";
import { getAllCourses } from "../../services/course";
import { Course } from "../../types/course/course";

const Explore = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.payload.courses || []);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="bg-blue-100 py-10 pb-20">
      <h1 className="text-3xl font-bold text-center mb-2 mt-8">Explore Courses</h1>
      <p className="text-center mb-8">Our most popular course subjects</p>

      <div className="overflow-x-auto scrollbar-hide mb-12">
        <div className="flex space-x-4 px-4">
          <div className="flex-shrink-0 md:w-[0.2em]"></div>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          <div className="bg-blue-200 p-6 rounded-lg shadow-lg flex-shrink-0 w-[14em] flex items-center justify-center">
            <Link href="/discover_courses">
              <button className="text-blue-600 font-bold text-lg">See All Courses &rarr;</button>
            </Link>
          </div>
          <div className="flex-shrink-0 w-[1em]"></div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
