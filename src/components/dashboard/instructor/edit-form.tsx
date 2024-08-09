"use client"
import { useState } from "react";
import { Course } from "@/types/course/course";
import { dummyCourse } from "@/utils/utils";
import { getCookie } from "cookies-next";
import CourseCard from "@/components/common/course-card";
import CreateCourse from "./create-form";

export const EditCourse = () => {

    const [previewCourse, setPreviewCourse] = useState<Course>(dummyCourse);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const accToken = getCookie("authToken") as string;

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        // try {
        //   const token = accToken;
        //   if (!token) {
        //     throw new Error("No authentication token available");
        //   }
        //   const result = await createCourse(formData, token);
        //   alert("Course submitted successfully");
        //   console.log("Course submitted:", result);
        // } catch (error) {
        //   console.error("Error submitting course:", error);
        //   alert("Error submitting course: " + error);
        // } finally {
        //   setIsSubmitting(false);
        // }
    };

    const handlePreview = (course: Course) => {
        setPreviewCourse(course);
    };

    return (
        <div>
            <section className="p-4 pt-28 flex flex-col lg:flex-row pb-8 h-full">
            <CreateCourse onSubmit={handleSubmit} onPreview={handlePreview} />

            <div className="flex-1 mt-4 lg:mt-0 lg:ml-4">
                <h2 className="font-bold mb-4">Course Preview</h2>
                <CourseCard course={previewCourse} />
            </div>
            </section>
        </div>
    )
};
