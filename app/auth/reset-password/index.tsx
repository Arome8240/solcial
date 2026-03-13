import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, CheckCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';
import { AuthLayout, AuthHeader } from '@/components/auth';

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsResetting(true);
    try {
      await api.resetPassword({ token, password });
      setResetSuccess(true);
      toast.success('Password reset successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
      console.error('Password reset error:', error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <AuthLayout>
      <View className="flex-1 px-5 pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Icon as={ArrowLeft} size={24} className="text-foreground" />
        </TouchableOpacity>

        {!resetSuccess ? (
          <>
            <AuthHeader
              title="Reset Password"
              subtitle="Enter your new password below"
            />

            <View className="gap-6">
              <Input
                label="New Password"
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Input
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <View className="mt-auto pb-12">
              <Button
                onPress={handleResetPassword}
                disabled={isResetting}
                className="h-14 rounded-2xl bg-purple-600 active:bg-purple-700"
              >
                {isResetting ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-base font-medium text-white">Reset Password</Text>
                )}
              </Button>
            </View>
          </>
        ) : (
          <>
            <View className="items-center mb-8">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <Icon as={CheckCircle} size={40} className="text-green-600 dark:text-green-300" />
              </View>
              <Text className="text-2xl font-bold text-center mb-2">Password Reset!</Text>
              <Text className="text-center text-muted-foreground">
                Your password has been successfully reset. You can now sign in with your new password.
              </Text>
            </View>

            <View className="mt-auto pb-12">
              <Button
                onPress={() => router.push('/auth/signin')}
                className="h-14 rounded-2xl bg-purple-600 active:bg-purple-700"
              >
                <Text className="text-base font-medium text-white">Sign In</Text>
              </Button>
            </View>
          </>
        )}
      </View>
    </AuthLayout>
  );
}
