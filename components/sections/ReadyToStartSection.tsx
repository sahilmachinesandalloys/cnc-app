import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

const ReadyToStartSection: React.FC = () => {
  const handleGetQuotePress = () => {
    console.log('Get Quote Now pressed');
    // TODO: Navigate to quote form or call
  };

  const handleEmailPress = () => {
    console.log('Email pressed');
    // TODO: Open email client
  };

  const handleVisitPress = () => {
    console.log('Visit pressed');
    // TODO: Navigate to location/map
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ResponsiveText size="titleMedium" color="textPrimary" weight="bold" style={styles.title}>
          Ready to Get Started?
        </ResponsiveText>
        
        <ResponsiveText size="bodySmall" color="textSecondary" style={styles.description}>
          Contact us today to discuss your CNC machining requirements and discover how we can help.
        </ResponsiveText>
        
        <View style={styles.buttonContainer}>
          {/* Primary CTA Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetQuotePress}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Ionicons name="call" size={16} color={COLORS.white} style={styles.buttonIcon} />
              <ResponsiveText size="bodySmall" color="textInverse" weight="bold">
                Get Quote Now
              </ResponsiveText>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Secondary Buttons Row */}
          <View style={styles.secondaryButtonsRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleEmailPress}>
              <Ionicons name="mail" size={16} color={COLORS.gray[600]} style={styles.buttonIcon} />
              <ResponsiveText size="caption" color="textPrimary" weight="medium">
                Email
              </ResponsiveText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={handleVisitPress}>
              <Ionicons name="location" size={16} color={COLORS.gray[600]} style={styles.buttonIcon} />
              <ResponsiveText size="caption" color="textPrimary" weight="medium">
                Visit
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  title: {
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 18,
  },
  buttonContainer: {
    width: '100%',
    gap: SPACING.md,
  },
  primaryButton: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  secondaryButtonsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  buttonIcon: {
    marginRight: SPACING.xs,
  },
});

export default ReadyToStartSection;
