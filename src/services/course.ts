import { CoursesResponse } from "@/types/course/course";
import { axiosInstance } from "./api-config";

export const getAllCourses = async (): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get<CoursesResponse>("/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
