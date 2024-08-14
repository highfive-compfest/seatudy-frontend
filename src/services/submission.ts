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
