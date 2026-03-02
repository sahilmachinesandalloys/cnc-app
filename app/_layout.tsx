import { Stack } from "expo-router";
import { COLORS } from "../constants";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../graphql";
import { FloatingActionButton, Drawer, QuoteModal } from "../components/ui";
import { DrawerProvider, useDrawer } from "../contexts/DrawerContext";
import { loadFonts } from "../utils/fonts";
import { useEffect, useState, useCallback } from "react";
import { Linking, Alert } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import * as Font from "expo-font";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const [appIsReady, setAppIsReady] = useState(false);
  const [isQuoteModalVisible, setIsQuoteModalVisible] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await loadFonts();

        // Check if fonts are actually loaded
        const isFontLoaded = await Font.isLoaded("Montserrat-Regular");
        console.log("Montserrat fonts ready:", isFontLoaded);
      } catch (error) {
        console.error("Error loading fonts:", error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen once the app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const handleWhatsApp = async () => {
    const phoneNumber = "919815482343"; // WhatsApp number without +91
    const message =
      "Hello! I would like to know more about Sahil CNC machines.";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}/?text=${encodedMessage}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on this device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open WhatsApp");
    }
  };

  const handleCall = async () => {
    const phoneNumber = "+91 8427641925";
    const url = `tel:${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot make phone calls on this device");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to make phone call");
    }
  };

  const handleContactForm = () => {
    setIsQuoteModalVisible(true);
  };

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.textPrimary,
          headerTitleStyle: {
            fontWeight: "600",
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
        <Stack.Screen
          name="categories"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="subcategory"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="products"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="product-detail"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>

      {/* Floating Action Button - Available on all screens */}
      <FloatingActionButton
        onWhatsApp={handleWhatsApp}
        onCall={handleCall}
        onContactForm={handleContactForm}
      />

      {/* Quote Modal - Available on all screens */}
      <QuoteModal
        visible={isQuoteModalVisible}
        onClose={() => setIsQuoteModalVisible(false)}
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
