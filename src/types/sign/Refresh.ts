export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  message: string;
  payload: {
    access_token: string;
  } | null;
}
