import { Stack } from 'expo-router';
import { COLORS } from '../constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '../graphql';
import { FloatingActionButton, Drawer } from '../components/ui';
import { DrawerProvider, useDrawer } from '../contexts/DrawerContext';
import { loadFonts } from '../utils/fonts';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';

function AppContent() {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();
        
        // Check if fonts are actually loaded
        const isFontLoaded = await Font.isLoaded('Montserrat-Regular');
        console.log('Montserrat fonts ready:', isFontLoaded);
        
      } catch (error) {
        console.error('Error loading fonts:', error);
      } finally {
        setFontsLoaded(true);
      }
    };

    loadAppFonts();
  }, []);

  const handleWhatsApp = () => {
    console.log('WhatsApp pressed');
  };

  const handleCall = () => {
    console.log('Call pressed');
  };

  const handleContactForm = () => {
    console.log('Contact Form pressed');
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            headerLeft: () => null, // Remove default header
          }} 
        />
        <Stack.Screen name="about" options={{ title: 'About' }} />
        <Stack.Screen name="profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
      
      {/* Floating Action Button - Available on all screens */}
      <FloatingActionButton
        onWhatsApp={handleWhatsApp}
        onCall={handleCall}
        onContactForm={handleContactForm}
      />

      {/* Drawer - Available on all screens */}
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <ApolloProvider client={apolloClient}>
      <DrawerProvider>
        <AppContent />
      </DrawerProvider>
    </ApolloProvider>
  );
}
