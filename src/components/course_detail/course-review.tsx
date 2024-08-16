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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const reviewsResponse: ReviewsResponse = await getReviews(courseId, currentPage, 5, 0);
        setReviews(reviewsResponse.payload.data);
        setTotalPages(reviewsResponse.payload.pagination.total_page);
      } catch (error) {
        setError("Error fetching reviews.");
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId, currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
      <div className="flex justify-between items-center mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="text-gray-700 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseReviews;
