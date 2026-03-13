import { View, TouchableOpacity, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useRef } from 'react';
import { api } from '@/lib/api';
import { storage } from '@/lib/storage';
import { toast } from 'sonner-native';
import { AuthHeader } from '@/components/auth';

export default function TwoFactorVerifyScreen() {
  const { email, tempToken } = useLocalSearchParams<{ email: string; tempToken: string }>();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (text && !/^\d+$/.test(text)) return;
    
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = useRecoveryCode ? recoveryCode : code.join('');
    
    if (verificationCode.length < 6) {
      toast.error('Please enter a valid code');
      return;
    }

    setIsVerifying(true);
    try {
      const response = await api.verify2FALogin({
        email,
        tempToken,
        code: verificationCode,
        isRecoveryCode: useRecoveryCode,
      });

      if (response.data?.token) {
        await storage.saveToken(response.data.token);
        await storage.saveUser(response.data.user);
        toast.success('Signed in successfully');
        router.replace('/(tabs)/feed');
      } else {
        toast.error('Invalid code');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
      console.error('2FA verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await api.resend2FACode({ email });
      toast.success('New code sent to your authenticator app');
    } catch (error) {
      toast.error('Failed to resend code');
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="px-5 pt-12">
        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Icon as={ArrowLeft} size={24} className="text-foreground" />
        </TouchableOpacity>

        <View className="items-center mb-8">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
            <Icon as={Shield} size={32} className="text-purple-600 dark:text-purple-300" />
          </View>
          <AuthHeader
            title="Two-Factor Authentication"
            subtitle={useRecoveryCode 
              ? "Enter your recovery code" 
              : "Enter the 6-digit code from your authenticator app"
            }
          />
        </View>

        {!useRecoveryCode ? (
          <>
            <View className="mb-8 flex-row justify-center gap-2">
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className={`h-14 w-12 rounded-xl bg-card text-center text-lg font-semibold text-foreground border-2 ${
                    focusedIndex === index ? 'border-purple-600' : 'border-transparent'
                  }`}
                  placeholder="0"
                  placeholderTextColor="#d1d5db"
                  autoFocus={index === 0}
                />
              ))}
            </View>
          </>
        ) : (
          <View className="mb-8">
            <Text className="mb-2 text-sm font-medium">Recovery Code</Text>
            <TextInput
              value={recoveryCode}
              onChangeText={setRecoveryCode}
              placeholder="XXXX-XXXX"
              placeholderTextColor="#9ca3af"
              className="rounded-xl bg-card px-4 py-4 text-center text-lg font-mono text-foreground"
              autoCapitalize="characters"
              maxLength={9}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={handleVerify}
          disabled={isVerifying}
          className={`mb-4 h-14 items-center justify-center rounded-2xl ${
            isVerifying ? 'bg-gray-300' : 'bg-purple-600'
          }`}
        >
          {isVerifying ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-base font-medium text-white">Verify</Text>
          )}
        </TouchableOpacity>

        <Pressable onPress={() => setUseRecoveryCode(!useRecoveryCode)}>
          <Text className="text-center text-sm font-medium text-purple-600">
            {useRecoveryCode ? 'Use authenticator code' : 'Use recovery code instead'}
          </Text>
        </Pressable>

        {!useRecoveryCode && (
          <Pressable onPress={handleResendCode} className="mt-4">
            <Text className="text-center text-sm text-muted-foreground">
              Lost access to your authenticator?
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
