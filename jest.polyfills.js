// Setup global mocks
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

// Mock __DEV__ global
global.__DEV__ = true;

// Completely mock React Native to avoid Flow syntax issues
jest.mock('react-native', () => {
  const React = require('react');
  
  const View = (props) => React.createElement('View', props, props.children);
  const Text = (props) => React.createElement('Text', props, props.children);
  const TextInput = (props) => React.createElement('TextInput', props);
  const TouchableOpacity = (props) => React.createElement('TouchableOpacity', props, props.children);
  const Pressable = (props) => React.createElement('Pressable', props, props.children);
  const Modal = (props) => React.createElement('Modal', props, props.children);
  const ScrollView = (props) => React.createElement('ScrollView', props, props.children);
  const FlatList = (props) => React.createElement('FlatList', props);
  const ActivityIndicator = (props) => React.createElement('ActivityIndicator', props);
  
  return {
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => style,
    },
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    Modal,
    ScrollView,
    FlatList,
    ActivityIndicator,
    Keyboard: {
      dismiss: jest.fn(),
    },
    Platform: {
      OS: 'ios',
      select: (obj) => obj.ios || obj.default,
      Version: 14,
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667, scale: 2, fontScale: 1 })),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    },
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));
