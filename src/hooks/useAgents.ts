import { useQuery } from '@tanstack/react-query';
import { userService } from '@/api/user.service';

export function useAgents() {
  return useQuery({
    queryKey: ['users', 'agents'],
    queryFn: async () => {
      const response = await userService.getAgents();
      if (!response.success) {
        throw new Error('Failed to fetch agents');
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 30,
  });
}
