"use client";
import React, { useEffect, useState } from "react";
import CourseInfo from "@/components/course_detail/course-info";
import { getBoughtCourse, getCourseById, purchaseCourse } from "../../../services/course";
import { Course } from "../../../types/course/course";
import { CourseProgress as CourseProgressType } from "../../../types/course/course";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";
import ConfirmationModal from "@/components/course_detail/confirm-modal";
import CourseReviews from "@/components/course_detail/course-review";
import Link from "next/link";
import { getMe } from "@/services/user";
import CourseProgress from "@/components/course_detail/course-progress";

const CourseDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [course, setCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<CourseProgressType[]>([]);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const accToken = getCookie("authToken") as string;

  useEffect(() => {
    if (accToken != null) {
      setIsLoggedIn(true);
      const fetchUserProfile = async () => {
        try {
          const data = await getMe(accToken);
          if (data?.payload) {
            setUserRole(data.payload.role);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };
      fetchUserProfile();
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getBoughtCourse(accToken);

        if (data.payload && Array.isArray(data.payload)) {
          setCourses(data.payload);

          const purchased = data.payload.some((course) => course.course.id === id);
          setIsPurchased(purchased);
        } else {
          setCourses([]);
        }
      } catch (error: any) {
        console.log(error.response);
      }
    };

    fetchCourses();
  }, [accToken, id]);

  const handleBuyClick = () => {
    if (isLoggedIn) {
      if (userRole === "instructor") {
        alert("Instructors cannot purchase courses.");
      } else {
        setIsModalOpen(true);
      }
    } else {
      window.location.href = "/login";
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      await purchaseCourse(accToken, id as string);
      alert("Purchase successful!");
      setIsPurchased(true);
    } catch (error) {
      alert("Please top up your balance");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 pb-32">
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

              {userRole !== "instructor" && (
                <div>
                  {isPurchased ? (
                    <Link href={`dashboard/student/courses/${id}`}>
                      <button className="py-3 px-6 bg-white text-blue-600 font-semibold rounded-lg self-stretch lg:self-auto w-full lg:w-auto text-sm">Go to Dashboard</button>
                    </Link>
                  ) : (
                    <button onClick={handleBuyClick} className="py-3 px-6 bg-blue-500 hover:bg-purple-600 text-white font-semibold rounded-lg self-stretch lg:self-auto w-full lg:w-auto text-sm">
                      Buy This Course
                    </button>
                  )}
                </div>
              )}

              {userRole === "instructor" && <p className="text-white">You are an Instructor</p>}
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
