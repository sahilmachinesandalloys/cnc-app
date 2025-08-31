import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS, TYPOGRAPHY } from '../constants';
import { AnimatedButton } from '../components';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Profile</Text>
              <Text style={styles.settingDescription}>Manage your profile information</Text>
            </View>
            <Link href="/profile" asChild>
              <AnimatedButton
                title="View"
                onPress={() => {}}
                variant="outline"
                size="small"
              />
            </Link>
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Privacy</Text>
              <Text style={styles.settingDescription}>Control your privacy settings</Text>
            </View>
            <AnimatedButton
              title="Edit"
              onPress={() => {}}
              variant="outline"
              size="small"
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDescription}>Receive push notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Use dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Biometric Login</Text>
              <Text style={styles.settingDescription}>Use fingerprint or face ID</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Save</Text>
              <Text style={styles.settingDescription}>Automatically save your work</Text>
            </View>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: COLORS.gray[300], true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Help Center</Text>
              <Text style={styles.settingDescription}>Get help and support</Text>
            </View>
            <AnimatedButton
              title="Open"
              onPress={() => {}}
              variant="outline"
              size="small"
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>About</Text>
              <Text style={styles.settingDescription}>App information and version</Text>
            </View>
            <Link href="/about" asChild>
              <AnimatedButton
                title="View"
                onPress={() => {}}
                variant="outline"
                size="small"
              />
            </Link>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appBuild}>Build 2024.1</Text>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: BORDER_RADIUS.lg,
  },
  appVersion: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  appBuild: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  navigationSection: {
    alignItems: 'center',
  },
});
