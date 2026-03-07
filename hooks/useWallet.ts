import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';
import type { WalletBalance } from '@/types';

export function useWallet() {
  const queryClient = useQueryClient();

  // Get balance
  const { data: balance, isLoading: isLoadingBalance, refetch: refetchBalance } = useQuery<WalletBalance>({
    queryKey: ['wallet', 'balance'],
    queryFn: async () => {
      const response = await api.getBalance();
      if (response.error) throw new Error(response.error);
      return response.data as WalletBalance;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Get transactions
  const {
    data: transactionsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions,
  } = useInfiniteQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getTransactions(pageParam, 20);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      return Array.isArray(lastPage) && lastPage.length === 20 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Send SOL
  const sendSolMutation = useMutation({
    mutationFn: async ({ toAddress, amount, memo }: { toAddress: string; amount: number; memo?: string }) => {
      const response = await api.sendSol(toAddress, amount, memo);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      toast.success('Transaction sent!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const transactions = transactionsData?.pages.flat() || [];

  return {
    balance: balance?.balance ?? 0,
    walletAddress: balance?.walletAddress ?? '',
    isLoadingBalance,
    refetchBalance,
    transactions,
    isLoadingTransactions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetchTransactions,
    sendSol: sendSolMutation.mutate,
    isSending: sendSolMutation.isPending,
  };
}

export function useTransactionDetails(signature: string) {
  return useQuery({
    queryKey: ['wallet', 'transaction', signature],
    queryFn: async () => {
      const response = await api.getTransactionDetails(signature);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    enabled: !!signature,
  });
}
