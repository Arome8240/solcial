import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Heart, MessageCircle, Repeat2, Search, Bell, Settings } from 'lucide-react-native';

const posts = [
  {
    id: '1',
    author: 'Solana Princess',
    handle: '@solanadev',
    time: '1h',
    content: 'Just deployed my first solana program!\nThe speed is incredible ⚡',
    likes: 2,
    comments: 2,
    reposts: 2,
    avatar: null,
  },
  {
    id: '2',
    author: 'NFT Creator',
    handle: '@nftcreator223',
    time: '2h',
    content: 'New NFT collection dropping tomorrow\n🔥 Exclusively on Solana Mobile',
    image: null,
    likes: 2,
    comments: 2,
    reposts: 2,
    avatar: null,
    verified: true,
  },
];

export default function FeedScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Balance Card */}
        <View className="mx-4 mt-4 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-800 p-6">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-sm text-purple-200">Total Balance</Text>
              <Text className="text-4xl font-bold text-white">$6291.00</Text>
              <Text className="text-sm text-green-300">+4.78%</Text>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Icon as={Bell} size={20} className="text-white" />
              </TouchableOpacity>
              <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Icon as={Settings} size={20} className="text-white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-6 flex-row items-end justify-between">
            <View>
              <Text className="text-sm text-purple-200">SOL</Text>
              <Text className="text-2xl font-bold text-white">24.56</Text>
            </View>
            <View>
              <Text className="text-sm text-purple-200">Network</Text>
              <Text className="text-lg font-semibold text-white">Solana</Text>
            </View>
          </View>
        </View>

        {/* Mini Apps Section */}
        <View className="mx-4 mt-4 rounded-2xl bg-gradient-to-r from-purple-100 to-orange-100 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-2xl">✨</Text>
              <View>
                <Text className="font-semibold">Explore Mini Apps</Text>
                <Text className="text-xs text-muted-foreground">Swap, mint, games & more</Text>
              </View>
            </View>
            <Text className="text-3xl">🪙</Text>
          </View>
        </View>

        {/* Feed Header */}
        <View className="mt-6 flex-row items-center justify-between px-4">
          <Text className="text-xl font-bold">Feed</Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Icon as={Search} size={20} className="text-purple-600" />
            <Text className="font-semibold text-purple-600">Explore</Text>
          </TouchableOpacity>
        </View>

        {/* Posts */}
        <View className="mt-4">
          {posts.map((post) => (
            <View key={post.id} className="border-b border-border bg-card p-4">
              <View className="flex-row gap-3">
                <View className="h-10 w-10 rounded-full bg-purple-200" />
                <View className="flex-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-semibold">{post.author}</Text>
                    {post.verified && <Text className="text-purple-600">📌</Text>}
                    <Text className="text-sm text-muted-foreground">{post.handle}</Text>
                    <Text className="text-sm text-muted-foreground">· {post.time}</Text>
                  </View>
                  <Text className="mt-2">{post.content}</Text>
                  {post.image && (
                    <View className="mt-3 h-48 rounded-xl bg-gray-200" />
                  )}
                  <View className="mt-3 flex-row gap-6">
                    <View className="flex-row items-center gap-1">
                      <Icon as={Heart} size={18} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">{post.likes}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Icon as={MessageCircle} size={18} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">{post.comments}</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Icon as={Repeat2} size={18} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">{post.reposts}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Post Button */}
      <TouchableOpacity className="absolute bottom-10 right-4 h-14 w-14 items-center justify-center rounded-full bg-purple-600 shadow-lg">
        <Text className="text-2xl text-white">+</Text>
      </TouchableOpacity>
    </View>
  );
}
