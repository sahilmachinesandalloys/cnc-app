import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';

interface SafeAreaContainerProps {
  children: React.ReactNode;
  backgroundColor?: keyof typeof COLORS | string;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  statusBarBackgroundColor?: keyof typeof COLORS | string;
  statusBarTranslucent?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: any;
}

const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  backgroundColor = 'background',
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor,
  statusBarTranslucent = false,
  edges = ['top', 'bottom', 'left', 'right'],
  style,
}) => {
  // Get color values
  const getBackgroundColor = (): string => {
    if (typeof backgroundColor === 'string' && backgroundColor in COLORS) {
      const colorValue = COLORS[backgroundColor as keyof typeof COLORS];
      // Handle nested color objects (like gray)
      if (typeof colorValue === 'object') {
        return colorValue[500] || colorValue[400] || Object.values(colorValue)[0];
      }
      return colorValue;
    }
    return backgroundColor as string;
  };

  const getStatusBarBackgroundColor = (): string => {
    if (statusBarBackgroundColor) {
      if (typeof statusBarBackgroundColor === 'string' && statusBarBackgroundColor in COLORS) {
        const colorValue = COLORS[statusBarBackgroundColor as keyof typeof COLORS];
        // Handle nested color objects (like gray)
        if (typeof colorValue === 'object') {
          return colorValue[500] || colorValue[400] || Object.values(colorValue)[0];
        }
        return colorValue;
      }
      return statusBarBackgroundColor as string;
    }
    return getBackgroundColor();
  };

  // Set status bar appearance
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(getStatusBarBackgroundColor());
      StatusBar.setTranslucent(statusBarTranslucent);
    }
    StatusBar.setBarStyle(statusBarStyle);
  }, [statusBarStyle, statusBarBackgroundColor, statusBarTranslucent, backgroundColor]);

  const containerStyle = [
    styles.container,
    {
      backgroundColor: getBackgroundColor(),
    },
    style,
  ];

  return (
    <SafeAreaView 
      style={containerStyle} 
      edges={edges}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaContainer;
