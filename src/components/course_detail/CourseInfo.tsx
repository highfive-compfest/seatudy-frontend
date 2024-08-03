import React from "react";

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

const CourseInfo: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  return (
    <>
      <div className="w-full md:w-3/4 pr-4">
        <h1 className="text-2xl font-bold mb-2">{courseDetail.title}</h1>
        <p className="text-gray-500 mb-6">{courseDetail.instructor.name}</p>

        <div className="relative w-full h-64 mb-6 md:pr-4">
          <img className="w-full h-full object-cover rounded-lg shadow-lg" src={courseDetail.imageUrl} alt="Course" />
        </div>

        <h2 className="text-xl font-semibold mb-4">Description</h2>
        {courseDetail.description.map((desc, index) => (
          <p key={index} className="mb-4 text-justify md:pr-4">
            {desc}
          </p>
        ))}
      </div>
    </>
  );
};

export default CourseInfo;
