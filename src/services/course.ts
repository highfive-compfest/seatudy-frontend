import { CoursesResponse, deleteCourseResponse, getCoursesIdResponse } from "@/types/course/course";
import { axiosInstance } from "./api-config";

export const getAllCourses = async (): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>("courses");
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
    const response = await axiosInstance.get<CoursesResponse>(`courses/instructor/${instructorId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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

export const deleteCourseById = async (accessToken: string, courseId: string): Promise<deleteCourseResponse> => {
  try {
    const response = await axiosInstance.delete<CoursesResponse>(
      `courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};
