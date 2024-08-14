import React from "react";
import Link from "next/link";
import { Course } from "@/types/course/course";
import { usePathname } from "next/navigation";
import StarRatings from "react-star-ratings";

interface CourseCardProps {
  course: Course;
  progress: number;
}

const CourseCard2: React.FC<CourseCardProps> = ({ course, progress }) => {
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
    <div key={course.id} className="bg-white rounded-lg shadow flex-shrink-0 w-full md:w-[22em] border-2 border-gray-200">
      <div className="relative h-48">
        <img src={course.image_url || placeholderImage} alt={course.title} className="absolute inset-0 w-full h-full object-cover rounded-t-lg" data-testid="course-image" />
      </div>
      <div className="p-4">
        <h2 className="text-large font-bold line-clamp-1" data-testid="course-title">
          {course.title}
        </h2>
        <p className="text-gray-600 mt-2 line-clamp-2 text-sm justify-between" data-testid="course-description">
          {course.description}
        </p>
        <div className="flex flex-row justify-between items-start md:items-center mt-4 text-sm" data-testid="course-details">
          <span data-testid="course-difficulty">
            Difficulty: <strong>{course.difficulty}</strong>
          </span>
          <StarRatings rating={course.rating} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="2px" name="rating" />
        </div>

        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between text-xs font-medium text-gray-700">
              <h3 className="text-sm font-semibold">Progress</h3>
              <span>{progress}%</span>
            </div>
            <div className="relative">
              <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gray-200 rounded">
                <div style={{ width: `${progress}%` }} className="flex flex-col text-center text-white whitespace-nowrap bg-blue-600 shadow-none transition-all duration-500 ease-in-out"></div>
              </div>
            </div>
          </div>
        </div>

        <Link href={getLinkPath()}>
          <p className="mt-4 text-blue-500 hover:underline" data-testid="show-more-button">
            {pathname === "/dashboard/instructor/manage" ? "Manage" : "Show more"} &rarr;
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard2;
