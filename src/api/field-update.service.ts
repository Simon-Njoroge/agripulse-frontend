import { api } from './api';
import type {
  ApiResponse,
  FieldUpdate,
  PaginatedResponse,
  FieldUpdateFilters,
} from '@/types/auth.types';

export const fieldUpdateService = {
  async getAllUpdates(
    filters?: FieldUpdateFilters
  ): Promise<ApiResponse<PaginatedResponse<FieldUpdate>>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<ApiResponse<PaginatedResponse<FieldUpdate>>>(
      `/field-updates/all?${params.toString()}`
    );
    return response.data;
  },

  async getMyUpdates(
    filters?: FieldUpdateFilters
  ): Promise<ApiResponse<PaginatedResponse<FieldUpdate>>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<ApiResponse<PaginatedResponse<FieldUpdate>>>(
      `/field-updates/my-updates?${params.toString()}`
    );
    return response.data;
  },

  async getFieldUpdates(
    fieldId: string,
    filters?: FieldUpdateFilters
  ): Promise<ApiResponse<PaginatedResponse<FieldUpdate>>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<ApiResponse<PaginatedResponse<FieldUpdate>>>(
      `/field-updates/field/${fieldId}?${params.toString()}`
    );
    return response.data;
  },

  async addNote(
    fieldId: string,
    notes: string
  ): Promise<ApiResponse<FieldUpdate>> {
    const response = await api.post<ApiResponse<FieldUpdate>>(
      '/field-updates/note',
      { fieldId, notes }
    );
    return response.data;
  },
};
