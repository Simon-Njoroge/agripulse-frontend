import {  apiNoCredentials } from './api';
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
    

    const wrappedData = response.data.data.data;
    console.log('auth.service.login - wrappedData:', wrappedData);
    console.log('Has requireForceLogin:', 'requireForceLogin' in (wrappedData || {}));

    
    if (wrappedData && !('requireForceLogin' in wrappedData)) {
      const loginData = wrappedData as LoginResponse;
      if ('access_token' in loginData) {
        localStorage.setItem('access_token', loginData.access_token);
        localStorage.setItem('refresh_token', loginData.refresh_token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
      }
    }
    
    return wrappedData;
  },

 
  async forceLogin(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiNoCredentials.post<ApiResponse<LoginResponse>>('/auth/login', {
      ...data,
      forceLogin: true,
    });
    
    const wrappedData = response.data.data.data;
    
    if (wrappedData && 'access_token' in wrappedData) {
      const loginData = wrappedData as LoginResponse;
      localStorage.setItem('access_token', loginData.access_token);
      localStorage.setItem('refresh_token', loginData.refresh_token);
      localStorage.setItem('user', JSON.stringify(loginData.user));
    }
    
    return wrappedData;
  },

 
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    const response = await apiNoCredentials.post<ApiResponse<SignupResponse>>('/auth/signup', data);
    return response.data.data.data;
  },


  async refreshTokens(): Promise<ApiResponse<RefreshTokenResponse>> {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await api.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    
    const wrappedData = response.data.data.data;
    if (wrappedData) {
      localStorage.setItem('access_token', wrappedData.access_token);
      localStorage.setItem('refresh_token', wrappedData.refresh_token);
    }
    
    return wrappedData;
  },

 
  async logout(_data: LogoutRequest): Promise<ApiResponse<LogoutResponse>> {
    const response = await api.post<ApiResponse<LogoutResponse>>('/auth/logout');
    
    const wrappedData = response.data.data.data;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    return wrappedData;
  },

 
  async getMe(): Promise<ApiResponse<GetMeResponse>> {
    const response = await api.get<ApiResponse<GetMeResponse>>('/auth/me');
    return response.data.data.data;
  },
};