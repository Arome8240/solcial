import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';

export function usePosts() {
  const queryClient = useQueryClient();

  // Get feed with infinite scroll
  const {
    data: feedData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingFeed,
    refetch: refetchFeed,
  } = useInfiniteQuery({
    queryKey: ['posts', 'feed'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getFeed(pageParam, 20);
      if (response.error) throw new Error(response.error);
      return response.data || [];
    },
    getNextPageParam: (lastPage, pages) => {
      return Array.isArray(lastPage) && lastPage.length === 20 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Create post
  const createPostMutation = useMutation({
    mutationFn: async ({ content, images }: { content: string; images?: string[] }) => {
      const response = await api.createPost(content, images);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', 'feed'] });
      toast.success('Post created!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Like post
  const likePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await api.likePost(postId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Unlike post
  const unlikePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await api.unlikePost(postId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Delete post
  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await api.deletePost(postId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const posts = feedData?.pages.flat() || [];

  return {
    posts,
    isLoadingFeed,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchFeed,
    createPost: createPostMutation.mutate,
    isCreatingPost: createPostMutation.isPending,
    likePost: likePostMutation.mutate,
    unlikePost: unlikePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
  };
}

export function usePost(postId: string) {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await api.getPost(postId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!postId,
  });
}

export function useUserPosts(username: string) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['posts', 'user', username],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getUserPosts(username, pageParam, 20);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      return Array.isArray(lastPage) && lastPage.length === 20 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!username,
  });

  const posts = data?.pages.flat() || [];

  return {
    posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
