"use client";
import React, { useEffect, useState } from "react";
import CourseInfo from "@/components/course_detail/course-info";
import CourseProgress from "@/components/course_detail/course-progress";
import { getCourseById, purchaseCourse } from "../../../services/course";
import { Course } from "../../../types/course/course";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import ConfirmationModal from "@/components/course_detail/confirm-modal";
import CourseReviews from "@/components/course_detail/course-review";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    if (accToken != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accToken]);

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

  const handleBuyClick = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      window.location.href = "/login";
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      await purchaseCourse(accToken, id as string);
      alert("Purchase successful!");
    } catch (error) {
      alert("Failed to purchase course.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-2 border-gray-200 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="text-white text-lg font-medium">
                <div>
                  Price: <span className="text-white font-semibold">Rp.{course.price}</span>
                </div>
                <div className="text-sm text-gray-200 mt-4 lg:mt-0 mr-4">
                  <p className="text-gray-100">
                    By purchasing this course, you agree to our{" "}
                    <a href="#" className="text-gray-100 hover:underline">
                      Terms and Conditions
                    </a>
                    .
                  </p>
                </div>
              </div>

              <button onClick={handleBuyClick} className="py-3 px-6 bg-blue-500 hover:bg-purple-600 text-white font-semibold rounded-lg self-stretch lg:self-auto w-full lg:w-auto text-sm">
                Buy This Course
              </button>
            </div>

            <CourseProgress courseDetail={course} />
          </div>
        </div>
      )}
      <CourseReviews courseId={course?.id || ""} />
      <ConfirmationModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmPurchase} />
    </div>
  );
};

export default CourseDetailPage;
