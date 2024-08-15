import { CourseResponse2, CoursesResponse, DeleteCourseResponse, getCoursesIdResponse } from "@/types/course/course";
import { axiosInstance } from "./api-config";
import { title } from "process";

export interface GetCoursesParams {
  page?: number;
  limit?: number;
}

export const getAllCourses = async (page: number = 1, limit: number = 10): Promise<CoursesResponse> => {
  try {
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

export const getCoursesByCategory = async (category: string, page: number = 1, limit: number = 10): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>("courses/filter", {
      params: {
        category,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    throw error;
  }
};

export const getCoursesByDifficulty = async (page: number = 1, limit: number = 10, difficulty: string = "beginner"): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>("courses/filter", {
      params: {
        page,
        limit,
        difficulty,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses by difficulty:", error);
    throw error;
  }
};

export const getCoursesByRating = async (page: number = 1, limit: number = 10, sort: "lowest" | "highest" = "lowest"): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>("courses/filter", {
      params: {
        page,
        limit,
        sort,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching courses by rating:", error);
    throw error;
  }
};

export const getInstructorCourse = async (accessToken: string, instructorId: string, page: number = 1, limit: number = 10): Promise<CoursesResponse> => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;

  try {
    const response = await axiosInstance.get<CoursesResponse>(`courses/instructor/${instructorId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: page || DEFAULT_PAGE,
        limit: limit || DEFAULT_LIMIT,
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

export const getBoughtCourse = async (accessToken: string, page: number = 1, limit: number = 10): Promise<CourseResponse2> => {
  try {
    const response = await axiosInstance.get<CourseResponse2>("courses/mycourse", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bought courses:", error);
    throw error;
  }
};

export const getPopularCourses = async (page: number = 1, limit: number = 5): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>(`courses/popularity?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    throw error;
  }
};

export const searchCourses = async (title: string, page: number = 1, limit: number = 5): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>(`courses/search`, {
      params: {
        title,
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
