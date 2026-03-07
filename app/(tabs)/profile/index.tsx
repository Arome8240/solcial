import { View, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Settings, MoreVertical, Copy, Share, Edit, CloudOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { toast } from 'sonner-native';
import { useAuth } from '@/hooks/useAuth';
import { useUserPosts } from '@/hooks/usePosts';
import type { User, Post } from '@/types';

const tabs = ['Posts', 'Replies', 'Likes', 'Collections'];

export default function ProfileScreen() {
  const { user, isLoadingUser } = useAuth();
  const typedUser = user as User | undefined;
  const { posts, isLoading: isLoadingPosts } = useUserPosts(typedUser?.username || '');
  const [activeTab, setActiveTab] = useState('Posts');
  const [showMenu, setShowMenu] = useState(false);

  const copyAddress = async () => {
    if (typedUser?.walletAddress) {
      await Clipboard.setStringAsync(typedUser.walletAddress);
      toast.success('Address copied to clipboard');
    }
  };

  if (isLoadingUser) {
    return (
      <View className="flex-1 items-center justify-center bg-purple-600">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-purple-600">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-12">
          <Text className="text-2xl font-bold text-white">Profile</Text>
          <TouchableOpacity onPress={() => router.push('/profile/settings')}>
            <Icon as={Settings} size={24} className="text-white" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="mx-4 mt-6 rounded-3xl bg-white p-6">
          <View className="flex-row items-start justify-between">
            {typedUser?.avatar ? (
              <Image 
                source={{ uri: typedUser.avatar }} 
                className="h-24 w-24 rounded-full"
              />
            ) : (
              <View className="h-24 w-24 items-center justify-center rounded-full bg-purple-200">
                <Text className="text-3xl font-bold text-purple-600">
                  {typedUser?.name?.charAt(0)?.toUpperCase() || typedUser?.username?.charAt(0)?.toUpperCase() || '?'}
                </Text>
              </View>
            )}
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <Icon as={MoreVertical} size={24} className="text-foreground" />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <Text className="text-2xl font-bold">{typedUser?.name || typedUser?.username}</Text>
            <Text className="text-muted-foreground">@{typedUser?.username}</Text>
            <Text className="mt-2">{typedUser?.bio || 'No bio yet'}</Text>
          </View>

          <View className="mt-4 flex-row gap-6">
            <View>
              <Text className="text-xl font-bold">{typedUser?.followingCount || 0}</Text>
              <Text className="text-sm text-muted-foreground">Following</Text>
            </View>
            <View>
              <Text className="text-xl font-bold">{typedUser?.followersCount || 0}</Text>
              <Text className="text-sm text-muted-foreground">Followers</Text>
            </View>
            <View>
              <Text className="text-xl font-bold">{typedUser?.postsCount || 0}</Text>
              <Text className="text-sm text-muted-foreground">Posts</Text>
            </View>
          </View>

          {/* Wallet Address */}
          <View className="mt-4 rounded-2xl bg-gray-50 p-4">
            <Text className="text-sm text-muted-foreground">Wallet Address</Text>
            <View className="mt-1 flex-row items-center justify-between">
              <Text className="text-lg font-bold">
                {typedUser?.walletAddress?.slice(0, 8)}...{typedUser?.walletAddress?.slice(-4)}
              </Text>
              <TouchableOpacity onPress={copyAddress}>
                <Icon as={Copy} size={20} className="text-purple-600" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="mt-6 bg-background">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-2">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`mr-2 rounded-full px-6 py-3 ${
                  activeTab === tab ? 'bg-purple-600' : 'bg-card'
                }`}
              >
                <Text
                  className={`font-semibold ${
                    activeTab === tab ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Posts Content */}
          {activeTab === 'Posts' && (
            <View className="px-4 py-4">
              {isLoadingPosts ? (
                <View className="items-center py-20">
                  <ActivityIndicator size="large" color="#9333ea" />
                </View>
              ) : posts.length === 0 ? (
                <View className="items-center py-20">
                  <Icon as={CloudOff} size={64} className="text-muted-foreground" />
                  <Text className="mt-4 text-muted-foreground">No posts yet</Text>
                </View>
              ) : (
                posts.map((post: Post) => (
                  <View key={post.id} className="mb-4 rounded-2xl bg-card p-4">
                    <Text className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Text>
                    <Text className="mt-2">{post.content}</Text>
                    <View className="mt-3 flex-row gap-4">
                      <Text className="text-sm text-muted-foreground">{post.likesCount} likes</Text>
                      <Text className="text-sm text-muted-foreground">{post.commentsCount} comments</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Other tabs empty state */}
          {activeTab !== 'Posts' && (
            <View className="items-center py-20">
              <Icon as={CloudOff} size={64} className="text-muted-foreground" />
              <Text className="mt-4 text-muted-foreground">Nothing here yet</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Profile Menu Modal */}
      <Modal
        visible={showMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <View className="rounded-t-3xl bg-background pb-8">
            {/* Handle */}
            <View className="items-center py-4">
              <View className="h-1 w-12 rounded-full bg-gray-300" />
            </View>

            {/* Menu Items */}
            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                // Handle share
              }}
              className="flex-row items-center gap-4 border-b border-border px-6 py-5"
            >
              <Icon as={Share} size={24} className="text-foreground" />
              <Text className="text-lg font-semibold">Share Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowMenu(false);
                router.push('/profile/edit');
              }}
              className="flex-row items-center gap-4 px-6 py-5"
            >
              <Icon as={Edit} size={24} className="text-foreground" />
              <Text className="text-lg font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
