import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING } from '../../constants';
import { useDrawer } from '../../contexts/DrawerContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  onMenuPress?: () => void;
  title?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress, title, showBackButton }) => {
  const { openDrawer } = useDrawer();
  const router = useRouter();

  const handleMenuPress = () => {
    openDrawer();
    onMenuPress?.();
  };

  const handleBackPress = () => {
    router.back();
  };

  // If showing back button, render different layout
  if (showBackButton) {
    return (
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary, COLORS.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.backButtonHeader}
      >
        <View style={styles.topBar}>
                     <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}>
             <Ionicons name="arrow-back" size={24} color={COLORS.white} />
           </TouchableOpacity>
          <ResponsiveText size="titleMedium" color="white" weight="bold" style={styles.title}>
            {title}
          </ResponsiveText>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>
    );
  }

  // Default header with logo and menu
  return (
    <View style={styles.header}>
      <View style={styles.topBar}>
        <View style={styles.branding}>
          <Image
            source={require('../../assets/app-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
          <Ionicons name="grid-outline" size={24} color={COLORS.gray[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.sm,
    paddingRight: SPACING.sm + 10,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.white, // White background for default header
  },
  // Special styles for back button header (categories screen)
  backButtonHeader: {
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.sm, // Reduced from md to sm
    paddingBottom: SPACING.sm, // Reduced from md to sm
    paddingRight: SPACING.sm + 10,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.primary, // Fallback color for gradient
    minHeight: 60, // Reduced from 80 to 60
    justifyContent: 'center', // Center content vertically
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 70,
  },
  iconButton: {
    padding: SPACING.xs,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Same width as iconButton for centering
  },
});

export default Header;
