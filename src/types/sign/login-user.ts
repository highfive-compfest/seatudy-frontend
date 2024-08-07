export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  payload: {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      email: string;
      is_email_verified: boolean;
      name: string;
      role: string;
      image_url: string;
      balance: number;
      created_at: string;
      updated_at: string;
    };
  } | null;
}
