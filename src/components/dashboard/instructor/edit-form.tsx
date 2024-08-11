"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Course } from "@/types/course/course";
import { dummyCourse } from "@/utils/utils";
import { getCookie } from "cookies-next";
import CreateCourse from "./create-form";
import CourseCard from "@/components/common/course-card";
import { updateCourseById } from "@/services/course";
import { useRouter } from "next/navigation";

export const EditCourse = ({ course }: { course: Course | undefined }) => {
  const router = useRouter();

  const values = {
    title: course?.title,
    description: course?.description,
    price: course?.price,
    difficulty: course?.difficulty,
    image: course?.image_url,
    syllabus: course?.syllabus_url,
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
      const result = await updateCourseById(formData, token, course?.id);
      router.push("/dashboard/instructor/manage");
      console.log("Course submitted:", result);
    } catch (error: any) {
      console.error("Error submitting course:", error.response);
      console.log(error.response)
      alert("Error submitting course: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = (course: Course) => {
    setPreviewCourse(course);
  };

  return (
    <section className="py-4 flex flex-col lg:flex-row pb-8 h-full">
      <CreateCourse values={values} onSubmit={handleSubmit} onPreview={handlePreview} />
      <div className="flex-1 mt-4 lg:mt-0 lg:ml-4">
        <h2 className="font-bold mb-4">Course Preview</h2>
        <CourseCard course={previewCourse} />
      </div>
    </section>
  );
};
