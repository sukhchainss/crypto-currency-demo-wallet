import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CurrencyInfo } from '../types/CurrencyInfo';

// Storage keys
const STORAGE_KEYS = {
  CRYPTO_LIST: 'cryptoList',
  FIAT_LIST: 'fiatList',
  LAST_UPDATED: 'lastUpdated',
} as const;

/**
 * Storage utility for currency data using AsyncStorage
 * Provides local storage for cached currency data (Expo Go compatible)
 */
export const currencyStorage = {
  /**
   * Save crypto currencies to local storage
   */
  saveCryptoList: async (data: CurrencyInfo[]): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEYS.CRYPTO_LIST, JSON.stringify(data));
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATED, Date.now().toString());
  },

  /**
   * Get crypto currencies from local storage
   */
  getCryptoList: async (): Promise<CurrencyInfo[]> => {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CRYPTO_LIST);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Save fiat currencies to local storage
   */
  saveFiatList: async (data: CurrencyInfo[]): Promise<void> => {
    await AsyncStorage.setItem(STORAGE_KEYS.FIAT_LIST, JSON.stringify(data));
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATED, Date.now().toString());
  },

  /**
   * Get fiat currencies from local storage
   */
  getFiatList: async (): Promise<CurrencyInfo[]> => {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FIAT_LIST);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Get last updated timestamp
   */
  getLastUpdated: async (): Promise<number | null> => {
    const timestamp = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATED);
    return timestamp ? parseInt(timestamp, 10) : null;
  },

  /**
   * Clear all currency data from storage
   */
  clearAll: async (): Promise<void> => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CRYPTO_LIST,
      STORAGE_KEYS.FIAT_LIST,
      STORAGE_KEYS.LAST_UPDATED,
    ]);
  },

  /**
   * Check if data exists in storage
   */
  hasData: async (): Promise<boolean> => {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(STORAGE_KEYS.CRYPTO_LIST) || keys.includes(STORAGE_KEYS.FIAT_LIST);
  },
};
