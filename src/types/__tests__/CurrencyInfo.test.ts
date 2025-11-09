import { isFiatCurrency } from '../CurrencyInfo';
import type { CurrencyInfo, FiatCurrency, CryptoCurrency } from '../CurrencyInfo';

describe('CurrencyInfo Type Guards', () => {
  describe('isFiatCurrency', () => {
    it('should return true for fiat currency with code property', () => {
      const fiatCurrency: FiatCurrency = {
        id: '1',
        name: 'US Dollar',
        symbol: '$',
        code: 'USD',
      };
      expect(isFiatCurrency(fiatCurrency)).toBe(true);
    });

    it('should return false for crypto currency without code property', () => {
      const cryptoCurrency: CryptoCurrency = {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
      };
      expect(isFiatCurrency(cryptoCurrency)).toBe(false);
    });

    it('should correctly identify fiat currency in mixed array', () => {
      const currencies: CurrencyInfo[] = [
        { id: '1', name: 'Bitcoin', symbol: 'BTC' },
        { id: '2', name: 'US Dollar', symbol: '$', code: 'USD' },
        { id: '3', name: 'Ethereum', symbol: 'ETH' },
      ];

      const fiatCurrencies = currencies.filter(isFiatCurrency);
      expect(fiatCurrencies).toHaveLength(1);
      expect(fiatCurrencies[0].name).toBe('US Dollar');
    });
  });
});
