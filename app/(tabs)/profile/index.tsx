import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Settings, MoreVertical, Copy, Share, Edit, CloudOff } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { toast } from 'sonner-native';

const tabs = ['Posts', 'Replies', 'Likes', 'Collections'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const [showMenu, setShowMenu] = useState(false);
  const walletAddress = '9xQeW...kJ7P';
  const fullWalletAddress = '9xQeWkJ7P8sN3mK4vL2hR6tY1uZ5wX7cB9dF0gH3jM';

  const copyAddress = async () => {
    await Clipboard.setStringAsync(fullWalletAddress);
    toast.success('Address copied to clipboard');
  };

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
            <View className="h-24 w-24 rounded-full bg-purple-200" />
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <Icon as={MoreVertical} size={24} className="text-foreground" />
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            <Text className="text-2xl font-bold">Crypto Beast</Text>
            <Text className="text-muted-foreground">@crypto_beast</Text>
            <Text className="mt-2">Building the future of web 3 🚀</Text>
          </View>

          <View className="mt-4 flex-row gap-6">
            <View>
              <Text className="text-xl font-bold">2</Text>
              <Text className="text-sm text-muted-foreground">Following</Text>
            </View>
            <View>
              <Text className="text-xl font-bold">2</Text>
              <Text className="text-sm text-muted-foreground">Followers</Text>
            </View>
            <View>
              <Text className="text-xl font-bold">0</Text>
              <Text className="text-sm text-muted-foreground">Posts</Text>
            </View>
          </View>

          {/* Wallet Address */}
          <View className="mt-4 rounded-2xl bg-gray-50 p-4">
            <Text className="text-sm text-muted-foreground">Wallet Address</Text>
            <View className="mt-1 flex-row items-center justify-between">
              <Text className="text-lg font-bold">{walletAddress}</Text>
              <TouchableOpacity onPress={copyAddress}>
                <Icon as={Copy} size={20} className="text-purple-600" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="mt-6 bg-background">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
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

          {/* Empty State */}
          <View className="items-center py-20">
            <Icon as={CloudOff} size={64} className="text-muted-foreground" />
            <Text className="mt-4 text-muted-foreground">No post yet</Text>
          </View>
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
