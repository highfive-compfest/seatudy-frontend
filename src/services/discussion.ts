import { DiscussionsResponse, ReplyResponse } from "@/types/discussion/discussion";
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

export const createReply = async (discussionId: string, content: string, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      "forums/replies",
      {
        discussion_id: discussionId,
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
    console.error("Error creating reply:", error);
    throw error;
  }
};

export const updateDiscussion = async (discussionId: string, title: string, content: string, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.patch(
      `forums/discussions/${discussionId}`,
      {
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
    console.error("Error updating discussion:", error);
    throw error;
  }
};

export const deleteDiscussion = async (discussionId: string, token: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`forums/discussions/${discussionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting discussion:", error);
    throw error;
  }
};

export const getRepliesByDiscussionId = async (discussionId: string, token: string, page: number = 1, limit: number = 10): Promise<ReplyResponse> => {
  try {
    const response = await axiosInstance.get("forums/replies", {
      params: {
        DiscussionID: discussionId,
        page,
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching replies:", error);
    throw error;
  }
};
