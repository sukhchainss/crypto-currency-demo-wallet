// Currency Type Definitions

/**
 * Cryptocurrency information
 */
export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
}

/**
 * Fiat currency information
 */
export interface FiatCurrency {
  id: string;
  name: string;
  symbol: string;
  code: string;
}

/**
 * Unified CurrencyInfo that can represent both crypto and fiat
 */
export type CurrencyInfo = CryptoCurrency | FiatCurrency;

/**
 * Type guard to check if currency is fiat
 */
export function isFiatCurrency(currency: CurrencyInfo): currency is FiatCurrency {
  return 'code' in currency;
}

/**
 * Currency list type identifier enum
 */
export enum ListType {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
  ALL = 'all',
}

/**
 * Currency list type with null state
 */
export type CurrencyListType = ListType | null;

/**
 * API response structure
 */
export interface CurrencyApiResponse {
  success: boolean;
  data: CurrencyInfo[] | { crypto: CryptoCurrency[]; fiat: FiatCurrency[] };
  count?: number | { crypto: number; fiat: number; total: number };
}
