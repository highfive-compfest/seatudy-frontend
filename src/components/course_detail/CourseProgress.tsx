import React from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useState } from "react";

export interface Instructor {
  name: string;
  title: string;
  imageUrl: string;
}

export interface CourseDetail {
  title: string;
  instructor: Instructor;
  description: string[];
  imageUrl: string;
  chapters: number[];
}

interface CourseInfoProps {
  courseDetail: CourseDetail;
}

const CourseProgress: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  const [completed, setCompleted] = useState([1, 2, 3]);
  return (
    <>
      <div className="w-full md:w-1/4 bg-gray-100 h-full px-8 py-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">About the Course</h3>
          <div className="flex items-center mb-4">
            <div className="mr-2">
              <img src={courseDetail.instructor.imageUrl} width={40} height={40} className="rounded-full" alt={courseDetail.instructor.name} />
            </div>
            <div>
              <p className="font-semibold">{courseDetail.instructor.name}</p>
              <p className="text-gray-500 text-sm">{courseDetail.instructor.title}</p>
            </div>
          </div>
          <p>This course is designed to help you for your practical day to day project management...</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Course Completion</h3>
          <ul>
            {courseDetail.chapters.map((item) => (
              <li key={item} className="flex items-center hover:px-2 py-2 hover:bg-gray-200 rounded">
                {completed.includes(item) ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaRegCircle className="text-gray-400 mr-2" />}
                <span className={`${completed.includes(item) ? "text-gray-900" : "text-gray-500"}`}>{`Chapter ${item}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseProgress;
