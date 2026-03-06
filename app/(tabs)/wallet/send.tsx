import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, ChevronDown, Send } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function SendMoneyScreen() {
  const [amount, setAmount] = useState('10');
  const [recipient] = useState({
    name: 'Solana Princess',
    handle: '@solanadev',
  });

  const quickAmounts = ['0.5', '1', '5'];

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center gap-3 px-4 pt-12">
          <TouchableOpacity onPress={() => router.back()}>
            <Icon as={ArrowLeft} size={24} className="text-foreground" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Send Money</Text>
        </View>

        {/* Recipient */}
        <View className="mt-8 px-4">
          <Text className="mb-2 text-sm text-muted-foreground">Recipient</Text>
          <TouchableOpacity className="flex-row items-center justify-between rounded-2xl bg-card p-4">
            <View className="flex-row items-center gap-3">
              <View className="h-10 w-10 rounded-full bg-purple-200" />
              <View>
                <Text className="font-semibold">{recipient.name}</Text>
                <Text className="text-sm text-muted-foreground">{recipient.handle}</Text>
              </View>
            </View>
            <Icon as={ChevronDown} size={20} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {/* Token */}
        <View className="mt-6 px-4">
          <Text className="mb-2 text-sm text-muted-foreground">Token</Text>
          <TouchableOpacity className="flex-row items-center justify-between rounded-2xl bg-card p-4">
            <Text className="font-semibold">Solana (SOL) - 24.58</Text>
            <Icon as={ChevronDown} size={20} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View className="mt-6 px-4">
          <Text className="mb-2 text-sm text-muted-foreground">Amount</Text>
          <View className="rounded-2xl bg-card p-4">
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              className="text-2xl font-semibold text-foreground"
              placeholder="0"
            />
            <Text className="mt-2 text-sm text-muted-foreground">≈ $2,000.00</Text>
          </View>

          {/* Quick Amount Buttons */}
          <View className="mt-4 flex-row gap-3">
            {quickAmounts.map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                onPress={() => setAmount(quickAmount)}
                className="flex-1 items-center rounded-xl bg-card py-3"
              >
                <Text className="font-semibold">{quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Send Button */}
      <View className="p-4">
        <TouchableOpacity 
          onPress={() => router.push('/payment-success')}
          className="flex-row items-center justify-center gap-2 rounded-2xl bg-purple-600 py-4"
        >
          <Icon as={Send} size={20} className="text-white" />
          <Text className="text-lg font-semibold text-white">Send {amount} SOL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
