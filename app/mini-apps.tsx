import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, Sparkles, Gamepad2, Coins, Image as ImageIcon, ShoppingBag, Zap, Lock, Target } from 'lucide-react-native';
import { router } from 'expo-router';

const upcomingApps = [
  {
    id: '1',
    name: 'Token Swap',
    description: 'Swap tokens instantly with best rates',
    icon: Coins,
    color: 'bg-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '2',
    name: 'NFT Marketplace',
    description: 'Mint, buy and sell NFTs',
    icon: ImageIcon,
    color: 'bg-purple-500',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: '3',
    name: 'Gaming Hub',
    description: 'Play games and earn rewards',
    icon: Gamepad2,
    color: 'bg-green-500',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: '4',
    name: 'DeFi Staking',
    description: 'Stake tokens and earn yields',
    icon: Zap,
    color: 'bg-yellow-500',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    id: '5',
    name: 'Marketplace',
    description: 'Buy and sell digital goods',
    icon: ShoppingBag,
    color: 'bg-red-500',
    gradient: 'from-red-500 to-pink-500',
  },
];

export default function MiniAppsScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-purple-600 px-4 pb-8 pt-12">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Icon as={ArrowLeft} size={24} className="text-white" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-white">Mini Apps</Text>
          </View>

          {/* Hero Section */}
          <View className="mt-6 items-center">
            <View className="h-32 w-32 items-center justify-center rounded-full bg-white/20">
              <Icon as={Sparkles} size={64} className="text-white" />
            </View>
            <Text className="mt-4 text-center text-3xl font-bold text-white">
              Coming Soon
            </Text>
            <Text className="mt-2 text-center text-white/90">
              Exciting mini apps are on the way!
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="mx-4 mt-6 rounded-2xl border-2 border-purple-200 bg-purple-50 p-6">
          <View className="flex-row items-start gap-3">
            <Icon as={Sparkles} size={24} className="text-purple-600" />
            <View className="flex-1">
              <Text className="text-lg font-bold text-purple-900">What are Mini Apps?</Text>
              <Text className="mt-2 text-sm text-purple-700">
                Mini Apps are lightweight applications built right into Solcial. Access DeFi, 
                gaming, NFTs, and more without leaving the app!
              </Text>
            </View>
          </View>
        </View>

        {/* Upcoming Apps */}
        <View className="mt-6 px-4">
          <Text className="text-xl font-bold">Coming Soon</Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Here's what we're building for you
          </Text>

          <View className="mt-4 gap-3">
            {upcomingApps.map((app) => (
              <View
                key={app.id}
                className="overflow-hidden rounded-2xl bg-primary"
              >
                <View className={`bg-gradient-to-r ${app.gradient} p-4`}>
                  <View className="flex-row items-center gap-3">
                    <View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                      <Icon as={app.icon} size={28} className="text-white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-white">{app.name}</Text>
                      <Text className="mt-1 text-sm text-white/90">{app.description}</Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center justify-between bg-white p-4">
                  <Text className="text-sm text-muted-foreground">Status</Text>
                  <View className="rounded-full bg-yellow-100 px-3 py-1">
                    <Text className="text-xs font-medium text-yellow-700">In Development</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Features Grid */}
        <View className="mt-6 px-4">
          <Text className="text-xl font-bold">Why Mini Apps?</Text>
          
          <View className="mt-4 gap-3">
            <View className="rounded-2xl bg-card p-4">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                <Icon as={Zap} size={24} className="text-yellow-600" />
              </View>
              <Text className="mt-3 font-semibold">Lightning Fast</Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Built on Solana for instant transactions
              </Text>
            </View>

            <View className="rounded-2xl bg-card p-4">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <Icon as={Lock} size={24} className="text-green-600" />
              </View>
              <Text className="mt-3 font-semibold">Secure & Safe</Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Your wallet, your keys, your control
              </Text>
            </View>

            <View className="rounded-2xl bg-card p-4">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                <Icon as={Target} size={24} className="text-purple-600" />
              </View>
              <Text className="mt-3 font-semibold">All-in-One</Text>
              <Text className="mt-1 text-sm text-muted-foreground">
                Everything you need in one place
              </Text>
            </View>
          </View>
        </View>

        {/* Notify Me Section */}
        <View className="mx-4 my-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6">
          <Text className="text-center text-2xl font-bold text-white">
            Get Notified
          </Text>
          <Text className="mt-2 text-center text-white/90">
            We'll let you know when Mini Apps launch!
          </Text>
          <TouchableOpacity className="mt-4 items-center rounded-xl bg-white py-4">
            <Text className="font-semibold text-purple-600">Coming Soon</Text>
          </TouchableOpacity>
        </View>

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}
