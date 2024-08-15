"use client";
import React, { useState } from "react";
import { Course } from "../../../types/course/course";

interface CourseSelectionProps {
  courses: Course[];
  selectedCourse: Course | null;
  onCourseSelect: (course: Course) => void;
}

const ITEMS_PER_PAGE = 5;

const CourseSelection: React.FC<CourseSelectionProps> = ({ courses, selectedCourse, onCourseSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCourses = courses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[calc(100vh-100px)] md:h-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Select a Course</h2>
      <ul className="space-y-4 overflow-y-auto scrollbar-hide h-full md:h-auto">
        {currentCourses.map((course) => (
          <li
            key={course.id}
            className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 flex items-start gap-4 ${
              selectedCourse?.id === course.id ? "bg-blue-100 text-blue-700 border-blue-500 border-2" : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            onClick={() => onCourseSelect(course)}
          >
            <img src={course.image_url} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h3 className="text-medium font-semibold">{course.title}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{course.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white p-4 border-t-2 border-gray-200">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400">
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400">
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseSelection;
