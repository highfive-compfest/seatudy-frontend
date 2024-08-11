import { GetMaterialRes, Material } from "@/types/material/material-courseid";
import { axiosInstance } from "./api-config";

export const createMaterial = async (formData: FormData, token: string) => {
  try {
    const response = await axiosInstance.post(`materials`, formData, {
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

export const getMaterialByCourse = async (courseId: string): Promise<GetMaterialRes> => {
try {
    const response = await axiosInstance.get<GetMaterialRes>(`materials/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};
