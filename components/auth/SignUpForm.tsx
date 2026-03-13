import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SignUpFormProps {
  onSubmit: (data: { email: string; password: string; username: string }) => void;
  isSubmitting: boolean;
}

export function SignUpForm({ onSubmit, isSubmitting }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password, username });
  };

  return (
    <>
      <View className="gap-4">
        <Input
          label="Username"
          placeholder="johndoe"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Input
          label="Email"
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <Input
          label="Password"
          placeholder="At least 8 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View className="mt-auto px-5 pb-12">
        <Button
          onPress={handleSubmit}
          disabled={isSubmitting}
          className="h-14 rounded-2xl bg-purple-600 active:bg-purple-700"
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-base font-medium text-white">Create Account</Text>
          )}
        </Button>
      </View>
    </>
  );
}
