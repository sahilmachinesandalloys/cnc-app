import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor
} from 'react-native-reanimated';
import { 
  Header, 
  HeroSection, 
  ServicesSection, 
  FeaturedProductsSection, 
  FAQSection, 
  ReadyToStartSection,
  LegacyOfInnovationSection
} from '../components';

export const HEADER_MAX_HEIGHT = 120;

export default function HomePage() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // Slide header up a little bit
  const headerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, -10],
      Extrapolate.CLAMP
    );
    const paddingTop = interpolate(
      scrollY.value,
      [0, 120],
      [20, 30],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
      paddingTop,
    };
  });

  const bgAndShadowStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      scrollY.value,
      [0, 50],
      [0, 0.2],
      Extrapolate.CLAMP
    );
  
    const elevation = interpolate(
      scrollY.value,
      [0, 50],
      [0, 4],
      Extrapolate.CLAMP
    );
  
    return {
      backgroundColor: '#fff',
      shadowOpacity,
      elevation: Math.round(elevation), // Android only
    };
  });

  const handleMenuPress = () => {
    // This will be handled by the parent layout
    console.log('Menu pressed - should open drawer');
  };

  const handleBookNowPress = () => {
    console.log('Book Now pressed');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar
        translucent
        backgroundColor={Platform.OS === "android" ? "rgba(0,0,0,0.6)" : "transparent"}
        barStyle="light-content"
      />

      {/* Animated Header */}
      <Animated.View style={[styles.header, headerStyle, bgAndShadowStyle]}>
        <View style={{ flex: 1, justifyContent: "center" }}>
         
        <Header onMenuPress={handleMenuPress} />
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <MainContent 
        scrollHandler={scrollHandler} 
        onBookNowPress={handleBookNowPress} 
      />
    </View>
  );
}

interface MainContentProps {
  scrollHandler: (event: any) => void;
  onBookNowPress: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ scrollHandler, onBookNowPress }) => {
  return (
    <Animated.ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollableContainer}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <HeroSection onBookNowPress={onBookNowPress} />
      <ServicesSection />
      <FeaturedProductsSection />
      <LegacyOfInnovationSection />
      <FAQSection />
      <ReadyToStartSection />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContainer: {
    paddingTop: HEADER_MAX_HEIGHT, // Push content below header
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    backgroundColor: "#fff",
    height: HEADER_MAX_HEIGHT,
    zIndex: 10,
    paddingTop: 30,
      // ✅ static shadow
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  },
});
