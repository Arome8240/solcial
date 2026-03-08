import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { toast } from 'sonner-native';
import type { Notification } from '@/types';
import * as ExpoNotifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useRef } from 'react';

// Configure notifications
ExpoNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  const queryClient = useQueryClient();

  // Register for push notifications
  useEffect(() => {
    registerForPushNotificationsAsync();

    // Listen for notifications
    const subscription1 = ExpoNotifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
    });

    const subscription2 = ExpoNotifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response:', response);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  // Get notifications with infinite scroll
  const {
    data: notificationsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.getNotifications(pageParam as number, 20);
      if (response.error) throw new Error(response.error);
      return (response.data || []) as Notification[];
    },
    getNextPageParam: (lastPage, pages) => {
      return Array.isArray(lastPage) && lastPage.length === 20 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1 as number,
  });

  // Get unread count
  const { data: unreadData } = useQuery({
    queryKey: ['notifications', 'unread'],
    queryFn: async () => {
      const response = await api.getUnreadCount();
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Mark as read
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.markNotificationAsRead(id);
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      const response = await api.markAllNotificationsAsRead();
      if (response.error) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
  });

  const notifications = notificationsData?.pages.flat() || [];
  const unreadCount = (unreadData as { count?: number })?.count || 0;

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
  };
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await ExpoNotifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: ExpoNotifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await ExpoNotifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await ExpoNotifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    
    if (!projectId) {
      console.warn('EAS project ID not found. Push notifications require EAS Build.');
      return;
    }
    
    token = (await ExpoNotifications.getExpoPushTokenAsync({ projectId })).data;
    console.log('Push token:', token);

    // Register token with backend
    await api.registerPushToken(token);
  } catch (error: any) {
    // In development builds without proper credentials, this will fail
    if (__DEV__) {
      console.log('Push notifications not available in development build.');
      console.log('To enable push notifications:');
      console.log('1. Build with EAS: eas build --profile development --platform android');
      console.log('2. Or use Expo Go for testing');
    } else {
      console.error('Error getting push token:', error?.message || error);
    }
  }

  return token;
}
