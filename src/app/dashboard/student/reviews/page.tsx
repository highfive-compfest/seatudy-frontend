"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { getAllCourses } from "../../../../services/course";
import { Course, CoursesResponse } from "../../../../types/course/course";

interface Review {
  id: number;
  content: string;
  rating: number;
}

const ReviewPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse: CoursesResponse = await getAllCourses();
        setCourses(coursesResponse.payload);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setReviews([]); // Reset reviews when selecting a new course
  };

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReview && rating > 0 && selectedCourse) {
      const review: Review = {
        id: reviews.length + 1,
        content: newReview,
        rating: rating,
      };
      setReviews([...reviews, review]);
      setNewReview("");
      setRating(0);
    }
  };

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(e.target.value);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRating(Number(e.target.value));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-yellow-500">
            ★
          </span>
        ))}
        {[...Array(5 - rating)].map((_, i) => (
          <span key={i} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 mt-24 w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6 h-[calc(100vh-12rem)] overflow-y-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Select a Course</h2>
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 flex items-start gap-4 ${
                  selectedCourse?.id === course.id ? "bg-blue-100 text-blue-700 border-blue-500 border-2" : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                onClick={() => handleCourseSelect(course)}
              >
                <img src={course.image_url} alt={course.title} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-gray-200 rounded-lg bg-white shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Leave a Review</h2>
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
                  Submit Review
                </button>
              </form>

              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                      <p className="text-base text-gray-700 mb-2">{review.content}</p>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {review.rating} Star{review.rating > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No reviews yet. Be the first to leave one!</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Please select a course to review.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
