import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import { useLegacyOfInnovation } from '../../hooks/useGraphQL';

interface MetricCardProps {
  number: string;
  label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ number, label }) => {
  return (
    <View style={styles.metricCard}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <ResponsiveText 
          size="titleMedium" 
          color="textInverse" 
          weight="bold" 
          style={styles.number}
        >
          {number}
        </ResponsiveText>
        <ResponsiveText 
          size="bodySmall" 
          color="textInverse" 
          weight="medium" 
          style={styles.label}
        >
          {label}
        </ResponsiveText>
      </LinearGradient>
    </View>
  );
};

const LegacyOfInnovationSection: React.FC = () => {
  // Fetch data from CMS
  const { legacyData, loading, error } = useLegacyOfInnovation();

  // Show loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ResponsiveText size="bodyMedium" color="textSecondary">
            Loading...
          </ResponsiveText>
        </View>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <ResponsiveText size="bodyMedium" color="error">
            Unable to load content
          </ResponsiveText>
        </View>
      </View>
    );
  }

  // Use CMS data if available, otherwise show fallback
  const displayData = legacyData || {
    Title: "Discover the legacy of innovation at",
    HighlightedText: "Sahil Machines",
    Stats: [
      { Number: "60+", Info: "Years of Legacy" },
      { Number: "20+", Info: "Countries Served" },
      { Number: "5000+", Info: "Machine Installations" }
    ]
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <ResponsiveText size="titleMedium" color="textPrimary" weight="bold" style={styles.title}>
          {displayData.Title}
          <ResponsiveText size="titleMedium" color="primary" weight="bold">
            {' '}{displayData.HighlightedText}
          </ResponsiveText>
        </ResponsiveText>
      </View>

      {/* Description Text */}
      <View style={styles.descriptionContainer}>
        <ResponsiveText size="bodySmall" color="textSecondary" style={styles.description}>
          Driven by a vision to transform the company into a temple of technology through teamwork, Sahil Alloys & Machine Tools has continually evolved. Continuous process improvement and the adoption of cutting-edge technology have led Sahil Alloys & Machine Tools to become one of the world's leading manufacturers of CNC machines, with a significant market share both in India and globally.
        </ResponsiveText>
      </View>

      {/* Metric Cards */}
      <View style={styles.metricsContainer}>
        {displayData.Stats.map((stat: any, index: number) => (
          <MetricCard
            key={stat.id || index}
            number={stat.Number}
            label={stat.Info}
          />
        ))}
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    textAlign: 'center',
    lineHeight: 28,
  },
  descriptionContainer: {
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  metricCard: {
    flex: 1,
    height: 120,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  gradientBackground: {
    flex: 1,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
});

export default LegacyOfInnovationSection;
