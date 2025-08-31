import React, { Component, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { ResponsiveText, AnimatedButton } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <View style={styles.errorCard}>
            <ResponsiveText size="headlineMedium" color="error" weight="bold">
              Oops! Something went wrong
            </ResponsiveText>
            
            <ResponsiveText 
              size="bodyMedium" 
              color="textSecondary" 
              style={styles.errorMessage}
            >
              {this.state.error?.message || 'An unexpected error occurred'}
            </ResponsiveText>
            
            <AnimatedButton
              title="Try Again"
              onPress={this.handleRetry}
              variant="primary"
              size="medium"
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  errorCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.lg,
    ...SHADOWS.md,
    maxWidth: 400,
    width: '100%',
  },
  errorMessage: {
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ErrorBoundary;
