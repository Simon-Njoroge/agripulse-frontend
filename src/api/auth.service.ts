import { api, apiNoCredentials } from './api';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  RefreshTokenResponse,
  LogoutRequest,
  LogoutResponse,
  GetMeResponse,
  ApiResponse,
} from '../types/auth.types';

export const authService = {
  
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiNoCredentials.post<ApiResponse<LoginResponse>>('/auth/login', data);
    
   
    if (response.data.success && !('requireForceLogin' in response.data.data)) {
      const loginData = response.data.data as LoginResponse;
      if ('access_token' in loginData) {
        localStorage.setItem('access_token', loginData.access_token);
        localStorage.setItem('refresh_token', loginData.refresh_token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
      }
    }
    
    return response.data;
  },

 
  async forceLogin(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiNoCredentials.post<ApiResponse<LoginResponse>>('/auth/login', {
      ...data,
      forceLogin: true,
    });
    
    if (response.data.success) {
      const loginData = response.data.data as LoginResponse;
      if ('access_token' in loginData) {
        localStorage.setItem('access_token', loginData.access_token);
        localStorage.setItem('refresh_token', loginData.refresh_token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
      }
    }
    
    return response.data;
  },

 
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const response = await apiNoCredentials.post<ApiResponse<SignupResponse>>('/auth/signup', data);
    return response.data;
  },


  async refreshTokens(): Promise<ApiResponse<RefreshTokenResponse>> {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    
    if (response.data.success) {
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('refresh_token', response.data.data.refresh_token);
    }
    
    return response.data;
  },

 
  async logout(data: LogoutRequest): Promise<ApiResponse<LogoutResponse>> {
    const response = await api.post<ApiResponse<LogoutResponse>>('/auth/logout');
    
   
    if (response.data.success) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
    
    return response.data;
  },

 
  async getMe(): Promise<ApiResponse<GetMeResponse>> {
    const response = await api.get<ApiResponse<GetMeResponse>>('/auth/me');
    return response.data;
  },
};