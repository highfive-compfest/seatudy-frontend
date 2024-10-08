"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getBoughtCourse } from "../../../../services/course";
import { createReview, updateReview, getReviews } from "../../../../services/reviews";
import { Course, CourseProgress } from "../../../../types/course/course";
import { getCookie } from "cookies-next";
import CourseSelection from "@/components/dashboard/user/course-selection";
import ReviewForm from "@/components/dashboard/user/review-form";
import { Review, ReviewsResponse } from "@/types/reviews/reviews";

const ReviewPage: React.FC = () => {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);
  const authToken = (getCookie("authToken") as string) || "";

  const coursesArray: Course[] = courses.map((item) => item.course).filter((course) => course !== null) as Course[];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await getBoughtCourse(authToken);
        setCourses(coursesResponse.payload || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [authToken]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedCourse) {
        let allReviews: Review[] = [];
        let page = 1;
        const pageSize = 30;
        let userReviewFound = false;
        const currentUserId = getCookie("userId") as string;

        while (!userReviewFound) {
          try {
            const reviewsResponse: ReviewsResponse = await getReviews(selectedCourse.id, page, pageSize, 0);
            const fetchedReviews = reviewsResponse.payload?.data || [];
            allReviews = [...allReviews, ...fetchedReviews];

            const existingReview = fetchedReviews.find((review) => review.user_id === currentUserId);
            if (existingReview) {
              setIsEditing(true);
              setCurrentReviewId(existingReview.id);
              setNewReview(existingReview.feedback || "");
              setRating(existingReview.rating || 0);
              userReviewFound = true;
            }

            if (fetchedReviews.length < pageSize) {
              break;
            }

            page++;
          } catch (error) {
            console.error("Error fetching reviews:", error);
            break;
          }
        }

        setReviews(allReviews);
      }
    };

    fetchReviews();
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse) {
      const currentUserId = getCookie("userId") as string;
      const existingReview = reviews.find((review) => review.user_id === currentUserId);
      if (existingReview) {
        setIsEditing(true);
        setCurrentReviewId(existingReview.id);
        setNewReview(existingReview.feedback || "");
        setRating(existingReview.rating || 0);
      } else {
        setIsEditing(false);
        setCurrentReviewId(null);
        setNewReview("");
        setRating(0);
      }
    }
  }, [selectedCourse, reviews]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setReviews([]);
  };

  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReview && rating > 0 && selectedCourse) {
      try {
        if (isEditing && currentReviewId) {
          await updateReview(currentReviewId, rating, newReview);
          alert("Review updated successfully!");
        } else {
          const response = await createReview(authToken, selectedCourse.id, rating, newReview);
          const newReviewData: Review = {
            id: response.payload?.id || "",
            user_id: getCookie("userId") as string,
            course_id: selectedCourse.id,
            rating: rating,
            feedback: newReview,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setReviews([...reviews, newReviewData]);
          alert("Review submitted successfully!");
        }

        setNewReview("");
        setRating(0);
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Error submitting review: " + error);
      }
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
    <div className="container mx-auto p-0 pb-8 lg:p-6 mt-24 w-full md:h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CourseSelection courses={coursesArray} selectedCourse={selectedCourse} onCourseSelect={handleCourseSelect} />
        <ReviewForm
          selectedCourse={selectedCourse}
          reviews={reviews}
          newReview={newReview}
          rating={rating}
          handleReviewSubmit={handleReviewSubmit}
          handleReviewChange={handleReviewChange}
          handleRatingChange={handleRatingChange}
          renderStars={renderStars}
        />
      </div>
    </div>
  );
};

export default ReviewPage;
