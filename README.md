# SahilCNC App

A React Native Expo app with React Native Animated and consistent theme constants for colors and font sizes.

## Features

- **React Native Expo** - Cross-platform mobile development
- **Expo Router** - File-based navigation system
- **React Native Reanimated** - High-performance animations
- **Consistent Theme System** - Centralized colors, fonts, and spacing
- **TypeScript** - Type-safe development
- **Modern UI Components** - Beautiful and responsive design
- **Haptic Feedback** - Tactile feedback for better UX
- **Gradient Buttons** - Beautiful gradient backgrounds
- **Vector Icons** - Scalable icons from Expo Vector Icons
- **Gesture Handling** - Enhanced touch interactions
- **GraphQL Integration** - Complete GraphQL setup for Strapi CMS

## Project Structure

```
SahilCNCApp/
├── app/                  # Expo Router pages
│   ├── _layout.tsx       # Root layout with navigation
│   ├── index.tsx         # Home page
│   ├── about.tsx         # About page
│   ├── profile.tsx       # Profile page
│   └── settings.tsx      # Settings page
├── constants/
│   ├── theme.ts          # Theme constants (colors, fonts, spacing)
│   └── index.ts          # Export all constants
├── components/
│   ├── ui/               # UI Components
│   │   ├── AnimatedButton.tsx # Reusable animated button component
│   │   ├── ResponsiveText.tsx # Responsive text component
│   │   ├── Card.tsx      # Reusable card component
│   │   └── index.ts      # UI component exports
│   ├── layout/           # Layout Components
│   │   ├── SafeAreaContainer.tsx # Safe area and status bar management
│   │   ├── PageContainer.tsx # Page layout container
│   │   └── index.ts      # Layout component exports
│   ├── global/           # Global Components
│   │   ├── GraphQLDemo.tsx # GraphQL demo component
│   │   ├── LoadingSpinner.tsx # Global loading component
│   │   ├── ErrorBoundary.tsx # Error boundary component
│   │   └── index.ts      # Global component exports
│   └── index.ts          # Main component exports
├── graphql/
│   ├── client/
│   │   └── apollo-client.ts # Apollo Client configuration
│   ├── types/
│   │   └── generated.ts # TypeScript types for GraphQL
│   ├── queries/
│   │   ├── posts.ts # Post-related queries
│   │   ├── categories.ts # Category-related queries
│   │   ├── pages.ts # Page-related queries
│   │   └── index.ts # Query exports
│   ├── fragments/
│   │   └── common.ts # Reusable GraphQL fragments
│   ├── config.ts # GraphQL configuration
│   └── index.ts # Main GraphQL exports
├── hooks/
│   └── useGraphQL.ts # Custom GraphQL hooks
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Theme Constants

The app uses a comprehensive theme system located in `constants/theme.ts`:

### Colors
- **Primary Colors**: Blue theme with light/dark variants
- **Secondary Colors**: Purple theme for accents
- **Semantic Colors**: Success, warning, error, info
- **Neutral Colors**: Gray scale for text and backgrounds
- **Text Colors**: Primary, secondary, tertiary text colors

### Typography
- **Display**: Large, medium, small display text
- **Headlines**: Large, medium, small headlines
- **Titles**: Large, medium, small titles
- **Body**: Large, medium, small body text
- **Labels**: Large, medium, small labels
- **Captions**: Caption and overline text

### Spacing & Layout
- **Spacing**: XS, SM, MD, LG, XL, XXL, XXXL
- **Border Radius**: None, SM, MD, LG, XL, XXL, Full
- **Shadows**: SM, MD, LG, XL shadow presets

### Animation
- **Duration**: Fast, normal, slow, very slow
- **Easing**: Ease, ease-in, ease-out, ease-in-out

## Usage Examples

### Using Colors
```typescript
import { COLORS } from './constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  text: {
    color: COLORS.textPrimary,
  },
});
```

### Using Typography
```typescript
import { TYPOGRAPHY } from './constants';

const styles = StyleSheet.create({
  title: {
    ...TYPOGRAPHY.headlineLarge,
    color: COLORS.textPrimary,
  },
  body: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
  },
});
```

### Using Spacing
```typescript
import { SPACING } from './constants';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
});
```

### Using Animations
```typescript
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const handlePress = () => {
  scale.value = withSpring(1.2);
};
```

### Using Navigation
```typescript
import { Link } from 'expo-router';

// Navigate to a page
<Link href="/about" asChild>
  <AnimatedButton title="About" onPress={() => {}} />
</Link>

// Navigate programmatically
import { router } from 'expo-router';

const handleNavigation = () => {
  router.push('/profile');
};
```

### Using Responsive Text
```typescript
import { ResponsiveText } from './components';

// Basic usage with size and color
<ResponsiveText size="headlineLarge" color="textPrimary">
  This text scales automatically
</ResponsiveText>

// With custom weight and line height
<ResponsiveText 
  size="bodyLarge" 
  color="textSecondary" 
  weight="medium"
  lineHeight="relaxed"
>
  Responsive text with custom styling
</ResponsiveText>

// Disable responsive scaling
<ResponsiveText size="caption" color="textTertiary" responsive={false}>
  Fixed size text
</ResponsiveText>
```

### Using Safe Area Container
```typescript
import { SafeAreaContainer } from './components';

// Basic usage with theme colors
<SafeAreaContainer backgroundColor="background" statusBarStyle="dark-content">
  <YourContent />
</SafeAreaContainer>

// Custom status bar styling
<SafeAreaContainer 
  backgroundColor="primary" 
  statusBarStyle="light-content"
  statusBarBackgroundColor="primaryDark"
>
  <YourContent />
</SafeAreaContainer>

// Control specific edges
<SafeAreaContainer 
  backgroundColor="background"
  edges={['top', 'bottom']}
>
  <YourContent />
</SafeAreaContainer>
```

### Using Page Container
```typescript
import { PageContainer } from './components';

// Basic page with title
<PageContainer title="My Page" subtitle="Page description">
  <YourContent />
</PageContainer>

// Page with pull-to-refresh
<PageContainer 
  title="Posts" 
  refreshing={loading} 
  onRefresh={refetch}
>
  <YourContent />
</PageContainer>

// Custom styling
<PageContainer 
  title="Profile"
  backgroundColor="primary"
  statusBarStyle="light-content"
  padding="xl"
>
  <YourContent />
</PageContainer>
```

### Using Card Component
```typescript
import { Card } from './components';

// Basic card
<Card>
  <Text>Card content</Text>
</Card>

// Elevated card with custom styling
<Card variant="elevated" padding="lg" backgroundColor="backgroundSecondary">
  <Text>Elevated card</Text>
</Card>

// Clickable card
<Card onPress={() => console.log('Card pressed')} variant="outlined">
  <Text>Clickable card</Text>
</Card>
```

### Using Loading Spinner
```typescript
import { LoadingSpinner } from './components';

// Basic loading
<LoadingSpinner />

// Custom loading with text
<LoadingSpinner 
  size="large" 
  text="Loading posts..." 
  color={COLORS.primary}
/>

// Full screen loading
<LoadingSpinner 
  fullScreen={true} 
  text="Please wait..." 
/>
```

### Using Error Boundary
```typescript
import { ErrorBoundary } from './components';

// Wrap your app or components
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>

// Custom fallback
<ErrorBoundary 
  fallback={<CustomErrorComponent />}
>
  <YourComponent />
</ErrorBoundary>
```

### Using Vector Icons
```typescript
import { Ionicons } from '@expo/vector-icons';

// Basic icon usage
<Ionicons name="home" size={24} color={COLORS.primary} />

// Different icon sets available
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

<MaterialIcons name="favorite" size={24} color={COLORS.error} />
<FontAwesome name="star" size={24} color={COLORS.warning} />
<AntDesign name="user" size={24} color={COLORS.secondary} />
```

### Using Haptic Feedback
```typescript
import * as Haptics from 'expo-haptics';

// Light impact (buttons, toggles)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium impact (sliders, switches)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Heavy impact (success, errors)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

// Success notification
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

### Using GraphQL with Strapi CMS
```typescript
import { usePosts, useCategories, useGraphQLError } from './hooks/useGraphQL';

// Fetch posts with pagination
const { data, loading, error } = usePosts({
  pagination: { page: 1, pageSize: 10 },
  sort: ['publishedAt:desc'],
});

// Fetch categories
const { data: categoriesData } = useCategories({
  pagination: { page: 1, pageSize: 5 },
});

// Error handling
const errorInfo = useGraphQLError(error);

// Access data
const posts = data?.posts?.data || [];
const categories = categoriesData?.categories?.data || [];
```

### GraphQL Configuration
```typescript
// Update your Strapi URL in graphql/config.ts
export const GRAPHQL_CONFIG = {
  STRAPI_URL: 'https://your-strapi-cms.com/graphql',
  // ... other settings
};

// Or use environment variable
// EXPO_PUBLIC_STRAPI_URL=https://your-strapi-cms.com/graphql
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SahilCNCApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Fix Expo compatibility issues (if any)**
   ```bash
   npx expo install --fix
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser

## Navigation Features

The app uses Expo Router for file-based navigation:

1. **File-based Routing** - Pages are automatically routed based on file structure
2. **Stack Navigation** - Native stack navigation with headers
3. **Deep Linking** - Support for deep links and URL-based navigation
4. **Type-safe Navigation** - TypeScript support for navigation parameters
5. **Automatic Code Splitting** - Pages are loaded on demand

## Safe Area Features

The app includes a comprehensive SafeAreaContainer that handles:

1. **Status Bar Management** - Controls status bar color and content style
2. **Safe Area Insets** - Automatically applies padding for notches and system UI
3. **Platform Consistency** - Works seamlessly across iOS and Android
4. **Theme Integration** - Uses your existing color constants
5. **Flexible Configuration** - Control which edges to apply safe area padding

## Component Organization

The app uses a well-organized component structure:

### **UI Components** (`components/ui/`)
- **AnimatedButton** - Reusable animated button with haptic feedback
- **ResponsiveText** - Auto-scaling text component
- **Card** - Flexible card component with multiple variants

### **Layout Components** (`components/layout/`)
- **SafeAreaContainer** - Safe area and status bar management
- **PageContainer** - Consistent page layouts with headers

### **Global Components** (`components/global/`)
- **GraphQLDemo** - Demo component for GraphQL functionality
- **LoadingSpinner** - Global loading component
- **ErrorBoundary** - Error handling component

### **Importing Components**
```typescript
// Import specific categories
import { AnimatedButton, ResponsiveText } from './components/ui';
import { SafeAreaContainer, PageContainer } from './components/layout';
import { LoadingSpinner, ErrorBoundary } from './components/global';

// Or import all components
import { AnimatedButton, PageContainer, LoadingSpinner } from './components';
```

## Enhanced UI Features

The app includes several enhanced UI components and interactions:

### Haptic Feedback
- **Light Impact** - Used for button presses and toggles
- **Medium Impact** - Used for sliders and switches  
- **Heavy Impact** - Used for success/error states
- **Notifications** - Success, warning, and error feedback

### Gradient Buttons
- **Primary Gradient** - Blue gradient from primary to primaryDark
- **Secondary Gradient** - Purple gradient from secondary to secondaryDark
- **Outline Style** - Clean outline buttons for secondary actions
- **Haptic Integration** - Tactile feedback on all button presses

### Vector Icons
- **Multiple Icon Sets** - Ionicons, MaterialIcons, FontAwesome, AntDesign
- **Scalable** - Vector-based icons that scale perfectly
- **Theme Integration** - Icons use your color constants
- **Consistent Sizing** - Standardized icon sizes across the app

### Gesture Handling
- **Enhanced Touch** - Better gesture recognition and handling
- **Reanimated Integration** - Works seamlessly with animations
- **Platform Optimized** - Native gesture handling on iOS and Android

### GraphQL Integration
- **Apollo Client** - Full-featured GraphQL client
- **Type Safety** - Generated TypeScript types for all queries
- **Error Handling** - Comprehensive error handling and retry logic
- **Caching** - Intelligent caching with Apollo Client
- **Custom Hooks** - Reusable hooks for all data fetching
- **Strapi Integration** - Optimized for Strapi CMS GraphQL API

## Responsive Text Features

The app includes a smart ResponsiveText component that automatically adjusts:

1. **Device Detection** - Automatically detects phones, tablets, and screen sizes
2. **Platform Optimization** - Different scaling for iOS and Android
3. **Accessibility Support** - Respects system font scale settings
4. **Orientation Handling** - Adapts to landscape and portrait modes
5. **Smart Bounds** - Prevents text from becoming too small or too large

## Animation Features

The app demonstrates several animation techniques:

1. **Scale Animation** - Card scales up and down on press
2. **Rotation Animation** - Card rotates 360 degrees
3. **Opacity Animation** - Card fades in and out
4. **Spring Animations** - Natural, bouncy animations
5. **Timing Animations** - Precise duration-based animations

## Theme Customization

To customize the theme:

1. Edit `constants/theme.ts`
2. Update colors, fonts, or spacing values
3. Changes will be reflected throughout the app
4. Use TypeScript for type safety

## Best Practices

1. **Always use theme constants** instead of hardcoded values
2. **Import specific constants** you need rather than the entire theme
3. **Use typography presets** for consistent text styling
4. **Leverage spacing constants** for consistent layouts
5. **Use semantic colors** for better accessibility
6. **Avoid `--legacy-peer-deps`** - Fix dependency conflicts properly
7. **Use `npx expo install --fix`** to resolve Expo compatibility issues
8. **Keep dependencies up to date** for production stability

## Contributing

1. Follow the existing code style
2. Use theme constants for all styling
3. Add TypeScript types for new components
4. Test animations on both iOS and Android

## License

This project is licensed under the MIT License.
