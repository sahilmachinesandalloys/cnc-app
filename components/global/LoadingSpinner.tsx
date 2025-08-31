import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING } from '../../constants';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = COLORS.primary,
  text = 'Loading...',
  fullScreen = false,
}) => {
  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.container;

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <ResponsiveText 
          size="bodyMedium" 
          color="textSecondary" 
          style={styles.loadingText}
        >
          {text}
        </ResponsiveText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    gap: SPACING.md,
  },
  loadingText: {
    textAlign: 'center',
  },
});

export default LoadingSpinner;
