import React from "react";
import { Course } from "@/types/course/course";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  return (
    <>
      <div className="w-full md:w-3/4 pr-4">
        <h1 className="text-2xl font-bold mb-2">{courseDetail.title}</h1>
        <p className="text-gray-500 mb-6">Lorem Ipsum</p>

        <div className="relative w-full h-64 mb-6 md:pr-4">
          <img className="w-full h-full object-cover rounded-lg shadow-lg" src={courseDetail.image_url} alt={courseDetail.title} />
        </div>

        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="mb-4 text-justify md:pr-4">{courseDetail.description}</p>

        <h2 className="text-xl font-semibold mb-4">Syllabus</h2>
        <a href={courseDetail.syllabus_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
          View Syllabus
        </a>
      </div>
    </>
  );
};

export default CourseInfo;
