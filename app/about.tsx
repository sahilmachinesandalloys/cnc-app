import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { AnimatedButton } from '../components';

export default function AboutPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>About SahilCNC App</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <Text style={styles.description}>
            This React Native Expo app demonstrates modern mobile development practices with:
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>React Native Expo for cross-platform development</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Expo Router for file-based navigation</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>React Native Reanimated for smooth animations</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>Consistent theme system with colors and typography</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>•</Text>
              <Text style={styles.featureText}>TypeScript for type safety</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology Stack</Text>
          <View style={styles.techGrid}>
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>React Native</Text>
              <Text style={styles.techDescription}>Cross-platform mobile development</Text>
            </View>
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>Expo</Text>
              <Text style={styles.techDescription}>Development platform and tools</Text>
            </View>
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>TypeScript</Text>
              <Text style={styles.techDescription}>Type-safe JavaScript</Text>
            </View>
            <View style={styles.techCard}>
              <Text style={styles.techTitle}>Reanimated</Text>
              <Text style={styles.techDescription}>High-performance animations</Text>
            </View>
          </View>
        </View>

        <View style={styles.navigationSection}>
          <Link href="/" asChild>
            <AnimatedButton
              title="Back to Home"
              onPress={() => {}}
              variant="primary"
              size="large"
            />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.headlineLarge,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  description: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 24,
  },
  featureList: {
    gap: SPACING.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  featureBullet: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  featureText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    flex: 1,
  },
  techGrid: {
    gap: SPACING.md,
  },
  techCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  techTitle: {
    ...TYPOGRAPHY.titleMedium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  techDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  navigationSection: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
});
