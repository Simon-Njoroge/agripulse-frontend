import { useQuery } from '@tanstack/react-query';
import { fieldService } from '@/api/field.service';
import type { FieldFilters } from '@/types/auth.types';

export function useFields(filters?: FieldFilters, adminMode = false) {
  return useQuery({
    queryKey: ['fields', filters, adminMode],
    queryFn: async () => {
      const response = adminMode
        ? await fieldService.getAdminFields(filters)
        : await fieldService.getMyFields(filters);
      
      if (!response.success) {
        throw new Error('Failed to fetch fields');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyFields(filters?: FieldFilters) {
  return useFields(filters, false);
}

export function useAdminFields(filters?: FieldFilters) {
  return useFields(filters, true);
}
