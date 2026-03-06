import { View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Send, Paperclip } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const messages = [
  {
    id: '1',
    text: 'My Gee! You fit send like 10 SOL. I want catch one market.',
    time: '11:54',
    isMine: true,
  },
  {
    id: '2',
    text: 'No yawa now 👍',
    time: '11:57',
    isMine: false,
  },
  {
    id: '3',
    type: 'payment',
    amount: '10 SOL',
    time: '11:59',
    isMine: false,
  },
  {
    id: '4',
    text: 'Thanks Man',
    time: '12:54',
    isMine: true,
  },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="flex-row items-center gap-3 border-b border-border px-4 pb-4 pt-12">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon as={ArrowLeft} size={24} className="text-foreground" />
        </TouchableOpacity>
        <View className="h-10 w-10 rounded-full bg-purple-200" />
        <View className="flex-1">
          <Text className="font-semibold">NFT Finda</Text>
          <Text className="text-sm text-green-600">Active</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-4 py-4">
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`mb-4 ${msg.isMine ? 'items-end' : 'items-start'}`}
          >
            {msg.type === 'payment' ? (
              <View className="flex-row items-center gap-2">
                {!msg.isMine && <View className="h-10 w-10 rounded-full bg-purple-200" />}
                <View className="rounded-2xl bg-card p-4">
                  <View className="flex-row items-center gap-2">
                    <Icon as={Send} size={16} className="text-muted-foreground" />
                    <Text className="font-semibold">Sent {msg.amount}</Text>
                  </View>
                  <Text className="mt-1 text-xs text-muted-foreground">{msg.time}</Text>
                </View>
              </View>
            ) : (
              <View className="flex-row items-end gap-2">
                {!msg.isMine && <View className="h-10 w-10 rounded-full bg-purple-200" />}
                <View
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.isMine ? 'bg-purple-600' : 'bg-card'
                  }`}
                >
                  <Text className={msg.isMine ? 'text-white' : 'text-foreground'}>
                    {msg.text}
                  </Text>
                  <Text
                    className={`mt-1 text-xs ${
                      msg.isMine ? 'text-purple-200' : 'text-muted-foreground'
                    }`}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="flex-row items-center gap-3 border-t border-border p-4">
        <View className="flex-1 flex-row items-center gap-3 rounded-2xl bg-card px-4 py-3">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#9ca3af"
            className="flex-1 text-base text-foreground"
          />
          <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
            <Icon as={Paperclip} size={20} className="text-muted-foreground" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="h-14 w-14 items-center justify-center rounded-2xl bg-purple-600">
          <Icon as={Send} size={20} className="text-white" />
        </TouchableOpacity>
      </View>

      {/* Send Payment Modal */}
      {showPaymentModal && (
        <View className="absolute inset-0 items-center justify-center bg-black/50">
          <View className="mx-4 w-full max-w-md rounded-3xl bg-background p-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold">Send Payment</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Icon as={ArrowLeft} size={24} className="text-foreground" />
              </TouchableOpacity>
            </View>

            {/* Amount */}
            <View className="mt-6">
              <Text className="mb-2 text-sm text-muted-foreground">Amount</Text>
              <View className="rounded-2xl bg-card p-4">
                <TextInput
                  placeholder="10"
                  keyboardType="numeric"
                  className="text-2xl font-semibold text-foreground"
                />
              </View>
            </View>

            {/* Token */}
            <View className="mt-4">
              <Text className="mb-2 text-sm text-muted-foreground">Token</Text>
              <TouchableOpacity className="flex-row items-center justify-between rounded-2xl bg-card p-4">
                <Text className="font-semibold">Solana - SOL</Text>
                <Icon as={ArrowLeft} size={20} className="rotate-90 text-muted-foreground" />
              </TouchableOpacity>
            </View>

            {/* Sending to */}
            <View className="mt-4 rounded-2xl bg-card p-4">
              <Text className="text-sm text-muted-foreground">Sending to</Text>
              <Text className="mt-1 text-xl font-bold">NFT Finda</Text>
              <Text className="text-sm text-muted-foreground">@solanadev</Text>
            </View>

            {/* Buttons */}
            <View className="mt-6 flex-row gap-3">
              <TouchableOpacity
                onPress={() => setShowPaymentModal(false)}
                className="flex-1 items-center rounded-2xl border-2 border-purple-600 py-4"
              >
                <Text className="text-lg font-semibold text-purple-600">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowPaymentModal(false);
                  router.push('/payment-success');
                }}
                className="flex-1 items-center rounded-2xl bg-purple-600 py-4"
              >
                <Text className="text-lg font-semibold text-white">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
