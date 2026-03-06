import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import * as React from 'react';
import { View, TextInput, Pressable } from 'react-native';

export default function VerifyScreen() {
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const inputRefs = React.useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
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

  const handleVerify = () => {
    router.push('/auth/signup');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50 px-5 pt-16">
      <Text className="mb-3 text-3xl font-bold text-gray-900">Verify Your Account</Text>
      <Text className="mb-12 text-base leading-relaxed text-gray-500">
        A six-digit code was sent to your email, enter it below to confirm your account.
      </Text>

      <View className="mb-auto flex-row justify-between gap-2">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            className="h-16 w-14 rounded-xl bg-white text-center text-xl font-semibold text-gray-900"
            placeholder="--"
            placeholderTextColor="#d1d5db"
          />
        ))}
      </View>

      <View className="pb-12">
        <Button
          onPress={handleVerify}
          className="mb-4 h-14 rounded-2xl bg-purple-600 active:bg-purple-700"
        >
          <Text className="text-base font-medium text-white">Verify</Text>
        </Button>

        <Pressable onPress={handleBack}>
          <Text className="text-center text-base font-medium text-purple-600">Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
