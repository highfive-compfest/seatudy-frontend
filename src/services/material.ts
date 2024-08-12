import { GetMaterialRes, GetMaterialsRes } from "@/types/material/material-courseid";
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

export const updateMaterial = async (materiId:string, formData: FormData, token: string) => {
  try {
    const response = await axiosInstance.put(`materials/${materiId}`, formData, {
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

export const deleteMaterial = async (token: string, materialId:string) => {
  try {
    const response = await axiosInstance.delete(`materials/${materialId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Course uploaded successfully:", response.data);
    return response.status;
  } catch (error) {
    console.error("Error uploading course:", error);
    throw error;
  }
};

export const getMaterialByCourse = async (courseId: string): Promise<GetMaterialsRes> => {
try {
    const response = await axiosInstance.get<GetMaterialsRes>(`materials/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const getMaterialById = async (materiId: string): Promise<GetMaterialRes> => {
try {
    const response = await axiosInstance.get<GetMaterialRes>(`materials/${materiId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};