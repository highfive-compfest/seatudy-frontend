import { DiscussionsResponse } from "@/types/discussion/discussion";
import { axiosInstance } from "./api-config";

export const getDiscussionsByCourseId = async (courseId: string, token: string, limit: number = 10, page: number = 1): Promise<DiscussionsResponse> => {
  try {
    const response = await axiosInstance.get("forums/discussions", {
      params: {
        course_id: courseId,
        limit,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching discussions:", error);
    throw error;
  }
};

export const createDiscussion = async (courseId: string, title: string, content: string, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      "forums/discussions",
      {
        course_id: courseId,
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating discussion:", error);
    throw error;
  }
};
