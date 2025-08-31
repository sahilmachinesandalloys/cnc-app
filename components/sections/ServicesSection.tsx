import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface ServiceCardProps {
  icon: string;
  title: string;
  gradientColors: readonly [string, string];
  onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, gradientColors, onPress }) => {
  return (
    <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={28} color={COLORS.white} />
        </View>
        
        {/* Title */}
        <ResponsiveText size="bodySmall" color="textInverse" weight="bold" style={styles.title}>
          {title}
        </ResponsiveText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 1,
      icon: 'construct',
      title: 'Spare Parts',
      gradientColors: ['#FF8A00', '#FF3D00'] as const, // Same orange-red gradient
    },
    {
      id: 2,
      icon: 'settings',
      title: 'Laser Calibration',
      gradientColors: ['#FF8A00', '#FF3D00'] as const, // Same orange-red gradient
    },
    {
      id: 3,
      icon: 'school',
      title: 'CNC Training',
      gradientColors: ['#FF8A00', '#FF3D00'] as const, // Same orange-red gradient
    },
    {
      id: 4,
      icon: 'wifi',
      title: 'IoT Solutions',
      gradientColors: ['#FF8A00', '#FF3D00'] as const, // Same orange-red gradient
    },
    {
      id: 5,
      icon: 'cart',
      title: 'Maintenance',
      gradientColors: ['#FF8A00', '#FF3D00'] as const, // Same orange-red gradient
    },
  ];

  const handleServicePress = (serviceId: number) => {
    console.log('Service pressed:', serviceId);
    // TODO: Navigate to service details
  };

  return (
    <View style={styles.container}>
      {/* Services ScrollView */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            title={service.title}
            gradientColors={service.gradientColors}
            onPress={() => handleServicePress(service.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingTop: 0, // Removed top padding completely
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingRight: SPACING.md,
  },
  serviceCard: {
    width: 120,
    height: 120, // Reduced height since no KNOW MORE text
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.md,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center', // Horizontal centering
    justifyContent: 'center', // Vertical centering
    padding: SPACING.md,
  },
  iconContainer: {
    marginBottom: SPACING.md,
    alignItems: 'center', // Ensure icon is centered
  },
  title: {
    textAlign: 'center', // Ensure text is centered
  },
});

export default ServicesSection;
