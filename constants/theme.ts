import { FONT_FAMILY } from './fonts';

// Theme constants for consistent styling across the app

// Color palette
export const COLORS = {
  // Primary Colors
  primary: '#ff8a00',
  secondary: '#ff3d00',
  accent: '#990400',
  
  // Background Colors
  background: '#ffffff',
  backgroundSecondary: '#f8f9fa',
  backgroundTertiary: '#f1f3f4',
  
  // Text Colors
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textInverse: '#ffffff',
  
  // Status Colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  
  // Gray Scale
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Gradients
  primaryGradient: ['#ff8a00', '#ff3d00', '#990400'],
  gradientStart: '#ff8a00',
  gradientMiddle: '#ff3d00',
  gradientEnd: '#990400',
  
  // Legacy Colors (keeping for compatibility)
  white: '#ffffff',
  black: '#000000',
} as const;

// Font sizes
export const FONT_SIZES = {
  display: 32,
  headlineLarge: 28,
  headlineMedium: 24,
  headlineSmall: 20,
  titleLarge: 18,
  titleMedium: 16,
  titleSmall: 14,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,
  labelLarge: 14,
  labelMedium: 12,
  labelSmall: 10,
  caption: 12,
  overline: 10,
} as const;

// Font weights
export const FONT_WEIGHTS = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
} as const;

// Line heights
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Border radius
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Shadows
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
} as const;

// Animation easing
export const ANIMATION_EASING = {
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;

// Typography styles
export const TYPOGRAPHY = {
  display: {
    fontSize: FONT_SIZES.display,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  headlineLarge: {
    fontSize: FONT_SIZES.headlineLarge,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHTS.bold,
  },
  headlineMedium: {
    fontSize: FONT_SIZES.headlineMedium,
    fontFamily: FONT_FAMILY.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  headlineSmall: {
    fontSize: FONT_SIZES.headlineSmall,
    fontFamily: FONT_FAMILY.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  titleLarge: {
    fontSize: FONT_SIZES.titleLarge,
    fontFamily: FONT_FAMILY.semiBold,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  titleMedium: {
    fontSize: FONT_SIZES.titleMedium,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  titleSmall: {
    fontSize: FONT_SIZES.titleSmall,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  bodyLarge: {
    fontSize: FONT_SIZES.bodyLarge,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  bodyMedium: {
    fontSize: FONT_SIZES.bodyMedium,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  bodySmall: {
    fontSize: FONT_SIZES.bodySmall,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  labelLarge: {
    fontSize: FONT_SIZES.labelLarge,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  labelMedium: {
    fontSize: FONT_SIZES.labelMedium,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  labelSmall: {
    fontSize: FONT_SIZES.labelSmall,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
  caption: {
    fontSize: FONT_SIZES.caption,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: FONT_WEIGHTS.regular,
  },
  overline: {
    fontSize: FONT_SIZES.overline,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: FONT_WEIGHTS.medium,
  },
} as const;

// Export theme object for easy access
export const THEME = {
  colors: COLORS,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  animationDuration: ANIMATION_DURATION,
  animationEasing: ANIMATION_EASING,
  typography: TYPOGRAPHY,
} as const;

export default THEME;
