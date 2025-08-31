import React from 'react';
import { Text, TextProps, StyleSheet, Platform } from 'react-native';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, FONT_FAMILY } from '../../constants';

interface ResponsiveTextProps extends TextProps {
  size?: keyof typeof FONT_SIZES;
  color?: keyof typeof COLORS;
  weight?: keyof typeof FONT_WEIGHTS;
  family?: keyof typeof FONT_FAMILY;
  lineHeight?: 'tight' | 'normal' | 'relaxed';
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  size = 'bodyMedium',
  color = 'textPrimary',
  weight = 'regular',
  family = 'regular',
  lineHeight = 'normal',
  style,
  ...props
}) => {
  const getLineHeight = () => {
    const fontSize = FONT_SIZES[size];
    switch (lineHeight) {
      case 'tight':
        return fontSize * 1.2;
      case 'relaxed':
        return fontSize * 1.6;
      default:
        return fontSize * 1.4;
    }
  };

  const getFontFamily = () => {
    try {
      // Map weight to font family for Montserrat
      let fontFamilyKey = family;
      
      // If weight is specified, use it to determine the font family
      if (weight && weight !== 'regular') {
        fontFamilyKey = weight as keyof typeof FONT_FAMILY;
      }
      
      // Check if FONT_FAMILY exists and has the requested family
      if (FONT_FAMILY && FONT_FAMILY[fontFamilyKey]) {
        const montserratFont = FONT_FAMILY[fontFamilyKey];
        return montserratFont;
      }
    } catch (error) {
      console.warn('Font family not available:', error);
    }
    
    // Fallback to system fonts
    if (Platform.OS === 'ios') {
      return 'System'; // San Francisco
    } else {
      return 'sans-serif'; // Roboto
    }
  };

  const textStyle = StyleSheet.create({
    text: {
      fontSize: FONT_SIZES[size],
      fontFamily: getFontFamily(),
      // Don't use fontWeight since we're using specific font families
      color: COLORS[color] as string,
      lineHeight: getLineHeight(),
    },
  });

  return (
    <Text style={[textStyle.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default ResponsiveText;
