// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  return {
    Svg: (props) => React.createElement('Svg', props, props.children),
    Path: (props) => React.createElement('Path', props),
    Circle: (props) => React.createElement('Circle', props),
    Rect: (props) => React.createElement('Rect', props),
  };
});

// Mock global fetch
global.fetch = jest.fn();

// Silence warnings about act()
global.IS_REACT_ACT_ENVIRONMENT = true;
