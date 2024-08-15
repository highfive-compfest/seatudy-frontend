import { AxiosResponse } from "axios";
import { axiosInstance } from "./api-config";
import { NotificationsResponse } from "@/types/notification/notification";

export const getNotifications = async (token: string, page: number = 1, limit: number = 10): Promise<NotificationsResponse> => {
  try {
    const response = await axiosInstance.get<NotificationsResponse>("notifications/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (token: string, notificationId: string): Promise<void> => {
  try {
    await axiosInstance.patch(
      `/notifications/read/${notificationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
