import { View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Modal, TextInput, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Heart, MessageCircle, Repeat2, Search, Bell, Settings, X, Eye, EyeOff, Copy, ArrowUpRight, ArrowDownLeft, RefreshCw, Sparkles, Gamepad2, ArrowRight, Circle } from 'lucide-react-native';
import { usePosts } from '@/hooks/usePosts';
import { useWallet } from '@/hooks/useWallet';
import { router } from 'expo-router';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Post } from '@/types';
import * as Clipboard from 'expo-clipboard';
import { toast } from 'sonner-native';

export default function FeedScreen() {
  const { posts, isLoadingFeed, fetchNextPage, hasNextPage, isFetchingNextPage, refetchFeed, createPost, isCreatingPost, likePost, unlikePost } = usePosts();
  const { balance, walletAddress, isLoadingBalance, refetchBalance } = useWallet();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [showBalance, setShowBalance] = useState(true);

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    createPost({ content: postContent });
    setPostContent('');
    setShowCreatePost(false);
  };

  const handleLike = (postId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikePost(postId);
    } else {
      likePost(postId);
    }
  };

  const formatTime = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: false }).replace('about ', '');
    } catch {
      return '';
    }
  };

  const copyAddress = async () => {
    if (walletAddress) {
      await Clipboard.setStringAsync(walletAddress);
      toast.success('Address copied!');
    }
  };

  const handleRefreshBalance = async () => {
    await refetchBalance();
    toast.success('Balance refreshed!');
  };
  return (
    <View className="flex-1 bg-background">
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoadingFeed} onRefresh={refetchFeed} />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
          if (isCloseToBottom && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        scrollEventThrottle={400}
      >
        {/* Balance Card */}
        <View className="mx-4 mt-4 overflow-hidden rounded-3xl bg-purple-600 shadow-lg">
          {/* Gradient Background */}
          <View className="p-6">
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-purple-200">Total Balance</Text>
                  <TouchableOpacity 
                    onPress={() => setShowBalance(!showBalance)}
                    className="rounded-full p-1"
                  >
                    <Icon as={showBalance ? Eye : EyeOff} size={16} className="text-purple-200" />
                  </TouchableOpacity>
                </View>
                
                {isLoadingBalance ? (
                  <ActivityIndicator size="large" color="#ffffff" className="mt-2" />
                ) : (
                  <Text className="mt-1 text-4xl font-bold text-white">
                    {showBalance ? `${balance.toFixed(4)} SOL` : '••••••'}
                  </Text>
                )}
                
                <Pressable onPress={copyAddress} className="mt-2 flex-row items-center gap-2 rounded-lg p-1">
                  <Text className="text-sm text-purple-200">
                    {walletAddress?.slice(0, 8)}...{walletAddress?.slice(-6)}
                  </Text>
                  <Icon as={Copy} size={14} className="text-purple-200" />
                </Pressable>
              </View>
              
              <View className="flex-row gap-2">
                <TouchableOpacity 
                  onPress={handleRefreshBalance}
                  disabled={isLoadingBalance}
                  className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
                >
                  <Icon as={RefreshCw} size={18} className="text-white" />
                </TouchableOpacity>
                <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Icon as={Bell} size={18} className="text-white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => router.push('/profile/settings')}
                  className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
                >
                  <Icon as={Settings} size={18} className="text-white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="mt-6 flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.push('/wallet/send')}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-white py-3.5 shadow-sm"
              >
                <Icon as={ArrowUpRight} size={18} className="text-purple-600" />
                <Text className="font-semibold text-purple-600">Send</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push('/wallet/receive')}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-purple-700 py-3.5 shadow-sm"
              >
                <Icon as={ArrowDownLeft} size={18} className="text-white" />
                <Text className="font-semibold text-white">Receive</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push('/wallet')}
                className="flex-1 items-center justify-center rounded-xl bg-purple-700 py-3.5 shadow-sm"
              >
                <Text className="font-semibold text-white">Wallet</Text>
              </TouchableOpacity>
            </View>

            {/* Network Badge */}
            <View className="mt-4 flex-row items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1.5">
              <Icon as={Circle} size={8} className="text-green-400" fill="#4ade80" />
              <Text className="text-xs font-medium text-white">Solana Devnet</Text>
            </View>
          </View>
        </View>

        {/* Mini Apps Section */}
        <TouchableOpacity 
          onPress={() => router.push('/mini-apps')}
          className="mx-4 mt-4 overflow-hidden rounded-2xl bg-primary"
        >
          <View className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <View className="flex-row items-center gap-2">
                  <Icon as={Sparkles} size={24} className="text-white" />
                  <Text className="text-xl font-bold text-white">Mini Apps</Text>
                </View>
                <Text className="mt-2 text-sm text-white/90">
                  Swap, mint NFTs, play games & more
                </Text>
                <View className="mt-3 flex-row items-center gap-2">
                  <View className="rounded-full bg-white/20 px-3 py-1">
                    <Text className="text-xs font-medium text-white">Coming Soon</Text>
                  </View>
                  <Icon as={ArrowRight} size={14} className="text-white/80" />
                </View>
              </View>
              
              <View className="h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                <Icon as={Gamepad2} size={32} className="text-white" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

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
          {isLoadingFeed && posts.length === 0 ? (
            <View className="items-center py-20">
              <ActivityIndicator size="large" color="#9333ea" />
            </View>
          ) : posts.length === 0 ? (
            <View className="items-center py-20">
              <Text className="text-muted-foreground">No posts yet</Text>
              <Text className="mt-2 text-sm text-muted-foreground">Be the first to post!</Text>
            </View>
          ) : (
            posts.map((post: Post) => (
              <View key={post.id} className="border-b border-border bg-card p-4">
                <View className="flex-row gap-3">
                  <View className="h-10 w-10 rounded-full bg-purple-200" />
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="font-semibold">{post.author.name || post.author.username}</Text>
                      <Text className="text-sm text-muted-foreground">@{post.author.username}</Text>
                      <Text className="text-sm text-muted-foreground">· {formatTime(post.createdAt)}</Text>
                    </View>
                    <Text className="mt-2">{post.content}</Text>
                    {post.images && post.images.length > 0 && (
                      <View className="mt-3 h-48 rounded-xl bg-gray-200" />
                    )}
                    <View className="mt-3 flex-row gap-6">
                      <TouchableOpacity 
                        onPress={() => handleLike(post.id, post.isLiked)}
                        className="flex-row items-center gap-1"
                      >
                        <Icon 
                          as={Heart} 
                          size={18} 
                          className={post.isLiked ? "text-red-600" : "text-muted-foreground"}
                          fill={post.isLiked ? "#dc2626" : "none"}
                        />
                        <Text className="text-sm text-muted-foreground">{post.likesCount}</Text>
                      </TouchableOpacity>
                      <View className="flex-row items-center gap-1">
                        <Icon as={MessageCircle} size={18} className="text-muted-foreground" />
                        <Text className="text-sm text-muted-foreground">{post.commentsCount}</Text>
                      </View>
                      <View className="flex-row items-center gap-1">
                        <Icon as={Repeat2} size={18} className="text-muted-foreground" />
                        <Text className="text-sm text-muted-foreground">{post.sharesCount}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
          {isFetchingNextPage && (
            <View className="py-4">
              <ActivityIndicator size="small" color="#9333ea" />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Post Button */}
      <TouchableOpacity 
        onPress={() => setShowCreatePost(true)}
        className="absolute bottom-10 right-4 h-14 w-14 items-center justify-center rounded-full bg-purple-600 shadow-lg"
      >
        <Text className="text-2xl text-white">+</Text>
      </TouchableOpacity>

      {/* Create Post Modal */}
      <Modal
        visible={showCreatePost}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreatePost(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="mt-20 flex-1 rounded-t-3xl bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-border p-4">
              <TouchableOpacity onPress={() => setShowCreatePost(false)}>
                <Icon as={X} size={24} className="text-foreground" />
              </TouchableOpacity>
              <Text className="text-lg font-bold">Create Post</Text>
              <TouchableOpacity 
                onPress={handleCreatePost}
                disabled={!postContent.trim() || isCreatingPost}
                className={`rounded-full px-4 py-2 ${postContent.trim() ? 'bg-purple-600' : 'bg-gray-300'}`}
              >
                <Text className={`font-semibold ${postContent.trim() ? 'text-white' : 'text-gray-500'}`}>
                  {isCreatingPost ? 'Posting...' : 'Post'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className="flex-1 p-4">
              <TextInput
                value={postContent}
                onChangeText={setPostContent}
                placeholder="What's happening?"
                placeholderTextColor="#9ca3af"
                multiline
                autoFocus
                className="flex-1 text-base text-foreground"
                style={{ textAlignVertical: 'top' }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
