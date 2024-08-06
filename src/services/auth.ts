import { PasswordResetRequest, PasswordResetResponse } from "@/types/sign/reset-password";
import { axiosInstance } from "../services/api-config";
import { VerifyPasswordResetRequest, VerifyPasswordResetResponse } from "@/types/sign/verify-password";
import { ChangePasswordRequest, ChangePasswordResponse } from "@/types/sign/change-password";

export const requestPasswordReset = async (data: PasswordResetRequest): Promise<PasswordResetResponse> => {
  try {
    const response = await axiosInstance.post<PasswordResetResponse>("auth/password/reset/request", data);
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

export const verifyPasswordReset = async (data: VerifyPasswordResetRequest): Promise<VerifyPasswordResetResponse> => {
  try {
    const response = await axiosInstance.patch<VerifyPasswordResetResponse>("auth/password/reset/verify", data);
    return response.data;
  } catch (error) {
    console.error("Error verifying password reset:", error);
    throw error;
  }
};

export const changePassword = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    const response = await axiosInstance.patch<ChangePasswordResponse>("auth/password/change", data);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};