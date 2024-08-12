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

          <div className="w-full h-full lg:ml-8 pt-12">
            <div className="bg-gray-100 border-2 border-gray-200 p-6 rounded-lg shadow flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-gray-800 text-lg font-medium">
                <div>
                  Price: <span className="text-blue-600 font-semibold">Rp.{course.price}</span>
                </div>
                <div className="text-sm text-gray-500 mt-4 lg:mt-0 mr-4">
                  <p className="text-gray-600">
                    By purchasing this course, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms and Conditions
                    </a>
                    .
                  </p>
                </div>
              </div>

              <button className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg self-stretch lg:self-auto w-full lg:w-auto">Buy This Course</button>
            </div>

            <CourseProgress courseDetail={course} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
