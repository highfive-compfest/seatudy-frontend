"use client";
import CourseCard from "@/components/common/course-card";
import CreateCourse from "@/components/dashboard/instructor/create-form";
import { useState } from "react";
import { Course } from "@/types/course/course";

const Create: React.FC = () => {
  const dummyCourse: Course = {
    id: "dummy-id",
    title: "Sample Course Title",
    description: "This is a sample course description to demonstrate the CourseCard layout.",
    price: 10000,
    image_url: "https://t4.ftcdn.net/jpg/02/40/63/55/360_F_240635575_EJifwRAbKsVTDnA3QE0bCsWG5TLhUNEZ.jpg",
    syllabus_url: "",
    instructor_id: "dummy-instructor-id",
    difficulty: "Beginner",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const [previewCourse, setPreviewCourse] = useState<Course>(dummyCourse);

  const handleSubmit = async (formData: FormData) => {
    console.log("Submitting form data", formData);
  };

  const handlePreview = (course: Course) => {
    setPreviewCourse(course);
  };

  return (
    <section className="p-4 pt-28 flex flex-col lg:flex-row pb-8 h-full">
      <CreateCourse onSubmit={handleSubmit} onPreview={handlePreview} />

      <div className="flex-1 mt-4 lg:mt-0 lg:ml-4">
        <h2 className="font-bold mb-4">Course Preview (not working yet)</h2>
        <CourseCard course={previewCourse} />
      </div>
    </section>
  );
};

export default Create;
