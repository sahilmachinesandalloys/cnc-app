import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof SPACING;
  margin?: keyof typeof SPACING;
  backgroundColor?: keyof typeof COLORS | string;
  disabled?: boolean;
  style?: any;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  padding = 'md',
  margin,
  backgroundColor = 'backgroundSecondary',
  disabled = false,
  style,
}) => {
  const getCardStyle = () => {
    const baseStyle = [
      styles.card,
      { padding: SPACING[padding] },
      margin && { margin: SPACING[margin] },
    ];

    switch (variant) {
      case 'elevated':
        return [...baseStyle, styles.elevated];
      case 'outlined':
        return [...baseStyle, styles.outlined];
      default:
        return [...baseStyle, styles.default];
    }
  };

  const getBackgroundColor = () => {
    if (typeof backgroundColor === 'string' && backgroundColor in COLORS) {
      const colorValue = COLORS[backgroundColor as keyof typeof COLORS];
      if (typeof colorValue === 'object') {
        return colorValue[500] || colorValue[400] || Object.values(colorValue)[0];
      }
      return colorValue;
    }
    return backgroundColor as string;
  };

  const cardStyle = [
    ...getCardStyle(),
    { backgroundColor: getBackgroundColor() },
    disabled && styles.disabled,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
  },
  default: {
    ...SHADOWS.sm,
  },
  elevated: {
    ...SHADOWS.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Card;
