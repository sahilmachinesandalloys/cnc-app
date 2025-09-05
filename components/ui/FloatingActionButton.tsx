import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";

interface FloatingActionButtonProps {
  onWhatsApp?: () => void;
  onCall?: () => void;
  onContactForm?: () => void;
  customBottom?: number;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onWhatsApp,
  onCall,
  onContactForm,
  customBottom,
}) => {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const pathname = usePathname();

  // Move FAB up on product detail screen to avoid overlap with footer
  const isProductDetail = pathname === "/product-detail";
  const bottomPosition = isProductDetail ? 130 : customBottom || 40;

  const handleFabPress = () => {
    setIsFabOpen(!isFabOpen);
  };

  const handleWhatsApp = () => {
    onWhatsApp?.();
    setIsFabOpen(false);
  };

  const handleCall = () => {
    onCall?.();
    setIsFabOpen(false);
  };

  const handleContactForm = () => {
    onContactForm?.();
    setIsFabOpen(false);
  };

  return (
    <View style={[styles.fabContainer, { bottom: bottomPosition }]}>
      {/* FAB Options */}
      {isFabOpen && (
        <>
          <TouchableOpacity
            style={styles.fabOption}
            onPress={handleContactForm}
          >
            <LinearGradient
              colors={["#ff8a00", "#ff3d00"]}
              style={styles.fabOptionGradient}
            >
              <Ionicons name="mail-outline" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fabOption} onPress={handleCall}>
            <LinearGradient
              colors={["#ff8a00", "#ff3d00"]}
              style={styles.fabOptionGradient}
            >
              <Ionicons name="call-outline" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fabOption} onPress={handleWhatsApp}>
            <LinearGradient
              colors={["#ff8a00", "#ff3d00"]}
              style={styles.fabOptionGradient}
            >
              <Ionicons name="logo-whatsapp" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}

      {/* Main FAB Button */}
      <TouchableOpacity style={styles.fab} onPress={handleFabPress}>
        <LinearGradient
          colors={["#ff8a00", "#ff3d00"]}
          style={styles.fabGradient}
        >
          <Ionicons
            name={isFabOpen ? "close" : "add"}
            size={24}
            color="white"
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 40, // Moved up from 20
    right: 20,
    zIndex: 1000,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  fabOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  fabOptionGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingActionButton;
