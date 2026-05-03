import { api } from './api';
import type {
  ApiResponse,
  Field,
  PaginatedResponse,
  FieldFilters,
} from '@/types/auth.types';

export const fieldService = {
  // Admin endpoints
  async getAdminFields(
    filters?: FieldFilters
  ): Promise<ApiResponse<PaginatedResponse<Field>>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.cropType) params.append('cropType', filters.cropType);
    if (filters?.agentId) params.append('agentId', filters.agentId);
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get<ApiResponse<PaginatedResponse<Field>>>(
      `/field-updates/all?${params.toString()}`
    );
    return response.data;
  },

  async createField(fieldData: Partial<Field>): Promise<ApiResponse<Field>> {
    const response = await api.post<ApiResponse<Field>>('/fields', fieldData);
    return response.data;
  },

  async updateField(
    id: string,
    fieldData: Partial<Field>
  ): Promise<ApiResponse<Field>> {
    const response = await api.put<ApiResponse<Field>>(
      `/fields/${id}`,
      fieldData
    );
    return response.data;
  },

  async deleteField(id: string): Promise<ApiResponse<{ success: boolean }>> {
    const response = await api.delete<ApiResponse<{ success: boolean }>>(
      `/fields/${id}`
    );
    return response.data;
  },

  async assignField(
    id: string,
    agentId: string
  ): Promise<ApiResponse<Field>> {
    const response = await api.patch<ApiResponse<Field>>(
      `/fields/${id}/assign`,
      { agentId }
    );
    return response.data;
  },

  // Agent endpoints
  async getMyFields(
    filters?: FieldFilters
  ): Promise<ApiResponse<PaginatedResponse<Field>>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.stage) params.append('stage', filters.stage);

    const response = await api.get<ApiResponse<PaginatedResponse<Field>>>(
      `/fields/my-fields?${params.toString()}`
    );
    return response.data;
  },

  async updateFieldStage(
    id: string,
    newStage: string,
    notes?: string
  ): Promise<ApiResponse<Field>> {
    const response = await api.patch<ApiResponse<Field>>(
      `/fields/${id}/stage`,
      { newStage, notes }
    );
    return response.data;
  },
};
