import Link from "next/link";
import React from "react";
import CourseCard from "../common/course-card";
import { courses } from "@/types/dummy/CourseDummy";

const Explore = () => {
  return (
    <div className="bg-blue-100 py-10 pb-18">
      <h1 className="text-3xl font-bold text-center mb-2 mt-8">Explore Courses</h1>
      <p className="text-center mb-8">Our most popular course subjects</p>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-4">
          <div className="flex-shrink-0 w-[0.5em] md:w-[1em]"></div>

          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}

          <div className="bg-blue-200 p-6 rounded-lg shadow-lg flex-shrink-0 w-[14em] flex items-center justify-center">
            <Link href="/discover_courses">
              <button className="text-blue-600 font-bold text-lg">See All Courses &rarr;</button>
            </Link>
          </div>

          <div className="flex-shrink-0 w-[0.5em] md:w-[1em]"></div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
