"use client";
import CourseInfo from "@/components/course_detail/course-info";
import CourseProgress from "@/components/course_detail/course-progress";
import { courseDetail } from "@/types/dummy/CourseDummy";
import Navbar from "@/components/common/main-navbar";
import React from "react";
import Footer from "@/components/common/footer";

const CourseDetailPage = () => {
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
            <span> Management</span>
          </a>{" "}
          &gt;
          <span> {courseDetail.title}</span>
        </div>

        <div className="flex flex-col md:flex-row">
          <CourseInfo courseDetail={courseDetail} />
          <CourseProgress courseDetail={courseDetail} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetailPage;
