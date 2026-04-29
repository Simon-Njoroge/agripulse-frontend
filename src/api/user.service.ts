import { api } from './api';
import type { ApiResponse, User } from '@/types/auth.types';

export const userService = {
  async getAgents(): Promise<ApiResponse<User[]>> {
    const response = await api.get<ApiResponse<User[]>>('/users/agents');
    return response.data;
  },
};
