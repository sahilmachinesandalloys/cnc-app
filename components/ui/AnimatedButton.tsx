import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    if (!disabled) {
      // Trigger haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primary];
      case 'secondary':
        return [...baseStyle, styles.secondary];
      case 'outline':
        return [...baseStyle, styles.outline];
      default:
        return [...baseStyle, styles.primary];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    
    switch (variant) {
      case 'outline':
        return [...baseStyle, styles.outlineText];
      default:
        return [...baseStyle, styles.primaryText];
    }
  };

  const renderButtonContent = () => {
    const buttonStyle = [
      ...getButtonStyle(),
      disabled && styles.disabled,
    ];
    
    const textStyle = [
      ...getTextStyle(),
      disabled && styles.disabledText,
    ];

    // Use gradient for primary and secondary variants
    if ((variant === 'primary' || variant === 'secondary') && !disabled) {
      const gradientColors = variant === 'primary' 
        ? [COLORS.primary, COLORS.primaryDark] as const
        : [COLORS.secondary, COLORS.secondaryDark] as const;
      
      return (
        <LinearGradient
          colors={gradientColors}
          style={buttonStyle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={textStyle}>{title}</Text>
        </LinearGradient>
      );
    }

    // Regular button for outline and disabled states
    return (
      <Text style={textStyle}>{title}</Text>
    );
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        style={[
          ...getButtonStyle(),
          disabled && styles.disabled,
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.sm,
  },
  // Size variants
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    minHeight: 44,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    minHeight: 52,
  },
  // Color variants
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    ...TYPOGRAPHY.labelMedium,
  },
  mediumText: {
    ...TYPOGRAPHY.labelLarge,
  },
  largeText: {
    ...TYPOGRAPHY.titleSmall,
  },
  primaryText: {
    color: COLORS.textInverse,
  },
  outlineText: {
    color: COLORS.primary,
  },
  // Disabled state
  disabled: {
    backgroundColor: COLORS.gray[300],
    borderColor: COLORS.gray[300],
    ...SHADOWS.none,
  },
  disabledText: {
    color: COLORS.gray[500],
  },
});

export default AnimatedButton;
