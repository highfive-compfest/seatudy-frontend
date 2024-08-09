"use client"
import CourseCard from "@/components/common/course-card";
import { courses } from "@/types/dummy/CourseDummy";
import { Course } from "@/types/course/course";
import { useState, useEffect } from "react";
import { getAllCourses } from "../../../../services/course";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data.payload);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="pt-[7rem]">
      <h1 className="text-2xl font-bold ml-4">Manage Your Courses</h1>
      <div className="mt-4 flex gap-4 flex-wrap justify-center md:justify-start">
        {courses.map((course, idx) => (
          <CourseCard key={idx} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
