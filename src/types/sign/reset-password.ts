export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  message: string;
  payload: any;
}
