import axios, { AxiosInstance, AxiosResponse } from "axios";
import { setCookie, getCookie } from "cookies-next";

interface RefreshTokenResponse {
  message: string;
  payload: {
    access_token: string;
  };
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const getTokens = (): { accessToken: string | null; refreshToken: string | null } => {
  const accessToken = getCookie("authToken") as string | undefined;
  const refreshToken = getCookie("refreshToken") as string | undefined;

  return {
    accessToken: accessToken ?? null,
    refreshToken: refreshToken ?? null,
  };
};

const setTokens = (accessToken: string, refreshToken: string): void => {
  setCookie("authToken", accessToken, { path: "/", maxAge: 60 * 60 * 24 });
  setCookie("refreshToken", refreshToken, { path: "/", maxAge: 60 * 60 * 24 * 30 });
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokens = getTokens();
        if (tokens.refreshToken) {
          const response = await axiosInstance.post<RefreshTokenResponse>("auth/refresh", {
            refresh_token: tokens.refreshToken,
          });

          if (response.data.message === "REFRESH_SUCCESS") {
            const newAccessToken = response.data.payload.access_token;
            const newRefreshToken = tokens.refreshToken;

            if (newAccessToken && newRefreshToken) {
              setTokens(newAccessToken, newRefreshToken);
              axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
              originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            }
          }
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
