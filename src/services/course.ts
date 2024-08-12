import { CoursesResponse, DeleteCourseResponse, getCoursesIdResponse } from "@/types/course/course";
import { axiosInstance } from "./api-config";
import { title } from "process";

export interface GetCoursesParams {
  page?: number;
  limit?: number;
}

export const getAllCourses = async (params: GetCoursesParams = { page: 1, limit: 10 }): Promise<CoursesResponse> => {
  try {
    const { page = 1, limit = 10 } = params;

    const response = await axiosInstance.get<CoursesResponse>("courses", {
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourseById = async (courseId: string): Promise<getCoursesIdResponse> => {
  try {
    const response = await axiosInstance.get<getCoursesIdResponse>(`courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const getInstructorCourse = async (accessToken: string, instructorId: string): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>(`courses/instructor/${instructorId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const createCourse = async (formData: FormData, token: string) => {
  try {
    const response = await axiosInstance.post("courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Course uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading course:", error);
    throw error;
  }
};

export const updateCourseById = async (formData: FormData, token: string, courseId: string | undefined) => {
  try {
    const response = await axiosInstance.put(`courses/${courseId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      params: {
        title: formData.get("title")?.toString() || "",
      },
    });
    console.log("Course uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading course:", error);
    throw error;
  }
};

export const deleteCourseById = async (accessToken: string, courseId: string): Promise<DeleteCourseResponse> => {
  try {
    const response = await axiosInstance.delete<DeleteCourseResponse>(`courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

export const purchaseCourse = async (token: string, courseId: string) => {
  try {
    const response = await axiosInstance.post(
      `courses/buy/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error purchasing course:", error);
    throw error;
  }
};
