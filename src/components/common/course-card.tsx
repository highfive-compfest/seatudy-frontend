import React from "react";
import Link from "next/link";

export interface Course {
  id: number;
  title: string;
  description: string;
  age: string;
  duration: string;
  price: string;
  image: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div key={course.id} className="bg-white rounded-lg shadow-lg flex-shrink-0 w-[18em] md:w-[24em]">
      <div className="relative h-48">
        <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" data-testid="course-image" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold" data-testid="course-title">
          {course.title}
        </h2>
        <p className="text-gray-600 mt-2" data-testid="course-description">
          {course.description}
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4" data-testid="course-details">
          <span data-testid="course-age">
            Ages <strong>{course.age}</strong>
          </span>
          <span data-testid="course-duration">
            Duration <strong>{course.duration}</strong>
          </span>
          <span data-testid="course-price">
            Price <strong>{course.price}</strong>
          </span>
        </div>
        <Link href="/course_detail">
          <button className="mt-4 text-blue-500 underline" data-testid="show-more-button">
            Show more &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
