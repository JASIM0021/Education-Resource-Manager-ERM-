// themes.js
import { DefaultTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#ffffff',
    text: '#000000',
  },
};

export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#bb86fc',
    background: '#121212',
    text: '#ffffff',
  },
};

export const responsiveWidth = width * 0.25; // 25% of screen width
export const responsiveHeight = height * 0.1; // 10% of screen height
