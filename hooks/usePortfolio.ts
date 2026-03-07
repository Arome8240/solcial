import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { Portfolio } from '@/types';

export function usePortfolio(userId: string) {
  return useQuery<Portfolio>({
    queryKey: ['portfolio', userId],
    queryFn: async () => {
      const response = await api.getUserPortfolio(userId);
      if (response.error) throw new Error(response.error);
      return response.data as Portfolio;
    },
    enabled: !!userId,
    refetchInterval: 60000, // Refetch every minute
  });
}
