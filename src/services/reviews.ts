import { ReviewResponse, ReviewsResponse } from "@/types/reviews/reviews";
import { axiosInstance } from "./api-config";

export const createReview = async (token: string, courseId: string, rating: number, feedback: string): Promise<ReviewResponse> => {
  try {
    const response = await axiosInstance.post<ReviewResponse>(
      "reviews",
      {
        course_id: courseId,
        rating: rating,
        feedback: feedback,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const getReviews = async (courseId: string, page: number = 1, limit: number = 10, rating: number = 0): Promise<ReviewsResponse> => {
  try {
    const response = await axiosInstance.get<ReviewsResponse>("reviews", {
      params: {
        course_id: courseId,
        page,
        limit,
        rating,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const updateReview = async (reviewId: string, rating: number, feedback: string): Promise<void> => {
  try {
    await axiosInstance.patch(`reviews/${reviewId}`, {
      rating,
      feedback,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
