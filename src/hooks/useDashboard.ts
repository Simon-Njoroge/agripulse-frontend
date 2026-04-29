import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/api/dashboard.service';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'admin'],
    queryFn: async () => {
      const response = await dashboardService.getAdminDashboard();
      if (!response.success) {
        throw new Error('Failed to fetch admin dashboard');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useAgentDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'agent'],
    queryFn: async () => {
      const response = await dashboardService.getAgentDashboard();
      if (!response.success) {
        throw new Error('Failed to fetch agent dashboard');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}
