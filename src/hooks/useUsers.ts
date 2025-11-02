import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import type { PaginatedResponse, User } from '@/types';

/**
 * Example hook for fetching users with TanStack Query
 */
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiService.getUsers();
      return response.data as PaginatedResponse<User>;
    },
  });
}
