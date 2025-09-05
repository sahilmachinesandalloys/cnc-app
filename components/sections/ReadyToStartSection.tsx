import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText, QuoteModal } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

const ReadyToStartSection: React.FC = () => {
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);

  const handleGetQuotePress = () => {
    setIsQuoteModalVisible(true);
  };

  const handleVisitPress = async () => {
    const url = 'https://www.sahilcnc.com/';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open website link');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open website');
    }
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
          
          {/* Secondary Button */}
          <TouchableOpacity style={styles.secondaryButton} onPress={handleVisitPress}>
            <Ionicons name="globe" size={16} color={COLORS.gray[600]} style={styles.buttonIcon} />
            <ResponsiveText size="caption" color="textPrimary" weight="medium">
              Visit Website
            </ResponsiveText>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Quote Modal */}
      <QuoteModal 
        visible={isQuoteModalVisible}
        onClose={() => setIsQuoteModalVisible(false)}
      />
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
    height: 48, // Fixed height for consistency
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    height: '100%', // Fill the parent height
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md, // Same padding as primary
    paddingHorizontal: SPACING.lg, // Same padding as primary
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    height: 48, // Same height as primary button
  },
  buttonIcon: {
    marginRight: SPACING.xs,
  },
});

export default ReadyToStartSection;
