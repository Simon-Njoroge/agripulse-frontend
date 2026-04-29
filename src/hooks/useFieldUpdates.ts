import { useQuery } from '@tanstack/react-query';
import { fieldUpdateService } from '@/api/field-update.service';
import type { FieldUpdateFilters } from '@/types/auth.types';

export function useFieldUpdates(filters?: FieldUpdateFilters) {
  return useQuery({
    queryKey: ['field-updates', 'all', filters],
    queryFn: async () => {
      const response = await fieldUpdateService.getAllUpdates(filters);
      if (!response.success) {
        throw new Error('Failed to fetch field updates');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyFieldUpdates(filters?: FieldUpdateFilters) {
  return useQuery({
    queryKey: ['field-updates', 'my-updates', filters],
    queryFn: async () => {
      const response = await fieldUpdateService.getMyUpdates(filters);
      if (!response.success) {
        throw new Error('Failed to fetch my updates');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFieldUpdatesForField(
  fieldId: string,
  filters?: FieldUpdateFilters
) {
  return useQuery({
    queryKey: ['field-updates', 'field', fieldId, filters],
    queryFn: async () => {
      const response = await fieldUpdateService.getFieldUpdates(
        fieldId,
        filters
      );
      if (!response.success) {
        throw new Error('Failed to fetch field updates');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
