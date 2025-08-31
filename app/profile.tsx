import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { AnimatedButton } from '../components';

export default function ProfilePage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SA</Text>
          </View>
          <Text style={styles.name}>Sahil Ahmed</Text>
          <Text style={styles.title}>Mobile Developer</Text>
        </View>

        {/* Profile Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Success</Text>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsGrid}>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>React Native</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>TypeScript</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Expo</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>JavaScript</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Node.js</Text>
            </View>
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>Firebase</Text>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactList}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>sahil@example.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone:</Text>
              <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Location:</Text>
              <Text style={styles.contactValue}>New York, NY</Text>
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.navigationSection}>
          <Link href="/" asChild>
            <AnimatedButton
              title="Back to Home"
              onPress={() => {}}
              variant="primary"
              size="medium"
            />
          </Link>
          <Link href="/settings" asChild>
            <AnimatedButton
              title="Settings"
              onPress={() => {}}
              variant="outline"
              size="medium"
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  avatarText: {
    ...TYPOGRAPHY.headlineLarge,
    color: COLORS.textInverse,
    fontWeight: 'bold',
  },
  name: {
    ...TYPOGRAPHY.headlineMedium,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.xl,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    minWidth: 80,
    ...SHADOWS.sm,
  },
  statNumber: {
    ...TYPOGRAPHY.headlineSmall,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.titleLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  skillTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  skillText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.primary,
    fontWeight: '500',
  },
  contactList: {
    gap: SPACING.md,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  contactLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  contactValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
  },
  navigationSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.xl,
  },
});
