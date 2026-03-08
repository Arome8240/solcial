import { View, ScrollView, TouchableOpacity, TextInput, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { useChats } from '@/hooks/useChats';
import { formatDistanceToNow } from 'date-fns';
import type { Chat } from '@/types';

export default function ChatsScreen() {
  const { chats, isLoading, refetch } = useChats();

  const formatTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: false }).replace('about ', '');
    } catch {
      return '';
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
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
          {isLoading && chats.length === 0 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#9333ea" />
            </View>
          ) : chats.length === 0 ? (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">No conversations yet</Text>
              <Text className="mt-2 text-sm text-muted-foreground">Start chatting with someone!</Text>
            </View>
          ) : (
            chats.map((chat: Chat) => (
              <TouchableOpacity
                key={chat.id}
                onPress={() => router.push(`/chats/${chat.id}`)}
                className="flex-row items-center gap-3 border-b border-border py-4"
              >
                <View className="relative">
                  {chat.otherParticipant?.avatar ? (
                    <Image 
                      source={{ uri: chat.otherParticipant.avatar }} 
                      className="h-14 w-14 rounded-full"
                    />
                  ) : (
                    <View className="h-14 w-14 items-center justify-center rounded-full bg-purple-200 dark:bg-purple-900">
                      <Text className="text-xl font-bold text-purple-600 dark:text-purple-300">
                        {chat.otherParticipant?.name?.charAt(0)?.toUpperCase() || chat.otherParticipant?.username?.charAt(0)?.toUpperCase() || '?'}
                      </Text>
                    </View>
                  )}
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-semibold">
                      {chat.otherParticipant?.name || chat.otherParticipant?.username || 'Unknown'}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {chat.lastMessageAt ? formatTime(chat.lastMessageAt) : ''}
                    </Text>
                  </View>
                  <Text className="mt-1 text-sm text-muted-foreground" numberOfLines={1}>
                    {chat.lastMessage || 'No messages yet'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
