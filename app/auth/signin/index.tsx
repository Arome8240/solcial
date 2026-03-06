import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, Pressable, Image } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  const handleSignIn = () => {
    // Handle sign in
    router.push('/feed')
  };

  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <View className="flex-1 px-5 pt-16">
        <Text className="mb-2 text-3xl font-bold text-gray-900">Welcome Back!</Text>
        <Text className="mb-12 text-base text-gray-900">Sign In into your account</Text>

        <View className="gap-6">
          <Input label="Username" placeholder="Jeremy Django" value={username} onChangeText={setUsername} />

          <View>
            <Input
              label="Password"
              placeholder="**********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {showError && (
              <View className="absolute right-4 top-11 flex-row items-center">
                <AlertCircle size={20} color="#ef4444" />
              </View>
            )}
            <Pressable className="mt-3">
              <Text className="text-sm font-medium text-purple-600">Forgot Password?</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="px-5 pb-12">
        <Button
          onPress={handleSignIn}
          className="mb-6 h-14 rounded-2xl bg-purple-600 active:bg-purple-700"
        >
          <Text className="text-base font-medium text-white">Sign In</Text>
        </Button>

        <Text className="mb-4 text-center text-sm text-gray-500">Or Sign in with</Text>

        <View className="mb-6 gap-3">
          <Button variant="outline" className="h-14 flex-row gap-3 rounded-2xl bg-white">
            <Text className="text-base font-medium text-gray-900">Google</Text>
          </Button>

          <Button variant="outline" className="h-14 flex-row gap-3 rounded-2xl bg-white">
            <Text className="text-base font-medium text-gray-900">Apple</Text>
          </Button>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-sm text-gray-900">Don't have an account? </Text>
          <Pressable onPress={handleSignUp}>
            <Text className="text-sm font-medium text-purple-600">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
