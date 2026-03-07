import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';
import type { Chat, Message } from '@/types';

export function useChats() {
  const queryClient = useQueryClient();

  // Get all chats
  const { data: chats, isLoading, refetch } = useQuery<Chat[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await api.getChats();
      if (response.error) throw new Error(response.error);
      return response.data as Chat[];
    },
    refetchInterval: 10000, // Refetch every 10 seconds for new messages
  });

  // Create chat
  const createChatMutation = useMutation({
    mutationFn: async (participantId: string) => {
      const response = await api.createChat(participantId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    chats: chats || [],
    isLoading,
    refetch,
    createChat: createChatMutation.mutate,
    isCreatingChat: createChatMutation.isPending,
  };
}

export function useMessages(chatId: string) {
  const queryClient = useQueryClient();

  // Get messages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<Message[]>({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getMessages(chatId, pageParam as number, 50);
      if (response.error) throw new Error(response.error);
      return response.data as Message[];
    },
    getNextPageParam: (lastPage, pages) => {
      return Array.isArray(lastPage) && lastPage.length === 50 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1 as number,
    enabled: !!chatId,
    refetchInterval: 5000, // Refetch every 5 seconds for new messages
  });

  // Send message
  const sendMessageMutation = useMutation({
    mutationFn: async ({ content, type }: { content: string; type?: string }) => {
      const response = await api.sendMessage(chatId, content, type);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Send tip
  const sendTipMutation = useMutation({
    mutationFn: async (amount: number) => {
      const response = await api.sendTip(chatId, amount);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      toast.success('Tip sent!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Mark as read
  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      const response = await api.markChatAsRead(chatId);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });

  const messages = data?.pages.flat() || [];

  return {
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    sendMessage: sendMessageMutation.mutate,
    isSendingMessage: sendMessageMutation.isPending,
    sendTip: sendTipMutation.mutate,
    isSendingTip: sendTipMutation.isPending,
    markAsRead: markAsReadMutation.mutate,
  };
}
