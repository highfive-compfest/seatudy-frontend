"use client";
import React, { useEffect, useState } from "react";
import CourseInfo from "@/components/course_detail/course-info";
import CourseProgress from "@/components/course_detail/course-progress";
import { getCourseById } from "../../../services/course";
import { Course } from "../../../types/course/course";
import { useSearchParams } from "next/navigation";
import { delay } from "framer-motion";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
    <div className="container mx-auto px-4 lg:px-8 pb-32">
      <div className="breadcrumb text-gray-600 text-sm mb-4">
        <a href="#" className="hover:underline">
          Courses
        </a>{" "}
        - <span>{course?.id}</span>
      </div>

      {course && (
        <div className="flex flex-col lg:flex-row">
          <CourseInfo courseDetail={course} />
          <CourseProgress courseDetail={course} />
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
