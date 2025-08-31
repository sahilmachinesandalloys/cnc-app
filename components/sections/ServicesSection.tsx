import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import { useServices } from '../../hooks/useGraphQL';
import ServicesSectionSkeleton from '../ui/ServicesSectionSkeleton';

interface ServiceCardProps {
  icon: string;
  iconUrl?: string;
  title: string;
  gradientColors: readonly [string, string];
  onPress: () => void;
}

interface ServiceData {
  id: string;
  title: string;
  icon: string;
  slug: string;
  iconUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, iconUrl, title, gradientColors, onPress }) => {
  console.log('ServiceCard render - icon:', icon, 'iconUrl:', iconUrl, 'title:', title);
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
          {iconUrl ? (
            <Image 
              source={{ uri: iconUrl }} 
              style={styles.iconImage}
              resizeMode="contain"
            />
          ) : (
            <Ionicons name={icon as any} size={28} color={COLORS.white} />
          )}
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
  // Fetch services from CMS
  const { services, loading, error } = useServices();

  // Fallback services if CMS data is not available
  const fallbackServices: ServiceData[] = [
    
  ];



  const handleServicePress = async (service: ServiceData) => {
    try {
      // Construct the service URL using the correct format
      const serviceUrl = `https://www.sahilcnc.com/industries/services/${service.slug}`;
      
      // Check if the URL can be opened
      const canOpen = await Linking.canOpenURL(serviceUrl);
      
      if (canOpen) {
        await Linking.openURL(serviceUrl);
      } else {
        console.log('Cannot open URL:', serviceUrl);
        // Fallback: open main website
        await Linking.openURL('https://www.sahilcnc.com');
      }
    } catch (error) {
      console.error('Error opening service URL:', error);
      // Fallback: open main website
      try {
        await Linking.openURL('https://www.sahilcnc.com');
      } catch (fallbackError) {
        console.error('Error opening fallback URL:', fallbackError);
      }
    }
  };

  // Show skeleton loading state while loading
  if (loading) {
    return <ServicesSectionSkeleton />;
  }

  // Show error state only if there's an error and no data
  if (error && services.length === 0) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="alert-circle" size={48} color={COLORS.error} />
        <ResponsiveText size="bodyMedium" color="textSecondary" style={styles.errorText}>
          Unable to load services
        </ResponsiveText>
      </View>
    );
  }

  // Determine which services to display
  const displayServices: ServiceData[] = services.length > 0 ? services : fallbackServices;
  console.log('Display services:', displayServices, "services", services, services.length, "loading:", loading);

  return (
    <View style={styles.container}>
      {/* Services ScrollView */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayServices.map((service: ServiceData) => (
          <ServiceCard
            key={service.id}
            icon={service.icon}
            iconUrl={service.iconUrl}
            title={service.title}
            gradientColors={['#FF8A00', '#FF3D00'] as const} // Fixed gradient for all services
            onPress={() => handleServicePress(service)}
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
  iconImage: {
    width: 28,
    height: 28,
  },
  title: {
    textAlign: 'center', // Ensure text is centered
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  errorText: {
    marginTop: SPACING.sm,
  },
});

export default ServicesSection;
