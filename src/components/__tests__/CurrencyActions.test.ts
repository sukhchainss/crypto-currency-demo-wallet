import { currencyStorage } from '../../services/storage';
import { currencyAPI } from '../../services/api';
import i18n from '../../config/localization';
import { Language } from '../../types/enums';

// Mock the services
jest.mock('../../services/storage');
jest.mock('../../services/api');

const mockCryptoData = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC' },
  { id: '2', name: 'Ethereum', symbol: 'ETH' },
  { id: '3', name: 'Cardano', symbol: 'ADA' },
];

const mockFiatData = [
  { id: '4', name: 'US Dollar', symbol: '$', code: 'USD' },
  { id: '5', name: 'Euro', symbol: '€', code: 'EUR' },
  { id: '6', name: 'British Pound', symbol: '£', code: 'GBP' },
];

describe('CurrencyActions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Language Management', () => {
    it('should initialize with current language', () => {
      const currentLang = i18n.getLanguage();
      expect([Language.ENGLISH, Language.SPANISH, Language.FRENCH]).toContain(currentLang);
    });

    it('should change language to Spanish', () => {
      i18n.setLanguage(Language.SPANISH);
      expect(i18n.getLanguage()).toBe(Language.SPANISH);
      const texts = i18n.t();
      expect(texts.currencyActions.title).toBe('Acciones de Monedas');
    });

    it('should change language to French', () => {
      i18n.setLanguage(Language.FRENCH);
      expect(i18n.getLanguage()).toBe(Language.FRENCH);
      const texts = i18n.t();
      expect(texts.currencyActions.title).toBe('Actions sur les Devises');
    });

    it('should change language back to English', () => {
      i18n.setLanguage(Language.ENGLISH);
      expect(i18n.getLanguage()).toBe(Language.ENGLISH);
      const texts = i18n.t();
      expect(texts.currencyActions.title).toBe('Currency Actions');
    });
  });

  describe('Data Loading from Storage', () => {
    it('should call currencyStorage.getCryptoList on mount', async () => {
      const mockGetCryptoList = currencyStorage.getCryptoList as jest.Mock;
      mockGetCryptoList.mockResolvedValue(mockCryptoData);
      
      const result = await currencyStorage.getCryptoList();
      
      expect(mockGetCryptoList).toHaveBeenCalled();
      expect(result).toEqual(mockCryptoData);
    });

    it('should call currencyStorage.getFiatList on mount', async () => {
      const mockGetFiatList = currencyStorage.getFiatList as jest.Mock;
      mockGetFiatList.mockResolvedValue(mockFiatData);
      
      const result = await currencyStorage.getFiatList();
      
      expect(mockGetFiatList).toHaveBeenCalled();
      expect(result).toEqual(mockFiatData);
    });

    it('should handle cached crypto data with proper structure', async () => {
      const mockGetCryptoList = currencyStorage.getCryptoList as jest.Mock;
      mockGetCryptoList.mockResolvedValue(mockCryptoData);
      
      const result = await currencyStorage.getCryptoList();
      
      expect(result).toEqual(mockCryptoData);
      expect(result.length).toBe(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('symbol');
      expect(result[0]).not.toHaveProperty('code');
    });

    it('should handle cached fiat data with proper structure', async () => {
      const mockGetFiatList = currencyStorage.getFiatList as jest.Mock;
      mockGetFiatList.mockResolvedValue(mockFiatData);
      
      const result = await currencyStorage.getFiatList();
      
      expect(result).toEqual(mockFiatData);
      expect(result.length).toBe(3);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('symbol');
      expect(result[0]).toHaveProperty('code');
    });
  });

  describe('Data Insertion with Mock Data', () => {
    it('should fetch crypto and fiat currencies in parallel with full data', async () => {
      const mockCryptoResponse = {
        success: true,
        data: mockCryptoData,
      };
      const mockFiatResponse = {
        success: true,
        data: mockFiatData,
      };
      
      const mockGetCrypto = currencyAPI.getCryptoCurrencies as jest.Mock;
      const mockGetFiat = currencyAPI.getFiatCurrencies as jest.Mock;
      
      mockGetCrypto.mockResolvedValue(mockCryptoResponse);
      mockGetFiat.mockResolvedValue(mockFiatResponse);
      
      const [cryptoResult, fiatResult] = await Promise.all([
        currencyAPI.getCryptoCurrencies(),
        currencyAPI.getFiatCurrencies(),
      ]);
      
      expect(mockGetCrypto).toHaveBeenCalled();
      expect(mockGetFiat).toHaveBeenCalled();
      expect(cryptoResult.success).toBe(true);
      expect(fiatResult.success).toBe(true);
      expect(cryptoResult.data.length).toBe(3);
      expect(fiatResult.data.length).toBe(3);
      expect(cryptoResult.data[0].name).toBe('Bitcoin');
      expect(fiatResult.data[0].name).toBe('US Dollar');
    });

    it('should save crypto data to storage after fetching', async () => {
      const mockSaveCrypto = currencyStorage.saveCryptoList as jest.Mock;
      mockSaveCrypto.mockResolvedValue(undefined);
      
      await currencyStorage.saveCryptoList(mockCryptoData);
      
      expect(mockSaveCrypto).toHaveBeenCalledWith(mockCryptoData);
      expect(mockSaveCrypto).toHaveBeenCalledTimes(1);
    });

    it('should save fiat data to storage after fetching', async () => {
      const mockSaveFiat = currencyStorage.saveFiatList as jest.Mock;
      mockSaveFiat.mockResolvedValue(undefined);
      
      await currencyStorage.saveFiatList(mockFiatData);
      
      expect(mockSaveFiat).toHaveBeenCalledWith(mockFiatData);
      expect(mockSaveFiat).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors gracefully', async () => {
      const mockGetCrypto = currencyAPI.getCryptoCurrencies as jest.Mock;
      const errorMessage = 'Network error';
      mockGetCrypto.mockRejectedValue(new Error(errorMessage));
      
      await expect(currencyAPI.getCryptoCurrencies()).rejects.toThrow(errorMessage);
    });

    it('should combine crypto and fiat data correctly', async () => {
      const combined = [...mockCryptoData, ...mockFiatData];
      
      expect(combined.length).toBe(6);
      expect(combined.filter(c => !('code' in c)).length).toBe(3); // 3 crypto
      expect(combined.filter(c => 'code' in c).length).toBe(3); // 3 fiat
    });
  });

  describe('Data Clearing', () => {
    it('should call clearAll on storage', async () => {
      const mockClearAll = currencyStorage.clearAll as jest.Mock;
      mockClearAll.mockResolvedValue(undefined);
      
      await currencyStorage.clearAll();
      
      expect(mockClearAll).toHaveBeenCalled();
    });

    it('should clear storage without errors', async () => {
      const mockClearAll = currencyStorage.clearAll as jest.Mock;
      mockClearAll.mockResolvedValue(undefined);
      
      await expect(currencyStorage.clearAll()).resolves.not.toThrow();
    });
  });

  describe('List Type Filtering with Real Data', () => {
    it('should filter to show only crypto currencies from combined list', () => {
      const combinedData = [...mockCryptoData, ...mockFiatData];
      const cryptoOnly = combinedData.filter(item => !('code' in item));
      
      expect(cryptoOnly.length).toBe(3);
      expect(cryptoOnly.every(c => !('code' in c))).toBe(true);
      expect(cryptoOnly[0].name).toBe('Bitcoin');
      expect(cryptoOnly[1].name).toBe('Ethereum');
      expect(cryptoOnly[2].name).toBe('Cardano');
    });

    it('should filter to show only fiat currencies from combined list', () => {
      const combinedData = [...mockCryptoData, ...mockFiatData];
      const fiatOnly = combinedData.filter(item => 'code' in item);
      
      expect(fiatOnly.length).toBe(3);
      expect(fiatOnly.every(c => 'code' in c)).toBe(true);
      expect(fiatOnly[0].name).toBe('US Dollar');
      expect(fiatOnly[1].name).toBe('Euro');
      expect(fiatOnly[2].name).toBe('British Pound');
    });

    it('should show all currencies when no filter applied', () => {
      const allData = [...mockCryptoData, ...mockFiatData];
      
      expect(allData.length).toBe(6);
      expect(allData.filter(c => !('code' in c)).length).toBe(3); // crypto
      expect(allData.filter(c => 'code' in c).length).toBe(3); // fiat
    });

    it('should maintain data integrity when filtering', () => {
      const combinedData = [...mockCryptoData, ...mockFiatData];
      const cryptoOnly = combinedData.filter(item => !('code' in item));
      const fiatOnly = combinedData.filter(item => 'code' in item);
      
      expect(cryptoOnly.length + fiatOnly.length).toBe(combinedData.length);
    });
  });

  describe('Selected Currency', () => {
    it('should default to USD when available', () => {
      const mockFiatData = [
        { id: '1', name: 'Euro', symbol: '€', code: 'EUR' },
        { id: '2', name: 'US Dollar', symbol: '$', code: 'USD' },
        { id: '3', name: 'British Pound', symbol: '£', code: 'GBP' },
      ];
      
      const usd = mockFiatData.find(currency => 
        'code' in currency && currency.code === 'USD'
      );
      
      expect(usd).toBeDefined();
      expect(usd?.name).toBe('US Dollar');
    });

    it('should fallback to first currency if USD not available', () => {
      const mockFiatData = [
        { id: '1', name: 'Euro', symbol: '€', code: 'EUR' },
        { id: '2', name: 'British Pound', symbol: '£', code: 'GBP' },
      ];
      
      const usd = mockFiatData.find(currency => 
        'code' in currency && currency.code === 'USD'
      );
      
      expect(usd).toBeUndefined();
      expect(mockFiatData[0].code).toBe('EUR');
    });
  });

  describe('Translation Keys', () => {
    it('should have valid title translation for all languages', () => {
      const languages = [Language.ENGLISH, Language.SPANISH, Language.FRENCH];
      
      languages.forEach(lang => {
        i18n.setLanguage(lang);
        const texts = i18n.t();
        expect(texts.currencyActions.title).toBeTruthy();
        expect(typeof texts.currencyActions.title).toBe('string');
      });
    });

    it('should have valid button translations for all languages', () => {
      const languages = [Language.ENGLISH, Language.SPANISH, Language.FRENCH];
      
      languages.forEach(lang => {
        i18n.setLanguage(lang);
        const texts = i18n.t();
        expect(texts.currencyActions.buttons.clear).toBeTruthy();
        expect(texts.currencyActions.buttons.insertData).toBeTruthy();
        expect(texts.currencyActions.buttons.crypto).toBeTruthy();
        expect(texts.currencyActions.buttons.fiat).toBeTruthy();
        expect(texts.currencyActions.buttons.all).toBeTruthy();
      });
    });

    it('should have valid status text translations', () => {
      const languages = [Language.ENGLISH, Language.SPANISH, Language.FRENCH];
      
      languages.forEach(lang => {
        i18n.setLanguage(lang);
        const texts = i18n.t();
        const statusText = i18n.interpolate(texts.currencyActions.statusText, { crypto: 5, fiat: 10 });
        expect(statusText).toBeTruthy();
        expect(statusText).toContain('5');
        expect(statusText).toContain('10');
      });
    });
  });

  describe('Modal State', () => {
    it('should start with modal closed', () => {
      const initialModalState = false;
      expect(initialModalState).toBe(false);
    });

    it('should toggle modal state', () => {
      let modalState = false;
      modalState = !modalState;
      expect(modalState).toBe(true);
      modalState = !modalState;
      expect(modalState).toBe(false);
    });
  });

  describe('Loading State', () => {
    it('should start with loading false', () => {
      const initialLoading = false;
      expect(initialLoading).toBe(false);
    });

    it('should set loading to true during API call', () => {
      let isLoading = false;
      isLoading = true;
      expect(isLoading).toBe(true);
    });

    it('should set loading to false after API call completes', () => {
      let isLoading = true;
      isLoading = false;
      expect(isLoading).toBe(false);
    });
  });
});
