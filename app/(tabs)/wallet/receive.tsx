import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, QrCode, Copy } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { toast } from 'sonner-native';
import * as Clipboard from 'expo-clipboard';

export default function ReceiveMoneyScreen() {
  const [showAddress, setShowAddress] = useState(false);
  const walletAddress = '9xQeW...kJ7P';
  const fullWalletAddress = '9xQeWkJ7P8sN3mK4vL2hR6tY1uZ5wX7cB9dF0gH3jM';

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(fullWalletAddress);
    toast.success('Address copied to clipboard');
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center gap-3 px-4 pt-12">
          <TouchableOpacity onPress={() => router.back()}>
            <Icon as={ArrowLeft} size={24} className="text-foreground" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Receive Money</Text>
        </View>

        {/* QR Code Section */}
        <View className="mt-8 items-center px-4">
          {showAddress ? (
            <View className="w-full items-center rounded-3xl bg-card p-6">
              <Text className="text-sm text-muted-foreground">Your Wallet Address</Text>
              <Text className="mt-2 text-2xl font-bold">{walletAddress}</Text>
              <TouchableOpacity 
                onPress={copyToClipboard}
                className="mt-4 flex-row items-center gap-2 rounded-xl bg-purple-600 px-6 py-3"
              >
                <Icon as={Copy} size={20} className="text-white" />
                <Text className="font-semibold text-white">Copy Address</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="items-center rounded-3xl bg-card p-8">
              <View className="rounded-2xl bg-white p-4">
                <QRCode
                  value={fullWalletAddress}
                  size={240}
                  backgroundColor="white"
                  color="black"
                />
              </View>
              <Text className="mt-4 text-sm text-muted-foreground">Scan to send payment</Text>
            </View>
          )}
        </View>

        {/* Toggle Button */}
        <View className="mt-6 px-4">
          <TouchableOpacity
            onPress={() => setShowAddress(!showAddress)}
            className="flex-row items-center justify-center gap-2 rounded-2xl bg-purple-600 py-4"
          >
            <Icon as={QrCode} size={20} className="text-white" />
            <Text className="font-semibold text-white">
              {showAddress ? 'Show QR Code' : 'Show QR Code'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* How to Receive */}
        <View className="mt-6 px-4">
          <View className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-6">
            <Text className="text-lg font-semibold">How to Receive</Text>
            <View className="mt-3 gap-2">
              <Text className="text-sm text-muted-foreground">
                1. Share your wallet address or QR code
              </Text>
              <Text className="text-sm text-muted-foreground">
                2. Sender enters amount and confirms.
              </Text>
              <Text className="text-sm text-muted-foreground">
                3. Funds arrive in seconds on Solana.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
