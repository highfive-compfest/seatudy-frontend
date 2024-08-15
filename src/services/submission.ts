import { GetAllSubmissionRes } from "@/types/submission/submission";
import { axiosInstance } from "./api-config";

export const createSubmission = async (formData: FormData, token: string): Promise<{ message: string; payload: any }> => {
  try {
    const response = await axiosInstance.post("submissions", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};

export const getSubmission= async (assignmentId: string): Promise<GetAllSubmissionRes> => {
  try {
      const response = await axiosInstance.get<GetAllSubmissionRes>(`submissions/assignments/${assignmentId}`);
      return response.data;
      } catch (error) {
      console.error("Error fetching course details:", error);
      throw error;
      }
  };

  export const updateGrade = async (submissionId:string, value: number, token: string) => {
    try {
      const response = await axiosInstance.put(`submissions/grade/${submissionId}`, {grade : value}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Grade uploaded successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading Grade:", error);
      throw error;
    }
};
