"use client";
import CourseSelection from "@/components/dashboard/user/course-selection";
import DiscussionPage from "@/components/dashboard/user/discussions";
import { getBoughtCourse } from "@/services/course";
import { Course } from "@/types/course/course";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const authToken = getCookie("authToken") as string;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await getBoughtCourse(authToken);
        setCourses(coursesResponse.payload);
        setSelectedCourse(courses[0]);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="container mx-auto p-6 mt-24 w-full md:h-[130vh]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <CourseSelection courses={courses} selectedCourse={selectedCourse} onCourseSelect={handleCourseSelect} />
        <DiscussionPage courseId={selectedCourse?.id || ""} />
      </div>
    </div>
  );
};

export default Page;
