"use client";
import CourseCard from "@/components/common/course-card";
import { Course } from "@/types/course/course";
import { useState, useEffect } from "react";
import { getBoughtCourse } from "../../../../services/course";
import { getCookie } from "cookies-next";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setPending] = useState(false);

  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchCourses = async () => {
      setPending(true);
      try {
        const data = await getBoughtCourse(accToken);

        if (data.payload && Array.isArray(data.payload)) {
          setCourses(data.payload);
        } else {
          setCourses([]);
          alert("No courses found.");
        }
      } catch (error: any) {
        setError(error as Error);
        console.log(error.response);
        alert("Error: " + error);
      } finally {
        setPending(false);
      }
    };

    fetchCourses();
  }, [accToken]);

  return (
    <section className="pt-[7rem]">
      <h1 className="text-2xl font-bold ml-4">Manage Your Courses</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center md:justify-start pb-8">
        {courses.length > 0 ? courses.map((course) => <CourseCard key={course.id} course={course} />) : <p>No courses found.</p>}
      </div>
    </section>
  );
};

export default Courses;
