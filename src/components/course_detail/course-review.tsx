import { getReviews } from "@/services/reviews";
import { Review, ReviewsResponse } from "@/types/reviews/reviews";
import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

interface CourseReviewsProps {
  courseId: string;
}

const CourseReviews: React.FC<CourseReviewsProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      try {
        const reviewsResponse: ReviewsResponse = await getReviews(courseId, 1, 10, 0);
        setReviews(reviewsResponse.payload.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
    setLoading(false);
  }, [courseId]);

  return (
    <div className="mt-12 bg-gray-100 border-2 border-x-gray-200 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Course Reviews</h2>
      <div className="space-y-6 bg-white">
        {loading ? (
          <p className="text-gray-700 bg-gray-100">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500 bg-gray-100">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-700 bg-gray-100">No reviews yet. Be the first to review this course!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-2">
                <AiFillStar className="text-yellow-500 mr-2" />
                <span className="text-lg font-medium text-gray-800">{review.rating}</span>
              </div>
              <p className="text-gray-700 mb-4">{review.feedback}</p>
              <div className="text-sm text-gray-500">
                <span>User ID: {review.user_id}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
