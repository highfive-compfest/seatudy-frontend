import { EditAssignment, GetAssignmentRes, GetAssignmentsRes, PostAssignment } from "@/types/assignment/assignment";
import { axiosInstance } from "./api-config";

export const createAssignment = async (data : PostAssignment, token: string) => {
    try {
      const response = await axiosInstance.post(`assignments`, data, {
        headers: {
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

export const updateAssignment = async (assignmentId:string, formData: EditAssignment, token: string) => {
    try {
      const response = await axiosInstance.put(`assignments/${assignmentId}`, formData, {
        headers: {
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

export const deleteAssignment = async (token: string, assignmentId:string) => {
    try {
      const response = await axiosInstance.delete(`assignments/${assignmentId}`, {
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

export const getAssignmentByCourse = async (courseId: string, token : string): Promise<GetAssignmentsRes> => {
try {
    const response = await axiosInstance.get<GetAssignmentsRes>(`assignments/course/${courseId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
    }
};

export const getAssignmentById = async (assignmentId: string, token : string): Promise<GetAssignmentRes> => {
try {
    const response = await axiosInstance.get<GetAssignmentRes>(`assignments/${assignmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
    }
};