"use client";
import React from "react";
import { Course } from "../../../types/course/course";

interface CourseSelectionProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseSelect: (course: Course) => void;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({ courses, selectedCourse, onCourseSelect }) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[calc(100vh-12rem)] overflow-y-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Select a Course</h2>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 flex items-start gap-4 ${
              selectedCourse?.id === course.id ? "bg-blue-100 text-blue-700 border-blue-500 border-2" : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => onCourseSelect(course)}
          >
            <img src={course.image_url} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSelection;
