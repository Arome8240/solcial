import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './useAuth';

export function useLanguage() {
  const { i18n } = useTranslation();
  const { user } = useAuth();

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        // Priority: user profile > AsyncStorage > device language
        if (user?.language) {
          await i18n.changeLanguage(user.language);
        } else {
          const savedLang = await AsyncStorage.getItem('userLanguage');
          if (savedLang) {
            await i18n.changeLanguage(savedLang);
          }
        }
      } catch (error) {
        console.error('Error initializing language:', error);
      }
    };

    initializeLanguage();
  }, [user?.language, i18n]);

  return { i18n };
}
