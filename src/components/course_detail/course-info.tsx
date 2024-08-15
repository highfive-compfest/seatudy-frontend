import React from "react";
import StarRatings from "react-star-ratings";
import { Course } from "@/types/course/course";

interface CourseInfoProps {
  courseDetail: Course;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ courseDetail }) => {
  return (
    <>
      <div className="w-full md:pr-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{courseDetail.title}</h1>

        <div className="relative w-full h-64 mb-8">
          <img className="w-full h-full object-cover rounded-xl shadow-lg" src={courseDetail.image_url} alt={courseDetail.title} />
        </div>

        <p className="text-base md:text-medium text-gray-700 mb-6 leading-relaxed text-justify">{courseDetail.description}</p>

        <h2 className="text-large md:text-xl font-semibold text-gray-800 mb-4">Course Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-base md:text-lg font-medium text-gray-700">Price</h3>
            <p className="text-base md:text-xl text-gray-900 font-semibold">Rp.{courseDetail.price.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-medium text-gray-700">Difficulty</h3>
            <p className="text-base md:text-gray-800 capitalize">{courseDetail.difficulty}</p>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-medium text-gray-700 mb-1">Category</h3>
            <p className="text-base md:text-gray-800 capitalize">{courseDetail.category}</p>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-medium text-gray-700 mb-1">Syllabus</h3>
            <a href={courseDetail.syllabus_url} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
              View Syllabus
            </a>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-medium text-gray-700 mb-1">Rating</h3>
            <StarRatings rating={courseDetail.rating} starRatedColor="gold" numberOfStars={5} starDimension="20px" starSpacing="2px" name="rating" />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Additional Information</h2>
        <div className="bg-gray-100 border-2 border-gray-200 p-6 rounded-lg shadow">
          <p className="mb-2 text-sm md:text-gray-600">
            <strong className="text-base md:text-gray-700">Created At: </strong>
            {new Date(courseDetail.created_at).toLocaleDateString()}
          </p>
          <p className="text-sm md:text-gray-600">
            <strong className="text-base md:text-gray-700">Last Updated: </strong>
            {new Date(courseDetail.updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
