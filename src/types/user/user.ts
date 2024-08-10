export interface UserPayload {
  id: string;
  email: string;
  name: string;
  image_url: string;
  role: string;
  created_at: string;
  updated_at: string;
  is_email_verified: string;
}

export interface UserResponse {
  message: string;
  payload: UserPayload;
}
