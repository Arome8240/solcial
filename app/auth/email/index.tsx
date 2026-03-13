import { View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout, AuthHeader, SignUpForm } from '@/components/auth';

export default function EmailScreen() {
  const { signup, isSigningUp } = useAuth();

  const handleContinue = (data: { email: string; password: string; username: string }) => {
    signup(data);
  };

  return (
    <AuthLayout>
      <View className="flex-1 px-5 pt-16">
        <AuthHeader
          title="Enter Your Email"
          subtitle="This email will be used to recover your social account if you lose access."
        />
        <SignUpForm
          onSubmit={handleContinue}
          isSubmitting={isSigningUp}
        />
      </View>
    </AuthLayout>
  );
}
