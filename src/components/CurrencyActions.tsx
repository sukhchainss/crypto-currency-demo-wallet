import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useSetAtom, useAtomValue, useAtom} from 'jotai';
import {
  currencyListAtom,
  cryptoListAtom,
  fiatListAtom,
  currentListTypeAtom,
  isLoadingAtom,
  errorAtom,
  searchQueryAtom,
  selectedCurrencyAtom,
} from '../store/atoms';
import {currencyAPI} from '../services/api';
import {currencyStorage} from '../services/storage';
import CurrencyListFragment from './CurrencyListFragment';
import Button from './common/Button';
import {
  TrashIcon,
  PlusIcon,
  BitcoinIcon,
  DollarIcon,
  GridIcon,
  RefreshIcon,
  ChevronDownIcon,
  UKFlagIcon,
  SpainFlagIcon,
  FranceFlagIcon,
  BackArrowIcon,
  CloseIcon,
} from './icons/Icons';
import i18n from '../config/localization';
import { ListType } from '../types/CurrencyInfo';
import { IconPosition, Language, ButtonSize } from '../types/enums';

const CurrencyActions: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(i18n.getLanguage());
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const texts = i18n.t();
  const setCurrencyList = useSetAtom(currencyListAtom);
  const setCryptoList = useSetAtom(cryptoListAtom);
  const setFiatList = useSetAtom(fiatListAtom);
  const setCurrentListType = useSetAtom(currentListTypeAtom as any);
  const setIsLoading = useSetAtom(isLoadingAtom);
  const setError = useSetAtom(errorAtom as any);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  
  const cryptoList = useAtomValue(cryptoListAtom);
  const fiatList = useAtomValue(fiatListAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const currentListType = useAtomValue(currentListTypeAtom);
  const [selectedCurrency, setSelectedCurrency] = useAtom(selectedCurrencyAtom);

  const handleLanguageChange = (language: Language) => {
    i18n.setLanguage(language);
    setCurrentLanguage(language);
    setForceUpdate(prev => prev + 1);
    setIsDropdownOpen(false);
  };

  const getFlagIcon = (language: Language, size: number = 18) => {
    switch (language) {
      case Language.ENGLISH:
        return <UKFlagIcon size={size} />;
      case Language.SPANISH:
        return <SpainFlagIcon size={size} />;
      case Language.FRENCH:
        return <FranceFlagIcon size={size} />;
      default:
        return <UKFlagIcon size={size} />;
    }
  };

  const getLanguageLabel = (language: Language) => {
    switch (language) {
      case Language.ENGLISH:
        return 'English';
      case Language.SPANISH:
        return 'Español';
      case Language.FRENCH:
        return 'Français';
      default:
        return 'English';
    }
  };

  /**
   * Load cached data from AsyncStorage on app start
   */
  useEffect(() => {
    const loadCachedData = async () => {
      const cachedCrypto = await currencyStorage.getCryptoList();
      const cachedFiat = await currencyStorage.getFiatList();
      
      if (cachedCrypto.length > 0) {
        setCryptoList(cachedCrypto);
      }
      if (cachedFiat.length > 0) {
        setFiatList(cachedFiat);
        
        if (!selectedCurrency) {
          const usd = cachedFiat.find(currency => 
            'code' in currency && currency.code === 'USD'
          );
          setSelectedCurrency(usd || cachedFiat[0]);
        }
      }
    };
    
    loadCachedData();
  }, [setCryptoList, setFiatList, selectedCurrency, setSelectedCurrency]);

  const handleClearData = async (): Promise<void> => {
    setCurrencyList([]);
    setCryptoList([]);
    setFiatList([]);
    setCurrentListType(null);
    setSearchQuery('');
    setError(null);
    setSelectedCurrency(null);
    await currencyStorage.clearAll();
  };

  const handleInsertData = async (): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch both lists in parallel (non-blocking, async operation)
      const [cryptoResponse, fiatResponse] = await Promise.all([
        currencyAPI.getCryptoCurrencies(),
        currencyAPI.getFiatCurrencies(),
      ]);

      if (cryptoResponse.success && fiatResponse.success) {
        setCryptoList(cryptoResponse.data);
        setFiatList(fiatResponse.data);
        
        await currencyStorage.saveCryptoList(cryptoResponse.data);
        await currencyStorage.saveFiatList(fiatResponse.data);
        
        if (!selectedCurrency && fiatResponse.data.length > 0) {
          const usd = fiatResponse.data.find(currency => 
            'code' in currency && currency.code === 'USD'
          );
          setSelectedCurrency(usd || fiatResponse.data[0]);
        }
        
        const combinedList = [...cryptoResponse.data, ...fiatResponse.data];
        setCurrencyList(combinedList);
        setCurrentListType('all');
        setSearchQuery('');
      } else {
        throw new Error('Failed to fetch currency data');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      Alert.alert(
        'Error',
        'Failed to fetch currency data. Make sure the API server is running on port 3000.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowCrypto = (): void => {
    if (cryptoList.length === 0) {
      return;
    }
    setSearchQuery('');
    setCurrencyList(cryptoList);
    setCurrentListType(ListType.CRYPTO);
  };

  const handleShowFiat = (): void => {
    if (fiatList.length === 0) {
      return;
    }
    setSearchQuery('');
    setCurrencyList(fiatList);
    setCurrentListType(ListType.FIAT);
  };

  const handleShowAll = (): void => {
    if (cryptoList.length === 0 && fiatList.length === 0) {
      return;
    }
    setSearchQuery('');
    const combinedList = [...cryptoList, ...fiatList];
    setCurrencyList(combinedList);
    setCurrentListType(ListType.ALL);
  };

  const handleCloseModal = (): void => {
    setIsModalVisible(false);
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Dropdown Overlay - Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        />
      )}
      
      <View style={styles.container}>
        {/* Control Panel */}
        <View style={styles.controlPanel}>
          <View style={styles.headerRow}>
            <Text style={styles.controlTitle}>{texts.currencyActions.title}</Text>
            
            {/* Language Switcher Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={styles.languageSwitcher}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                activeOpacity={0.7}
              >
                {getFlagIcon(currentLanguage)}
                <ChevronDownIcon size={12} color="#495057" />
              </TouchableOpacity>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      currentLanguage === Language.ENGLISH && styles.dropdownItemActive,
                    ]}
                    onPress={() => handleLanguageChange(Language.ENGLISH)}
                    activeOpacity={0.7}
                  >
                    {getFlagIcon(Language.ENGLISH, 22)}
                    <Text style={styles.dropdownItemText}>English</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      currentLanguage === Language.SPANISH && styles.dropdownItemActive,
                    ]}
                    onPress={() => handleLanguageChange(Language.SPANISH)}
                    activeOpacity={0.7}
                  >
                    {getFlagIcon(Language.SPANISH, 22)}
                    <Text style={styles.dropdownItemText}>Español</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      currentLanguage === Language.FRENCH && styles.dropdownItemActive,
                    ]}
                    onPress={() => handleLanguageChange(Language.FRENCH)}
                    activeOpacity={0.7}
                  >
                    {getFlagIcon(Language.FRENCH, 22)}
                    <Text style={styles.dropdownItemText}>Français</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonsContainer}
        >
          {/* Button 1: Clear Data */}
          <View style={styles.buttonWrapper}>
            <Button
              title={texts.currencyActions.buttons.clear}
              onPress={handleClearData}
              disabled={isLoading}
              icon={<TrashIcon size={18} />}
              iconPosition={IconPosition.LEFT}
              size={ButtonSize.SMALL}
            />
          </View>

          {/* Button 2: Insert Data */}
          <View style={styles.buttonWrapper}>
            <Button
              title={isLoading ? texts.currencyActions.buttons.loading : texts.currencyActions.buttons.insertData}
              onPress={handleInsertData}
              disabled={isLoading}
              icon={isLoading ? <RefreshIcon size={18} /> : <PlusIcon size={18} />}
              iconPosition={IconPosition.LEFT}
              size={ButtonSize.SMALL}
            />
          </View>

          {/* Button 3: Show Crypto (List A) */}
          <View style={styles.buttonWrapper}>
            <Button
              title={texts.currencyActions.buttons.crypto}
              onPress={handleShowCrypto}
              disabled={isLoading}
              icon={<BitcoinIcon size={18} />}
              iconPosition={IconPosition.LEFT}
              active={currentListType === ListType.CRYPTO}
              size={ButtonSize.SMALL}
            />
          </View>

          {/* Button 4: Show Fiat (List B) */}
          <View style={styles.buttonWrapper}>
            <Button
              title={texts.currencyActions.buttons.fiat}
              onPress={handleShowFiat}
              disabled={isLoading}
              icon={<DollarIcon size={18} />}
              iconPosition={IconPosition.LEFT}
              active={currentListType === ListType.FIAT}
              size={ButtonSize.SMALL}
            />
          </View>

          {/* Button 5: Show All Purchasable */}
          <View style={styles.buttonWrapper}>
            <Button
              title={texts.currencyActions.buttons.all}
              onPress={handleShowAll}
              disabled={isLoading}
              icon={<GridIcon size={18} />}
              iconPosition={IconPosition.LEFT}
              active={currentListType === ListType.ALL}
              size={ButtonSize.SMALL}
            />
          </View>
        </ScrollView>
      </View>

        {/* Selected Currency Display */}
        <View style={styles.selectedCurrencyContainer}>
          <Text style={styles.selectedCurrencyLabel}>{texts.currencyActions.selectedCurrency}</Text>
          <TouchableOpacity 
            style={styles.selectedCurrencyButton}
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.7}
          >
            <View style={styles.selectedCurrencyInfo}>
              <View style={styles.selectedCurrencyDetails}>
                <Text style={styles.selectedCurrencyName}>
                  {selectedCurrency?.name || texts.currencyActions.selectCurrency}
                </Text>
                <Text style={styles.selectedCurrencySymbol}>
                  {selectedCurrency && 'code' in selectedCurrency 
                    ? selectedCurrency.code 
                    : selectedCurrency?.symbol || ''}
                </Text>
              </View>
              <ChevronDownIcon size={20} color="#6c757d" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Currency List Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleCloseModal}
              activeOpacity={0.7}
            >
              <BackArrowIcon size={24} color="#212529" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {currentListType === ListType.CRYPTO && texts.currencyList.headers.crypto}
              {currentListType === ListType.FIAT && texts.currencyList.headers.fiat}
              {currentListType === ListType.ALL && texts.currencyList.headers.all}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
              activeOpacity={0.7}
            >
              <CloseIcon size={24} color="#212529" />
            </TouchableOpacity>
          </View>

          {/* Currency List */}
          <CurrencyListFragment onCurrencySelect={handleCloseModal} />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  dropdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  controlPanel: {
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  controlTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    letterSpacing: -0.5,
    flex: 1,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  languageSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dee2e6',
    gap: 4,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginLeft: 4,
    marginRight: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 42,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minWidth: 160,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dropdownItemActive: {
    backgroundColor: '#e9ecef',
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  buttonWrapper: {
    marginHorizontal: 4,
  },
  statusContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    marginTop: 8,
  },
  statusText: {
    fontSize: 13,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedCurrencyContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  selectedCurrencyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  selectedCurrencyButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedCurrencyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCurrencyDetails: {
    flex: 1,
  },
  selectedCurrencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  selectedCurrencySymbol: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6c757d',
  },
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    width: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
    width: 40,
    alignItems: 'flex-end',
  },
});

export default CurrencyActions;
