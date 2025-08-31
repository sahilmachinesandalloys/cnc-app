import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface MetricCardProps {
  number: string;
  label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ number, label }) => {
  // Use smaller text for the third card (5000+ Satisfied Customers)
  const isThirdCard = label === 'Satisfied Customers';
  
  return (
    <View style={styles.metricCard}>
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <ResponsiveText 
          size={isThirdCard ? "headlineMedium" : "headlineLarge"} 
          color="textInverse" 
          weight="bold" 
          style={styles.number}
        >
          {number}
        </ResponsiveText>
        <ResponsiveText 
          size={isThirdCard ? "bodySmall" : "bodyMedium"} 
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
  const metrics = [
    { number: '60+', label: 'CNC Machines' },
    { number: '20+', label: 'Years Experience' },
    { number: '5000+', label: 'Satisfied Customers' },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <ResponsiveText size="headlineMedium" color="textPrimary" weight="bold" style={styles.title}>
          Legacy of Innovation
        </ResponsiveText>
        <ResponsiveText size="bodyMedium" color="textSecondary" style={styles.subtitle}>
          Trusted by thousands worldwide
        </ResponsiveText>
      </View>

      {/* Metric Cards */}
      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            number={metric.number}
            label={metric.label}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm, // Reduced gap
    paddingBottom: SPACING.sm, // Reduced gap
    backgroundColor: '#fff', // Light gray background to match Featured Products
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md, // Increased gap
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.sm, // Increased gap
  },
  subtitle: {
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm, // Increased gap
  },
  metricCard: {
    flex: 1,
    height: 120, // Increased height for better appearance
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradientBackground: {
    flex: 1, // Take full height of parent
    padding: SPACING.md, // Increased padding
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    textAlign: 'center',
    marginBottom: SPACING.sm, // Increased margin
  },
  label: {
    textAlign: 'center',
  },
});

export default LegacyOfInnovationSection;
