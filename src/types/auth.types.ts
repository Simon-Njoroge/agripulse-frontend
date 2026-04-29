
export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
}


export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}


export interface LoginRequest {
  email: string;
  password: string;
  forceLogin?: boolean;
}


export interface LoginSuccessResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}


export interface ForceLoginRequiredResponse {
  requireForceLogin: true;
  user: User;
}


export type LoginResponse = LoginSuccessResponse | ForceLoginRequiredResponse;


export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}


export interface SignupResponse {
  message: string;
  user: User;
}


export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}


export interface LogoutRequest {
  session_id: string;
}


export interface LogoutResponse {
  message: string;
}


export interface GetMeResponse extends User {
  lastLoginAt: string;
  createdAt: string;
}


export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}