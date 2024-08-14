"use client";
import Footer from "@/components/common/main-footer";
import Navbar from "@/components/common/main-navbar";
import CourseSelection from "@/components/dashboard/user/course-selection";
import DiscussionPage from "@/components/dashboard/user/discussions";
import DiscussionsHero from "@/components/discussions/discussions-hero";
import { getPopularCourses } from "@/services/course";
import { Course } from "@/types/course/course";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await getPopularCourses();
        setCourses(coursesResponse.payload.courses);
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
    <>
      <Navbar />
      <DiscussionsHero />
      <div className="container mx-auto p-6 w-full md:h-screen">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
          <CourseSelection courses={courses} selectedCourse={selectedCourse} onCourseSelect={handleCourseSelect} />
          <DiscussionPage discussionId={selectedCourse?.id || ""} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
