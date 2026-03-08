import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
  useFonts,
} from '@expo-google-fonts/geist';
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useThemeStore, useThemeSync } from '@/store/useThemeStore';
import { usePathname } from 'expo-router';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

function RootLayoutContent() {
  const { theme } = useThemeSync();
  const { loadTheme, isLoading } = useThemeStore();
  const pathname = usePathname();
  
  const [isFontsLoaded] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  });

  // Load saved theme preference on mount
  useEffect(() => {
    loadTheme();
  }, []);

  if (!isFontsLoaded || isLoading) {
    return null;
  }

  // Determine StatusBar style based on route
  const getStatusBarStyle = () => {
    if (pathname === '/feed') {
      return 'light'; // Light text on red background
    }
    return theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={theme === 'dark' ? NAV_THEME.dark : NAV_THEME.light}>
        <StatusBar 
          style={getStatusBarStyle()} 
          backgroundColor={pathname === '/feed' ? 'oklch(55.8% 0.288 302.321)' : undefined}
        />
        <Stack screenOptions={{ headerShown: false}} />
        <PortalHost />
        <Toaster richColors />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutContent />
    </QueryClientProvider>
  );
}
