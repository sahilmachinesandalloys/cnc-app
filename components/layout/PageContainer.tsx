import React from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import SafeAreaContainer from './SafeAreaContainer';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundColor?: keyof typeof COLORS | string;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  scrollable?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  padding?: keyof typeof SPACING;
  showHeader?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  backgroundColor = 'background',
  statusBarStyle = 'dark-content',
  scrollable = true,
  refreshing = false,
  onRefresh,
  padding = 'lg',
  showHeader = true,
}) => {
  const Container = scrollable ? ScrollView : View;
  const containerProps = scrollable ? {
    refreshControl: onRefresh ? (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    ) : undefined,
    showsVerticalScrollIndicator: false,
  } : {};

  return (
    <SafeAreaContainer
      backgroundColor={backgroundColor}
      statusBarStyle={statusBarStyle}
    >
      <Container
        style={[
          styles.container,
          { padding: SPACING[padding] },
        ]}
        {...containerProps}
      >
        {showHeader && (title || subtitle) && (
          <View style={styles.header}>
            {title && (
              <ResponsiveText size="headlineLarge" color="textPrimary" weight="bold">
                {title}
              </ResponsiveText>
            )}
            {subtitle && (
              <ResponsiveText 
                size="bodyLarge" 
                color="textSecondary" 
                style={styles.subtitle}
              >
                {subtitle}
              </ResponsiveText>
            )}
          </View>
        )}
        
        <View style={styles.content}>
          {children}
        </View>
      </Container>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: SPACING.xl,
    gap: SPACING.xs,
  },
  subtitle: {
    lineHeight: 24,
  },
  content: {
    flex: 1,
  },
});

export default PageContainer;
