import React from "react";
import Link from "next/link";
import { Course } from "@/types/course/course";
import { usePathname } from "next/navigation";
import StarRatings from "react-star-ratings";

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
        <div className="flex flex-row items-center mt-2">
          <StarRatings rating={course.rating} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="2px" name="rating" />
        </div>
        <div className="flex flex-row justify-between items-start md:items-center mt-4 text-sm" data-testid="course-details">
          <span data-testid="course-difficulty">
            Difficulty: <strong>{course.difficulty}</strong>
          </span>
          <span data-testid="course-price">
            Price: <strong>Rp.{course.price}</strong>
          </span>
        </div>
        <div className="mt-2">
          <span className="text-gray-700 text-sm" data-testid="course-category">
            Category: <strong>{course.category}</strong>
          </span>
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

export default CourseCard;
