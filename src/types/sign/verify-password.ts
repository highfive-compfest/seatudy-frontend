export interface VerifyPasswordResetRequest {
  email: string;
  token: string;
  new_password: string;
}

export interface VerifyPasswordResetResponse {
  message: string;
  payload: any;
}
