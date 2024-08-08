"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/main-navbar";
import Footer from "@/components/common/main-footer";
import CourseInfo from "@/components/course_detail/course-info";
import CourseProgress from "@/components/course_detail/course-progress";
import { getCourseById } from "../../../services/course";
import { Course } from "../../../types/course/course";
import { useRouter, useSearchParams } from "next/navigation";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const data = await getCourseById(id as string);
          setCourse(data?.payload[0]);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      };

      fetchCourse();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading course: {error.message}</p>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto pt-24 px-8 pb-32">
        <div className="breadcrumb text-gray-600 text-sm mb-4">
          <a href="#" className="hover:underline">
            My Courses
          </a>{" "}
          &gt;
          <a href="#" className="hover:underline">
            {" "}
            <span>Management</span>
          </a>{" "}
          &gt;
          <span>{course?.title}</span>
        </div>

        <div className="flex flex-col md:flex-row">
          {course && (
            <>
              <CourseInfo courseDetail={course} />
              <CourseProgress courseDetail={course} />
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetailPage;
