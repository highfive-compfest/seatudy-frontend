import { GetMaterialRes, GetMaterialsRes } from "@/types/material/material-courseid";
import { axiosInstance } from "./api-config";
import { GetMateriAttachRes } from "@/types/material/materi-attach";

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

export const createMaterialAttach = async (materialId:string, formData: FormData, token: string) => {
  try {
    const response = await axiosInstance.post(`materials/addAttachment/${materialId}`, formData, {
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

export const updateMaterialAttach = async (materiId:string, formData: FormData, token: string) => {
  try {
    const response = await axiosInstance.put(`attachments/${materiId}`, formData, {
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

export const getMaterialAttachById = async (materiAttachId: string): Promise<GetMateriAttachRes> => {
try {
    const response = await axiosInstance.get<GetMateriAttachRes>(`attachments/${materiAttachId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

export const deleteMateriAttach = async (token: string, materiAttachId:string) => {
  try {
    const response = await axiosInstance.delete(`attachments/${materiAttachId}`, {
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