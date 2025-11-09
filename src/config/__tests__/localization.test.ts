import { i18n } from '../localization';
import { Language } from '../../types/enums';

describe('Localization', () => {
  beforeEach(() => {
    i18n.setLanguage(Language.ENGLISH);
  });

  describe('Language Switching', () => {
    it('should start with English as default language', () => {
      expect(i18n.getLanguage()).toBe(Language.ENGLISH);
    });

    it('should switch to Spanish', () => {
      i18n.setLanguage(Language.SPANISH);
      expect(i18n.getLanguage()).toBe(Language.SPANISH);
      const texts = i18n.t();
      expect(texts.currencyActions.title).toBe('Acciones de Monedas');
    });

    it('should switch to French', () => {
      i18n.setLanguage(Language.FRENCH);
      expect(i18n.getLanguage()).toBe(Language.FRENCH);
      const texts = i18n.t();
      expect(texts.currencyActions.title).toBe('Actions sur les Devises');
    });

    it('should switch back to English', () => {
      i18n.setLanguage(Language.SPANISH);
      i18n.setLanguage(Language.ENGLISH);
      expect(i18n.getLanguage()).toBe(Language.ENGLISH);
      const texts = i18n.t();
      expect(texts.currencyActions.title).toBe('Currency Actions');
    });
  });

  describe('Translations', () => {
    it('should have all required translation keys', () => {
      const texts = i18n.t();
      expect(texts.currencyActions).toBeDefined();
      expect(texts.currencyList).toBeDefined();
      expect(texts.errors).toBeDefined();
      expect(texts.success).toBeDefined();
      expect(texts.common).toBeDefined();
    });

    it('should have button translations', () => {
      const texts = i18n.t();
      expect(texts.currencyActions.buttons.clear).toBeDefined();
      expect(texts.currencyActions.buttons.insertData).toBeDefined();
      expect(texts.currencyActions.buttons.crypto).toBeDefined();
      expect(texts.currencyActions.buttons.fiat).toBeDefined();
      expect(texts.currencyActions.buttons.all).toBeDefined();
    });

    it('should have selected currency translations', () => {
      const texts = i18n.t();
      expect(texts.currencyActions.selectedCurrency).toBeDefined();
      expect(texts.currencyActions.selectCurrency).toBeDefined();
    });
  });

  describe('Template Interpolation', () => {
    it('should interpolate statusText with crypto and fiat counts', () => {
      const texts = i18n.t();
      const result = i18n.interpolate(texts.currencyActions.statusText, {
        crypto: 10,
        fiat: 5,
      });
      expect(result).toBe('Cached: 10 crypto, 5 fiat');
    });

    it('should interpolate success message with counts', () => {
      const texts = i18n.t();
      const result = i18n.interpolate(texts.success.dataInserted, {
        crypto: 15,
        fiat: 8,
      });
      expect(result).toBe('Inserted 15 crypto and 8 fiat currencies.');
    });

    it('should handle missing interpolation values', () => {
      const template = 'Hello {{name}}, you have {{count}} messages';
      const result = i18n.interpolate(template, { name: 'John' });
      expect(result).toBe('Hello John, you have  messages');
    });
  });

  describe('Spanish Translations', () => {
    beforeEach(() => {
      i18n.setLanguage(Language.SPANISH);
    });

    it('should have correct button translations in Spanish', () => {
      const texts = i18n.t();
      expect(texts.currencyActions.buttons.clear).toBe('Limpiar');
      expect(texts.currencyActions.buttons.crypto).toBe('Cripto');
      expect(texts.currencyActions.buttons.fiat).toBe('Fiat');
    });

    it('should have correct selected currency translation in Spanish', () => {
      const texts = i18n.t();
      expect(texts.currencyActions.selectedCurrency).toBe('Moneda Seleccionada');
    });
  });

  describe('French Translations', () => {
    beforeEach(() => {
      i18n.setLanguage(Language.FRENCH);
    });

    it('should have correct button translations in French', () => {
      const texts = i18n.t();
      expect(texts.currencyActions.buttons.clear).toBe('Effacer');
      expect(texts.currencyActions.buttons.crypto).toBe('Crypto');
      expect(texts.currencyActions.buttons.fiat).toBe('Fiat');
    });

    it('should have correct selected currency translation in French', () => {
      const texts = i18n.t();
      expect(texts.currencyActions.selectedCurrency).toBe('Devise Sélectionnée');
    });
  });
});
