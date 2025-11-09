import { createStore } from 'jotai';
import {
  currencyListAtom,
  cryptoListAtom,
  fiatListAtom,
  currentListTypeAtom,
  searchQueryAtom,
  isLoadingAtom,
  errorAtom,
  selectedCurrencyAtom,
  filteredCurrencyListAtom,
} from '../atoms';
import { CurrencyInfo } from '../../types/CurrencyInfo';

describe('Currency Atoms', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  describe('Basic Atoms', () => {
    it('should initialize currencyListAtom with empty array', () => {
      expect(store.get(currencyListAtom)).toEqual([]);
    });

    it('should initialize cryptoListAtom with empty array', () => {
      expect(store.get(cryptoListAtom)).toEqual([]);
    });

    it('should initialize fiatListAtom with empty array', () => {
      expect(store.get(fiatListAtom)).toEqual([]);
    });

    it('should initialize currentListTypeAtom with null', () => {
      expect(store.get(currentListTypeAtom)).toBeNull();
    });

    it('should initialize searchQueryAtom with empty string', () => {
      expect(store.get(searchQueryAtom)).toBe('');
    });

    it('should initialize isLoadingAtom with false', () => {
      expect(store.get(isLoadingAtom)).toBe(false);
    });

    it('should initialize errorAtom with null', () => {
      expect(store.get(errorAtom)).toBeNull();
    });

    it('should initialize selectedCurrencyAtom with null', () => {
      expect(store.get(selectedCurrencyAtom)).toBeNull();
    });
  });

  describe('filteredCurrencyListAtom', () => {
    const mockCurrencies: CurrencyInfo[] = [
      { id: '1', name: 'Bitcoin', symbol: 'BTC' },
      { id: '2', name: 'Ethereum', symbol: 'ETH' },
      { id: '3', name: 'US Dollar', symbol: '$', code: 'USD' },
      { id: '4', name: 'Euro', symbol: '€', code: 'EUR' },
    ];

    beforeEach(() => {
      store.set(currencyListAtom, mockCurrencies);
    });

    it('should return all currencies when search query is empty', () => {
      store.set(searchQueryAtom, '');
      expect(store.get(filteredCurrencyListAtom)).toEqual(mockCurrencies);
    });

    it('should filter by currency name starting with query', () => {
      store.set(searchQueryAtom, 'Bit');
      const filtered = store.get(filteredCurrencyListAtom);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Bitcoin');
    });

    it('should filter by currency name containing query with space prefix', () => {
      store.set(searchQueryAtom, 'Dollar');
      const filtered = store.get(filteredCurrencyListAtom);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('US Dollar');
    });

    it('should filter by symbol starting with query', () => {
      store.set(searchQueryAtom, 'BTC');
      const filtered = store.get(filteredCurrencyListAtom);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].symbol).toBe('BTC');
    });

    it('should be case insensitive for name search', () => {
      store.set(searchQueryAtom, 'bitcoin');
      const filtered = store.get(filteredCurrencyListAtom);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Bitcoin');
    });

    it('should return empty array when no matches found', () => {
      store.set(searchQueryAtom, 'XYZ123');
      expect(store.get(filteredCurrencyListAtom)).toEqual([]);
    });

    it('should trim search query', () => {
      store.set(searchQueryAtom, '  ETH  ');
      const filtered = store.get(filteredCurrencyListAtom);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].symbol).toBe('ETH');
    });
  });

  describe('Atom Updates', () => {
    it('should update currencyListAtom', () => {
      const newList = [{ id: '1', name: 'Bitcoin', symbol: 'BTC' }];
      store.set(currencyListAtom, newList);
      expect(store.get(currencyListAtom)).toEqual(newList);
    });

    it('should update searchQueryAtom', () => {
      store.set(searchQueryAtom, 'BTC');
      expect(store.get(searchQueryAtom)).toBe('BTC');
    });

    it('should update isLoadingAtom', () => {
      store.set(isLoadingAtom, true);
      expect(store.get(isLoadingAtom)).toBe(true);
    });

    it('should update selectedCurrencyAtom', () => {
      const currency = { id: '1', name: 'Bitcoin', symbol: 'BTC' };
      store.set(selectedCurrencyAtom, currency);
      expect(store.get(selectedCurrencyAtom)).toEqual(currency);
    });
  });
});
