import { PasswordResetRequest, PasswordResetResponse } from "@/types/sign/reset-password";
import { axiosInstance } from "../services/api-config";

export const requestPasswordReset = async (data: PasswordResetRequest): Promise<PasswordResetResponse> => {
  try {
    const response = await axiosInstance.post<PasswordResetResponse>("auth/password/reset/request", data);
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};
