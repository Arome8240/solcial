import { View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';

const conversations = [
  {
    id: '1',
    name: 'Solana Dev',
    message: 'Thanks for the SOL!',
    time: '1h',
    unread: true,
    avatar: null,
  },
  {
    id: '2',
    name: 'NFT Finda',
    message: 'Love your NFT collection',
    time: '3h',
    unread: false,
    avatar: null,
  },
  {
    id: '3',
    name: 'Solana Builders',
    message: "Who's joining the Solana Hackathon",
    time: '12h',
    unread: true,
    avatar: null,
  },
  {
    id: '4',
    name: 'Crypto Beast',
    message: 'Thanks for the SOL!',
    time: '1d',
    unread: false,
    avatar: null,
  },
];

export default function ChatsScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 pt-12">
          <Text className="text-3xl font-bold">Messages</Text>
        </View>

        {/* Search */}
        <View className="mt-6 px-4">
          <View className="flex-row items-center gap-3 rounded-2xl bg-card px-4 py-3">
            <Icon as={Search} size={20} className="text-muted-foreground" />
            <TextInput
              placeholder="Search messages"
              placeholderTextColor="#9ca3af"
              className="flex-1 text-base text-foreground"
            />
          </View>
        </View>

        {/* Conversations */}
        <View className="mt-6 px-4 pb-6">
          {conversations.map((conversation) => (
            <TouchableOpacity
              key={conversation.id}
              onPress={() => router.push(`/chats/${conversation.id}`)}
              className="flex-row items-center gap-3 border-b border-border py-4"
            >
              <View className="relative">
                <View className="h-14 w-14 rounded-full bg-purple-200" />
                {conversation.unread && (
                  <View className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-background bg-purple-600" />
                )}
              </View>
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold">{conversation.name}</Text>
                  <Text className="text-sm text-muted-foreground">{conversation.time}</Text>
                </View>
                <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={1}>
                  {conversation.message}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
