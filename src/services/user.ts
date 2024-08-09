import { UserResponse } from "@/types/user/user";
import { axiosInstance } from "./api-config";

export const getMe = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUser = async (token: string, id: string, name: string, imageFile?: File): Promise<void> => {
  if (!token) {
    throw new Error("No authentication token found.");
  }

  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    if (imageFile) {
      formData.append("image_file", imageFile);
    }

    await axiosInstance.patch("/users/me", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const getUserById = async (token: string, userId: string): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
