"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Course } from "@/types/course/course";
import { Review } from "@/types/reviews/reviews";
import { getCookie } from "cookies-next";
import { deleteReview } from "@/services/reviews";

interface ReviewFormProps {
  selectedCourse: Course | null;
  reviews: Review[];
  newReview: string;
  rating: number;
  handleReviewSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleReviewChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleRatingChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  renderStars: (rating: number) => JSX.Element;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ selectedCourse, reviews, newReview, rating, handleReviewChange, handleRatingChange, handleReviewSubmit, renderStars }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const currentUserId = getCookie("userId") as string;

  useEffect(() => {
    if (selectedCourse) {
      const existingReview = reviews.find((review) => review.user_id === currentUserId && review.course_id === selectedCourse.id);
      if (existingReview) {
        setCurrentReview(existingReview);
        setIsEditing(true);
      } else {
        setCurrentReview(null);
        setIsEditing(false);
      }
    }
  }, [selectedCourse, reviews, currentUserId]);

  const handleDeleteReview = async () => {
    if (currentReview) {
      try {
        await deleteReview(currentReview.id);
        setCurrentReview(null);
        setIsEditing(false);
        alert("Review deleted successfully");
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Error deleting review: " + error);
      }
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 min-h-[30rem]">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{isEditing ? "Edit Your Review" : "Leave a Review"}</h2>
      {selectedCourse ? (
        <>
          <p className="text-center text-gray-600 mb-4">
            Reviewing: <span className="font-semibold">{selectedCourse.title}</span>
          </p>

          <form onSubmit={handleReviewSubmit} className="mb-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={newReview}
                onChange={handleReviewChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Write your review here..."
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select value={rating} onChange={handleRatingChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={0}>Select rating</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Star{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              {isEditing ? "Update Review" : "Submit Review"}
            </button>

            {isEditing && (
              <button type="button" onClick={handleDeleteReview} className="w-full py-3 mt-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Delete Review
              </button>
            )}
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500">Please select a course to review.</p>
      )}
    </div>
  );
};

export default ReviewForm;
