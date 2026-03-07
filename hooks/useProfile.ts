import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';

export function useProfile() {
  const queryClient = useQueryClient();

  // Update profile
  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name?: string; bio?: string; avatar?: string }) => {
      const response = await api.updateProfile(data);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profile updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending,
  };
}

export function useUserProfile(username: string) {
  return useQuery({
    queryKey: ['user', 'profile', username],
    queryFn: async () => {
      const response = await api.getUserByUsername(username);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!username,
  });
}

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ['users', 'search', query],
    queryFn: async () => {
      const response = await api.searchUsers(query);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: query.length > 0,
  });
}
