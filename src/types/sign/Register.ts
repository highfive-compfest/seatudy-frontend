export interface RegisterUserRequest {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface RegisterUserResponse {
  message: string;
  payload: any;
}
