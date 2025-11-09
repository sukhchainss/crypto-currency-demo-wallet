import { atom } from 'jotai';
import type { CurrencyInfo, CurrencyListType } from '../types/CurrencyInfo';

export const titleAtom = atom<string>('Welcome to My App');

export const currencyListAtom = atom<CurrencyInfo[]>([]);
export const cryptoListAtom = atom<CurrencyInfo[]>([]);
export const fiatListAtom = atom<CurrencyInfo[]>([]);
export const currentListTypeAtom = atom<CurrencyListType>(null);

export const searchQueryAtom = atom<string>('');
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);
export const selectedCurrencyAtom = atom<CurrencyInfo | null>(null);

export const filteredCurrencyListAtom = atom<CurrencyInfo[]>((get) => {
  const list = get(currencyListAtom);
  const query = get(searchQueryAtom).trim();
  
  if (!query) return list;
  
  return list.filter((currency) => {
    if (currency.name.toLowerCase().startsWith(query.toLowerCase())) {
      return true;
    }
    
    if (currency.name.toLowerCase().includes(` ${query.toLowerCase()}`)) {
      return true;
    }
    
    if (currency.symbol.startsWith(query)) {
      return true;
    }
    
    return false;
  });
});
