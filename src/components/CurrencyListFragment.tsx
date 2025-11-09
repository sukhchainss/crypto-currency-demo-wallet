import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItem,
  Keyboard,
} from 'react-native';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  filteredCurrencyListAtom,
  searchQueryAtom,
  isLoadingAtom,
  currentListTypeAtom,
  selectedCurrencyAtom,
} from '../store/atoms';
import type { CurrencyInfo } from '../types/CurrencyInfo';
import { ListType } from '../types/CurrencyInfo';
import { SearchIcon, CloseIcon, EmptyWalletIcon } from './icons/Icons';
import i18n from '../config/localization';

interface CurrencyListFragmentProps {
  onCurrencySelect?: () => void;
}

const CurrencyListFragment: React.FC<CurrencyListFragmentProps> = ({ onCurrencySelect }) => {
  const texts = i18n.t();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const filteredCurrencies = useAtomValue(filteredCurrencyListAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const currentListType = useAtomValue(currentListTypeAtom);
  const setSelectedCurrency = useSetAtom(selectedCurrencyAtom);
  const searchInputRef = useRef<TextInput>(null);
  const [pressedItemId, setPressedItemId] = useState<string | null>(null);

  const renderCurrencyItem: ListRenderItem<CurrencyInfo> = ({ item }) => {
    const isFiat = 'code' in item;
    const isPressed = pressedItemId === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.currencyItem, isPressed && styles.currencyItemPressed]}
        onPressIn={() => {
          setPressedItemId(item.id);
          Keyboard.dismiss();
        }}
        onPressOut={() => setPressedItemId(null)}
        onPress={() => {
          setSelectedCurrency(item);
          if (onCurrencySelect) {
            onCurrencySelect();
          }
        }}
        activeOpacity={0.7}
      >
        <View style={styles.currencyIcon}>
          <Text style={styles.currencySymbol}>{isFiat ? item.symbol : item.symbol.at(0)}</Text>
        </View>
        <View style={styles.currencyInfo}>
          <Text style={styles.currencyName}>{item.name}</Text>
          {isFiat && (
            <Text style={styles.currencyId}>
              {isFiat && `${item.code}`}
            </Text>
          )}
        </View>
        <View style={[styles.typeBadge, styles.badge]}>
          <Text style={styles.badgeText}>{isFiat ? item.code : item.symbol}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (isLoading) return null;
    
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <EmptyWalletIcon size={72} color="#adb5bd" />
        </View>
        <Text style={styles.emptyTitle}>{texts.currencyList.emptyState.title}</Text>
        <Text style={styles.emptyMessage}>
          {searchQuery
            ? texts.currencyList.emptyState.noResults
            : currentListType
            ? texts.currencyList.emptyState.noDataInList
            : texts.currencyList.emptyState.selectList}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentListType && (
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <SearchIcon size={20} color="#6c757d" />
            </View>
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder={texts.currencyList.search.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#adb5bd"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <CloseIcon size={18} color="#6c757d" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a5568" />
          <Text style={styles.loadingText}>{texts.currencyList.loading}</Text>
        </View>
      ) : (
        /* Currency List */
        <FlatList
          data={filteredCurrencies}
          renderItem={renderCurrencyItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={() => Keyboard.dismiss()}
        />
      )}

      {/* Results Counter */}
      {!isLoading && filteredCurrencies.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {texts.currencyList.footer.showing} {filteredCurrencies.length} {filteredCurrencies.length === 1 ? texts.currencyList.footer.currency : texts.currencyList.footer.currencies}
            {searchQuery && ` ${texts.currencyList.footer.matching} "${searchQuery}"`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    flex: 1,
    letterSpacing: -0.5,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  searchIconContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#212529',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  currencyItemPressed: {
    backgroundColor: '#e9ecef',
    transform: [{ scale: 0.98 }],
  },
  currencyIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#495057',
  },
  currencyInfo: {
    flex: 1,
  },
  currencyName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  currencyId: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badge: {
    backgroundColor: '#cbd5e0',
  },
  badgeText: {
    color: '#2d3748',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyIconContainer: {
    marginBottom: 24,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  emptyMessage: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default CurrencyListFragment;
