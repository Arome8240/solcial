import { View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Coins, ArrowDownUp, Info } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { toast } from 'sonner-native';
import { api } from '@/lib/api';

const tokens = [
  { symbol: 'SOL', name: 'Solana', rate: 1, icon: '◎' },
  { symbol: 'USDC', name: 'USD Coin', rate: 100, icon: '$' },
  { symbol: 'BONK', name: 'Bonk', rate: 1000000, icon: '🐕' },
  { symbol: 'WIF', name: 'Dogwifhat', rate: 50, icon: '🐶' },
];

export default function SwapScreen() {
  const { balance } = useWallet();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  const toAmount = fromAmount ? (parseFloat(fromAmount) * fromToken.rate / toToken.rate).toFixed(6) : '0';

  const handleSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    if (fromToken.symbol === 'SOL' && parseFloat(fromAmount) > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsSwapping(true);
    
    try {
      const response = await api.swapTokens(
        fromToken.symbol,
        toToken.symbol,
        parseFloat(fromAmount)
      );

      if (response.error) {
        toast.error(response.error);
        setIsSwapping(false);
        return;
      }

      const { toAmount: receivedAmount } = response.data as any;
      toast.success(`Swapped ${fromAmount} ${fromToken.symbol} for ${receivedAmount.toFixed(6)} ${toToken.symbol}`);
      setFromAmount('');
      setIsSwapping(false);
    } catch (error) {
      toast.error('Swap failed. Please try again.');
      setIsSwapping(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount('');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-4 pb-8 pt-12">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Icon as={ArrowLeft} size={24} className="text-white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Token Swap</Text>
          </View>

          <View className="mt-6 items-center">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <Icon as={Coins} size={40} className="text-white" />
            </View>
            <Text className="mt-3 text-center text-sm text-white/90">
              Swap tokens instantly on Solana
            </Text>
          </View>
        </View>

        {/* Swap Card */}
        <View className="mx-4 mt-6">
          {/* From Token */}
          <View className="rounded-2xl bg-card p-4">
            <Text className="text-sm text-muted-foreground">From</Text>
            <View className="mt-2 flex-row items-center justify-between">
              <TextInput
                value={fromAmount}
                onChangeText={setFromAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
                className="flex-1 text-3xl font-bold text-foreground"
                placeholderTextColor="#9ca3af"
              />
              <View className="ml-3 flex-row items-center gap-2 rounded-xl bg-purple-100 dark:bg-purple-900 px-4 py-2">
                <Text className="text-2xl">{fromToken.icon}</Text>
                <Text className="font-semibold">{fromToken.symbol}</Text>
              </View>
            </View>
            {fromToken.symbol === 'SOL' && (
              <Text className="mt-2 text-sm text-muted-foreground">
                Balance: {balance.toFixed(4)} SOL
              </Text>
            )}
          </View>

          {/* Switch Button */}
          <View className="my-4 items-center">
            <TouchableOpacity
              onPress={switchTokens}
              className="h-12 w-12 items-center justify-center rounded-full bg-purple-600"
            >
              <Icon as={ArrowDownUp} size={24} className="text-white" />
            </TouchableOpacity>
          </View>

          {/* To Token */}
          <View className="rounded-2xl bg-card p-4">
            <Text className="text-sm text-muted-foreground">To</Text>
            <View className="mt-2 flex-row items-center justify-between">
              <Text className="flex-1 text-3xl font-bold">{toAmount}</Text>
              <View className="ml-3 flex-row items-center gap-2 rounded-xl bg-blue-100 dark:bg-blue-900 px-4 py-2">
                <Text className="text-2xl">{toToken.icon}</Text>
                <Text className="font-semibold">{toToken.symbol}</Text>
              </View>
            </View>
          </View>

          {/* Exchange Rate */}
          <View className="mt-4 rounded-xl bg-purple-50 dark:bg-purple-950 p-4">
            <View className="flex-row items-center gap-2">
              <Icon as={Info} size={16} className="text-purple-600" />
              <Text className="text-sm text-purple-700 dark:text-purple-300">
                1 {fromToken.symbol} = {(fromToken.rate / toToken.rate).toFixed(6)} {toToken.symbol}
              </Text>
            </View>
          </View>

          {/* Swap Button */}
          <TouchableOpacity
            onPress={handleSwap}
            disabled={isSwapping || !fromAmount}
            className={`mt-6 items-center rounded-xl py-4 ${
              isSwapping || !fromAmount ? 'bg-gray-300' : 'bg-purple-600'
            }`}
          >
            {isSwapping ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="font-semibold text-white">
                {fromAmount ? 'Swap Tokens' : 'Enter Amount'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Token List */}
        <View className="mx-4 mt-6">
          <Text className="text-lg font-bold">Available Tokens</Text>
          <View className="mt-3 gap-2">
            {tokens.map((token) => (
              <View key={token.symbol} className="flex-row items-center justify-between rounded-xl bg-card p-4">
                <View className="flex-row items-center gap-3">
                  <Text className="text-3xl">{token.icon}</Text>
                  <View>
                    <Text className="font-semibold">{token.symbol}</Text>
                    <Text className="text-sm text-muted-foreground">{token.name}</Text>
                  </View>
                </View>
                <Text className="text-sm text-muted-foreground">Rate: {token.rate}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}
