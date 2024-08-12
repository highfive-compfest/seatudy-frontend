"use client";
import CourseCard from "@/components/common/course-card";
import { Course } from "@/types/course/course";
import { useState, useEffect } from "react";
import { getAllCourses } from "../../../../services/course";
import { getCookie } from "cookies-next";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setPending] = useState(false);

  const accToken = getCookie("authToken") as string;
  const userId = getCookie("userId") as string;

  useEffect(() => {
    const fetchCourses = async () => {
      setPending(true);
      try {
        const data = await getAllCourses();
        setCourses(data.payload.courses);
      } catch (error: any) {
        setError(error as Error);
        console.log(error.response);
      } finally {
        setPending(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="pt-[7rem]">
      <h1 className="text-2xl font-bold ml-4">Manage Your Courses</h1>
      {isPending ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching courses. Please try again later.</p>
      ) : courses.length === 0 ? (
        <p>You don&apos;t have any courses yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:justify-start pb-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Courses;
