import { View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { AuthLayout, AuthHeader, SignInForm } from '@/components/auth';

export default function SignInScreen() {
  const { signin, isSigningIn } = useAuth();

  const handleSignIn = (data: { email: string; password: string }) => {
    signin(data);
  };

  const handleSignUp = () => {
    router.push('/auth/email');
  };

  return (
    <AuthLayout>
      <View className="flex-1 px-5 pt-16">
        <AuthHeader
          title="Welcome Back!"
          subtitle="Sign In into your account"
        />
        <SignInForm
          onSubmit={handleSignIn}
          onSignUp={handleSignUp}
          isSubmitting={isSigningIn}
        />
      </View>
    </AuthLayout>
  );
}
