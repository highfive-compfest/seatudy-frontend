"use client";
import React, { useEffect, useState } from "react";
import CourseInfo from "@/components/course_detail/course-info";
import { getCourseById } from "../../../../../services/course";
import { Course } from "../../../../../types/course/course";
import { usePathname, useRouter } from "next/navigation";
import { getSegment } from "@/utils/utils";
import CourseProgress2 from "@/components/course_detail/course-progress-2";
import CourseReviews from "@/components/course_detail/course-review";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = getSegment(pathname, 4);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const data = await getCourseById(id as string);
          if (data?.payload) {
            if (Array.isArray(data.payload)) {
              if (data.payload.length > 0) {
                setCourse(data.payload[0]);
              } else {
                alert("Course not found.");
              }
            } else {
              setCourse(data.payload);
            }
          } else {
            alert("Course not found.");
          }
        } catch (error) {
          alert("Failed to fetch course details.");
        } finally {
          setLoading(false);
        }
      };

      fetchCourse();
    } else {
      setLoading(false);
      setError("Course ID is missing.");
    }
  }, [id]);

  return (
    <div className="relative container mx-auto px-4 py-8 lg:px-8 mt-28 mb-32 md:bg-white md:rounded md:border-2 md:border-gray-200">
      <div className="relative z-10">
        <div className="breadcrumb text-gray-600 text-sm mb-4">
          <a href="#" className="hover:underline">
            Courses
          </a>{" "}
          - <span>{course?.id}</span>
        </div>

        {course && (
          <div className="flex flex-col lg:flex-row">
            <CourseInfo courseDetail={course} />

            <div className="w-full h-auto mt-8">
              <CourseProgress2 courseDetail={course} />
            </div>
          </div>
        )}
        <CourseReviews courseId={course?.id || ""} />
      </div>
    </div>
  );
};

export default Page;
