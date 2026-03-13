import { View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { storage } from '@/lib/storage';
import { toast } from 'sonner-native';
import { AuthHeader, VerificationInput } from '@/components/auth';

export default function VerifyScreen() {
  const { verifyEmail, isVerifying, resendCode, isResending } = useAuth();

  const handleVerify = async (code: string) => {
    if (code.length !== 6) {
      toast.error('Please enter the complete code');
      return;
    }

    const user = await storage.getUser();
    if (!user?.tempEmail) {
      toast.error('Email not found. Please sign up again');
      router.replace('/auth/email');
      return;
    }

    verifyEmail({ email: user.tempEmail, code });
  };

  const handleResend = async () => {
    const user = await storage.getUser();
    if (!user?.tempEmail) {
      toast.error('Email not found');
      return;
    }

    resendCode(user.tempEmail);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-background px-5 pt-16">
      <AuthHeader
        title="Verify Your Account"
        subtitle="A six-digit code was sent to your email, enter it below to confirm your account."
      />
      <VerificationInput
        onVerify={handleVerify}
        onResend={handleResend}
        onBack={handleBack}
        isVerifying={isVerifying}
        isResending={isResending}
      />
    </View>
  );
}
