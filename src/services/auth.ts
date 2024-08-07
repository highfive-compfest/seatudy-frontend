import { PasswordResetRequest, PasswordResetResponse } from "../types/sign/reset-password";
import { axiosInstance } from "../services/api-config";
import { VerifyPasswordResetRequest, VerifyPasswordResetResponse } from "../types/sign/verify-password";
import { ChangePasswordRequest, ChangePasswordResponse } from "../types/sign/change-password";
import { RegisterUserRequest, RegisterUserResponse } from "../types/sign/register-user";
import { LoginRequest, LoginResponse } from "../types/sign/login";

export const registerUser = async (data: RegisterUserRequest): Promise<RegisterUserResponse> => {
  try {
    const response = await axiosInstance.post<RegisterUserResponse>("auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

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

export const changePassword = async (data: ChangePasswordRequest, accessToken: string): Promise<ChangePasswordResponse> => {
  try {
    const response = await axiosInstance.patch<ChangePasswordResponse>("auth/password/change", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
