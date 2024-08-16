"use client";
import CourseCard from "@/components/common/course-card";
import CreateCourse from "@/components/dashboard/instructor/course/create-form";
import { useEffect, useState } from "react";
import { Course } from "@/types/course/course";
import { createCourse } from "@/services/course";
import { getCookie } from "cookies-next";
import { dummyCourse } from "@/utils/utils";

const Create: React.FC = () => {
  const values = {
    title: "",
    description: "",
    price: "",
    difficulty: "beginner",
    image: null as File | null,
    syllabus: null as File | null,
  };

  const [previewCourse, setPreviewCourse] = useState<Course>(dummyCourse);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accToken = getCookie("authToken") as string;

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const token = accToken;
      if (!token) {
        throw new Error("No authentication token available");
      }
      const result = await createCourse(formData, token);
      alert("Course submitted successfully");
      console.log("Course submitted:", result);
    } catch (error) {
      console.error("Error submitting course:", error);
      alert("Error submitting course: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = (course: Course) => {
    setPreviewCourse(course);
  };

  return (
    <section className="p-4 pt-28 flex flex-col lg:flex-row pb-8 h-auto">
      <CreateCourse values={values} isSubmitting={isSubmitting} text={{tittle:"Create New Course", button:"Create Course"}} onSubmit={handleSubmit} onPreview={handlePreview} />
      <div className="flex-1 mt-4 lg:mt-0 lg:ml-4 relative">
        <h2 className="font-bold mb-4">Course Preview</h2>
        <div className="relative">
          <CourseCard course={previewCourse} />
          <div className="absolute inset-0 bg-transparent cursor-not-allowed"></div>
        </div>
      </div>
    </section>
  );
};

export default Create;
