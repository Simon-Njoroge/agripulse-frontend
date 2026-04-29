import { api } from './api';
import type {
  ApiResponse,
  AdminDashboard,
  AgentDashboard,
} from '@/types/auth.types';

export const dashboardService = {
  async getAdminDashboard(): Promise<ApiResponse<AdminDashboard>> {
    const response = await api.get<ApiResponse<AdminDashboard>>(
      '/dashboard/admin'
    );
    return response.data;
  },

  async getAgentDashboard(): Promise<ApiResponse<AgentDashboard>> {
    const response = await api.get<ApiResponse<AgentDashboard>>(
      '/dashboard/agent'
    );
    return response.data;
  },
};
