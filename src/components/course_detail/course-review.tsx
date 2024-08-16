import { getReviews } from "@/services/reviews";
import { Review, ReviewsResponse } from "@/types/reviews/reviews";
import React, { useState, useEffect } from "react";
import ReviewItem from "./review-item";

interface CourseReviewsProps {
  courseId: string;
}

const CourseReviews: React.FC<CourseReviewsProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchReviews = async () => {
      try {
        const reviewsResponse: ReviewsResponse = await getReviews(courseId, 1, 10, 0);
        setReviews(reviewsResponse.payload.data);
      } catch (error) {
        setError("Error fetching reviews.");
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  return (
    <div className="mt-12 bg-gray-100 border-2 border-x-gray-200 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Reviews</h2>
      <div className="space-y-6 bg-white">
        {loading ? (
          <p className="text-gray-700 bg-gray-100">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500 bg-gray-100">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-700 bg-gray-100">No reviews yet. Be the first to review this course!</p>
        ) : (
          reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        )}
      </div>
    </div>
  );
};

export default CourseReviews;
