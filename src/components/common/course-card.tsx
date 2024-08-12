import React from "react";
import Link from "next/link";
import { Course } from "@/types/course/course";
import { usePathname } from "next/navigation";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const pathname = usePathname();
  const placeholderImage = "https://t4.ftcdn.net/jpg/02/40/63/55/360_F_240635575_EJifwRAbKsVTDnA3QE0bCsWG5TLhUNEZ.jpg";

  const getLinkPath = () => {
    if (pathname === "/dashboard/instructor/manage") {
      return `/dashboard/instructor/manage/${course.id}`;
    } else if (pathname === "/dashboard/student/courses") {
      return `/dashboard/student/courses/${course.id}`;
    } else {
      return `/course_detail?id=${course.id}`;
    }
  };

  return (
    <div key={course.id} className="bg-white rounded-lg shadow-lg flex-shrink-0 w-full md:w-[22em]">
      <div className="relative h-48">
        <img src={course.image_url || placeholderImage} alt={course.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" data-testid="course-image" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold line-clamp-1" data-testid="course-title">
          {course.title}
        </h2>
        <p className="text-gray-600 mt-2 line-clamp-2 text-medium" data-testid="course-description">
          {course.description}
        </p>
        <div className="flex flex-row justify-between items-start md:items-center mt-4 text-sm" data-testid="course-details">
          <span data-testid="course-difficulty">
            Difficulty: <strong>{course.difficulty}</strong>
          </span>
          <span data-testid="course-price">
            Price: <strong>Rp.{course.price.toFixed(2)}</strong>
          </span>
        </div>
        <Link href={getLinkPath()}>
          <p className="mt-4 text-blue-500 underline" data-testid="show-more-button">
            {pathname === "/dashboard/instructor/manage" ? "Manage" : "Show more"} &rarr;
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
