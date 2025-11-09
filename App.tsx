import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CurrencyActions from './src/components/CurrencyActions';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CurrencyActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});
