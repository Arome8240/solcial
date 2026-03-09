import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';

export function useComments(postId: string) {
  const queryClient = useQueryClient();

  // Get comments
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getComments(postId, pageParam, 20);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    getNextPageParam: (lastPage: any, pages) => {
      return lastPage && Array.isArray(lastPage) && lastPage.length === 20 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!postId,
  });

  // Create comment
  const createCommentMutation = useMutation({
    mutationFn: async ({ content, parentCommentId }: { content: string; parentCommentId?: string }) => {
      const response = await api.createComment(postId, content, parentCommentId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      toast.success('Comment added!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Like comment
  const likeCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await api.likeComment(commentId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to like comment: ${error.message}`);
    },
  });

  // Unlike comment
  const unlikeCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await api.unlikeComment(commentId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to unlike comment: ${error.message}`);
    },
  });

  const comments = data?.pages.flat() || [];

  return {
    comments,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    createComment: createCommentMutation.mutate,
    isCreatingComment: createCommentMutation.isPending,
    likeComment: likeCommentMutation.mutate,
    unlikeComment: unlikeCommentMutation.mutate,
  };
}

export function useReplies(commentId: string) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['replies', commentId],
    queryFn: async () => {
      const response = await api.getCommentReplies(commentId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!commentId,
  });

  // Like reply
  const likeReplyMutation = useMutation({
    mutationFn: async (replyId: string) => {
      const response = await api.likeComment(replyId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to like reply: ${error.message}`);
    },
  });

  // Unlike reply
  const unlikeReplyMutation = useMutation({
    mutationFn: async (replyId: string) => {
      const response = await api.unlikeComment(replyId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replies', commentId] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to unlike reply: ${error.message}`);
    },
  });

  return {
    replies: data || [],
    isLoading,
    likeReply: likeReplyMutation.mutate,
    unlikeReply: unlikeReplyMutation.mutate,
  };
}
