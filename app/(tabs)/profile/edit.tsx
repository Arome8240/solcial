import { View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { toast } from 'sonner-native';

export default function EditProfileScreen() {
  const [name, setName] = useState('Crypto Beast');
  const [username, setUsername] = useState('crypto_beast');
  const [bio, setBio] = useState('Building the future of web 3 🚀');
  const [email, setEmail] = useState('crypto@example.com');

  const handleSave = () => {
    toast.success('Profile updated successfully');
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center gap-3 px-4 pt-12">
          <TouchableOpacity onPress={() => router.back()}>
            <Icon as={ArrowLeft} size={24} className="text-foreground" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Edit Profile</Text>
        </View>

        {/* Avatar */}
        <View className="mt-8 items-center">
          <View className="relative">
            <View className="h-32 w-32 rounded-full bg-purple-200" />
            <TouchableOpacity className="absolute bottom-0 right-0 h-10 w-10 items-center justify-center rounded-full bg-purple-600">
              <Icon as={Camera} size={20} className="text-white" />
            </TouchableOpacity>
          </View>
          <Text className="mt-3 text-sm text-purple-600">Change Photo</Text>
        </View>

        {/* Form */}
        <View className="mt-8 gap-4 px-4">
          {/* Name */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-muted-foreground">Name</Text>
            <View className="rounded-2xl bg-card p-4">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor="#9ca3af"
                className="text-base text-foreground"
              />
            </View>
          </View>

          {/* Username */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-muted-foreground">Username</Text>
            <View className="rounded-2xl bg-card p-4">
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#9ca3af"
                autoCapitalize="none"
                className="text-base text-foreground"
              />
            </View>
          </View>

          {/* Bio */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-muted-foreground">Bio</Text>
            <View className="rounded-2xl bg-card p-4">
              <TextInput
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                className="text-base text-foreground"
              />
            </View>
          </View>

          {/* Email */}
          <View>
            <Text className="mb-2 text-sm font-semibold text-muted-foreground">Email</Text>
            <View className="rounded-2xl bg-card p-4">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-base text-foreground"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="p-4">
        <TouchableOpacity
          onPress={handleSave}
          className="items-center rounded-2xl bg-purple-600 py-4"
        >
          <Text className="text-lg font-semibold text-white">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
