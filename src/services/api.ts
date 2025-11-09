import { Platform } from 'react-native';
import type { CryptoCurrency, FiatCurrency, CurrencyApiResponse } from '../types/CurrencyInfo';

// API Configuration
// For iOS Simulator: use localhost
// For Android Emulator: use 10.0.2.2
// For Physical Device: use your computer's IP address
// For Web/Expo: use localhost

const getBaseURL = (): string => {
  if (__DEV__) {
    // Development environment
    if (Platform.OS === 'web') {
      return 'http://localhost:3000';
    }
    if (Platform.OS === 'ios') {
      return 'http://localhost:3000';
    }
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    }
  }
  // Production - replace with your production API URL
  return 'https://your-production-api.com';
};

export const API_BASE_URL = getBaseURL();

// API Endpoints
export const API_ENDPOINTS = {
  CRYPTO: '/api/currencies/crypto',
  FIAT: '/api/currencies/fiat',
  ALL: '/api/currencies/all',
  HEALTH: '/health',
} as const;

// API Response Types
interface CryptoApiResponse extends CurrencyApiResponse {
  data: CryptoCurrency[];
  count: number;
}

interface FiatApiResponse extends CurrencyApiResponse {
  data: FiatCurrency[];
  count: number;
}

interface AllCurrenciesApiResponse extends CurrencyApiResponse {
  data: {
    crypto: CryptoCurrency[];
    fiat: FiatCurrency[];
  };
  count: {
    crypto: number;
    fiat: number;
    total: number;
  };
}

interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

// API Service Functions
export const currencyAPI = {
  /**
   * Fetch cryptocurrency list
   */
  getCryptoCurrencies: async (): Promise<CryptoApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CRYPTO}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CryptoApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching crypto currencies:', error);
      throw error;
    }
  },

  /**
   * Fetch fiat currency list
   */
  getFiatCurrencies: async (): Promise<FiatApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FIAT}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: FiatApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching fiat currencies:', error);
      throw error;
    }
  },

  /**
   * Fetch all currencies
   */
  getAllCurrencies: async (): Promise<AllCurrenciesApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ALL}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AllCurrenciesApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all currencies:', error);
      throw error;
    }
  },

  /**
   * Health check
   */
  healthCheck: async (): Promise<HealthCheckResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.HEALTH}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: HealthCheckResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  },
};
