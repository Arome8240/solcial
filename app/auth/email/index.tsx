import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';

export default function EmailScreen() {
  const [email, setEmail] = React.useState('');

  const handleContinue = () => {
    router.push('/auth/verify');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <View className="flex-1 px-5 pt-16">
        <Text className="mb-3 text-3xl font-bold text-gray-900">Enter Your Email</Text>
        <Text className="mb-8 text-base leading-relaxed text-gray-500">
          This email will be used to recover your social account if you lose access.
        </Text>

        <Input
          placeholder="eqsplicitm@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
      </View>

      <View className="px-5 pb-12">
        <Button
          onPress={handleContinue}
          className="h-14 rounded-2xl bg-purple-600 active:bg-purple-700"
        >
          <Text className="text-base font-medium text-white">Create Account</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
