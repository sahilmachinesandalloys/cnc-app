import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';
import { useHeroSections } from '../../hooks/useGraphQL';
import HeroSectionSkeleton from '../ui/HeroSectionSkeleton';

interface HeroSectionProps {
  onBookNowPress?: () => void;
}

interface SlideData {
  id: string | number;
  title: string;
  subtitle: string;
}

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - (SPACING.md * 2); // Contained width with margins

const HeroSection: React.FC<HeroSectionProps> = ({ onBookNowPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Fetch hero sections from CMS
  const { heroSections, loading, error, isEmpty } = useHeroSections();

  // Fallback slides if CMS data is not available
  const fallbackSlides: SlideData[] = [
    {
      id: 1,
      title: "Get CNC Solutions",
      subtitle: "Need help with precision machining? Our experts are ready to assist.",
    },
    {
      id: 2,
      title: "Advanced Manufacturing",
      subtitle: "State-of-the-art CNC machines for precision engineering.",
    },
    {
      id: 3,
      title: "Quality Assurance",
      subtitle: "Every project meets the highest industry standards.",
    },
  ];

  // Use CMS data if available, otherwise use fallback
  const slides: SlideData[] = heroSections.length > 0 ? heroSections : fallbackSlides;
  
  // Debug: Log the number of slides and their content
  console.log('HeroSection - Number of slides:', slides.length);
  console.log('HeroSection - Slides data:', slides);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const slideWidth = cardWidth - (SPACING.lg * 2); // Account for padding
    const index = Math.round(contentOffset / slideWidth);
    
    // Ensure index is within bounds
    const clampedIndex = Math.max(0, Math.min(index, slides.length - 1));
    setCurrentIndex(clampedIndex);
    
    console.log('Scroll - contentOffset:', contentOffset, 'slideWidth:', slideWidth, 'calculated index:', index, 'clamped index:', clampedIndex);
  };

  const scrollToIndex = (index: number) => {
    const slideWidth = cardWidth - (SPACING.lg * 2); // Account for padding
    scrollViewRef.current?.scrollTo({
      x: index * slideWidth,
      animated: true,
    });
  };

  const handleExploreMorePress = async () => {
    try {
      const vtlUrl = 'https://www.sahilcnc.com/turning-machines/vtl/';
      
      // Check if the URL can be opened
      const canOpen = await Linking.canOpenURL(vtlUrl);
      
      if (canOpen) {
        await Linking.openURL(vtlUrl);
      } else {
        console.log('Cannot open URL:', vtlUrl);
        // Fallback: open main website
        await Linking.openURL('https://www.sahilcnc.com');
      }
    } catch (error) {
      console.error('Error opening VTL URL:', error);
      // Fallback: open main website
      try {
        await Linking.openURL('https://www.sahilcnc.com');
      } catch (fallbackError) {
        console.error('Error opening fallback URL:', fallbackError);
      }
    }
  };

  // Show skeleton loading state
  if (loading) {
    return <HeroSectionSkeleton />;
  }

  // Show error state
  if (error && isEmpty) {
    return (
      <View style={[styles.mainContainer, styles.errorContainer]}>
        <Ionicons name="alert-circle" size={48} color={COLORS.error} />
        <ResponsiveText size="bodyMedium" color="textSecondary" style={styles.errorText}>
          Unable to load hero content
        </ResponsiveText>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Single Card with Background Image */}
      <View style={styles.card}>
        {/* Background Image */}
        <Image
          source={require('../../assets/banner.png')}
          style={styles.cardBackgroundImage}
          resizeMode="cover"
        />
        
        {/* Overlay */}
        <View style={styles.overlay}>
          {/* Popular Tag */}
          <View style={styles.popularTag}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientTag}
            >
                             <ResponsiveText size="caption" color="textInverse" weight="medium" style={{ fontSize: 10 }}>
                 Popular
               </ResponsiveText>
            </LinearGradient>
          </View>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Sliding Text Content */}
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.textSlider}
            >
              {slides.map((slide, index) => (
                <View key={slide.id} style={styles.textSlide}>
                  <ResponsiveText size="titleMedium" color="textInverse" weight="bold" style={styles.title}>
                    {slide.title}
                  </ResponsiveText>
                  
                  <ResponsiveText size="caption" color="textInverse" style={styles.subtitle}>
                    {slide.subtitle}
                  </ResponsiveText>
                </View>
              ))}
            </ScrollView>

            {/* Static Explore More Button */}
            <TouchableOpacity style={styles.bookNowButton} onPress={handleExploreMorePress}>
              <LinearGradient
                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBookButton}
              >
                <ResponsiveText size="bodyMedium" color="textInverse" weight="bold">
                  Explore More
                </ResponsiveText>
              </LinearGradient>
            </TouchableOpacity>
          </View>



          {/* Pagination Dots - Inside the Card */}
          <View style={styles.pagination}>
            {slides.map((_, index) => {
              console.log('Rendering dot for index:', index, 'Total slides:', slides.length);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index && styles.activeDot
                  ]}
                  onPress={() => scrollToIndex(index)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: SPACING.md, // Increased from SPACING.sm to SPACING.md (8px + 8px = 16px)
    paddingHorizontal: SPACING.md,
  },
  card: {
    width: cardWidth,
    height: 280,
    borderRadius: BORDER_RADIUS.xl,
    position: 'relative',
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  cardBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  popularTag: {
    alignSelf: 'flex-start',
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  gradientTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  textSlider: {
    flex: 1,
  },
  textSlide: {
    width: cardWidth - (SPACING.lg * 2), // Account for padding
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  title: {
    marginBottom: 0,
    lineHeight: 20,
  },
  subtitle: {
    marginBottom: SPACING.lg,
    lineHeight: 20,
    opacity: 0.9,
  },
  bookNowButton: {
    borderRadius: BORDER_RADIUS.lg,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  gradientBookButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: SPACING.md,
  },
  industrialIcon: {
    position: 'absolute',
    bottom: SPACING.xl + 40, // Above pagination dots
    right: SPACING.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    position: 'absolute',
    bottom: SPACING.md,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    opacity: 1,
    width: 24,
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

export default HeroSection;
