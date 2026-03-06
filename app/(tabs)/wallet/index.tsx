import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowUpRight, ArrowDownLeft, PieChart } from 'lucide-react-native';
import { router } from 'expo-router';

const assets = [
  {
    id: '1',
    name: 'Solana',
    symbol: 'SOL',
    amount: '24.58',
    value: '$4916.00',
    change: '+7.2%',
    isPositive: true,
    color: 'bg-purple-600',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '2.58',
    value: '$55,622.00',
    change: '-5.2%',
    isPositive: false,
    color: 'bg-blue-600',
  },
  {
    id: '3',
    name: 'USDT',
    symbol: 'USD',
    amount: '24.58',
    value: '$7916.00',
    change: '+8.2%',
    isPositive: true,
    color: 'bg-green-600',
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'receive',
    title: 'Receieved from Sol...',
    amount: '+5 SOL',
    date: '15/02/2026',
    status: 'Completed',
  },
];

export default function WalletScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-purple-600 px-4 pb-8 pt-12">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">Wallet</Text>
            <TouchableOpacity>
              <Icon as={PieChart} size={24} className="text-white" />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <View className="mt-6 items-center">
            <Text className="text-sm text-purple-200">Total Balance</Text>
            <Text className="mt-2 text-5xl font-bold text-white">$6291.00</Text>
            <Text className="mt-1 text-sm text-purple-200">9xQeW...kJ7P</Text>
          </View>

          {/* Action Buttons */}
          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.push('/wallet/send')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-white py-4"
            >
              <Icon as={ArrowUpRight} size={20} className="text-purple-600" />
              <Text className="font-semibold text-purple-600">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/wallet/receive')}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-purple-700 py-4"
            >
              <Icon as={ArrowDownLeft} size={20} className="text-white" />
              <Text className="font-semibold text-white">Receive</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Assets */}
        <View className="mt-6 px-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">Your Assets</Text>
            <TouchableOpacity>
              <Text className="font-semibold text-purple-600">See More</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-4 gap-3">
            {assets.map((asset) => (
              <TouchableOpacity
                key={asset.id}
                className="flex-row items-center justify-between rounded-2xl bg-card p-4"
              >
                <View className="flex-row items-center gap-3">
                  <View className={`h-12 w-12 items-center justify-center rounded-full ${asset.color}`}>
                    <Text className="text-xl font-bold text-white">
                      {asset.symbol.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-semibold">{asset.name}</Text>
                    <Text className="text-sm text-muted-foreground">
                      {asset.amount} {asset.symbol}
                    </Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-semibold">{asset.value}</Text>
                  <Text className={asset.isPositive ? 'text-sm text-green-600' : 'text-sm text-red-600'}>
                    {asset.change}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mt-6 px-4 pb-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold">Recent Activity</Text>
            <TouchableOpacity>
              <Text className="font-semibold text-purple-600">See More</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-4">
            {recentActivity.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                className="flex-row items-center justify-between rounded-2xl bg-card p-4"
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Icon as={ArrowDownLeft} size={20} className="text-purple-600" />
                  </View>
                  <View>
                    <Text className="font-semibold">{activity.title}</Text>
                    <Text className="text-sm text-muted-foreground">{activity.date}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-semibold text-green-600">{activity.amount}</Text>
                  <Text className="text-sm text-muted-foreground">{activity.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
