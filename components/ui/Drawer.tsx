import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ResponsiveText from "./ResponsiveText";
import { COLORS, SPACING, BORDER_RADIUS } from "../../constants";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLink {
  href: string;
  name: string;
  submenu?: { href: string; name: string }[];
}

const navLinks: NavLink[] = [
  {
    href: "/industries",
    name: "INDUSTRIES",
    submenu: [
      {
        href: "/industries/services",
        name: "Services",
      },
      {
        href: "/industries/workpiece-by-industry",
        name: "Industries we cater to",
      },
      {
        href: "/accuracy-cube",
        name: "Accuracy Cube",
      },
      {
        href: "/accessories",
        name: "Accessories",
      },
    ],
  },
  {
    href: "/resources",
    name: "RESOURCES",
    submenu: [
      { href: "/events", name: "Events" },
      { href: "/blogs/1", name: "Blogs" },
      { href: "/case-studies", name: "Case Studies" },
      { href: "/guides", name: "Guides" },
      { href: "/whitepaper", name: "Whitepaper" },
      { href: "/technical-press-news", name: "Technical Press News" },
      { href: "/faqs", name: "FAQs" },
    ],
  },
  {
    href: "/about",
    name: "ABOUT US",
    submenu: [
      {
        href: "/about",
        name: "Our Vision",
      },
      {
        href: "/about/social-responsibility",
        name: "Corporate social responsibility",
      },
      {
        href: "/about/managements",
        name: "Managements",
      },
      {
        href: "/about/message-from-cmd",
        name: "Message From CMD",
      },
      {
        href: "/about/quality-standards-and-infrastructure",
        name: "Quality Standards & Infrastructure",
      },
    ],
  },
  { href: "/sales-and-services", name: "SALES & SERVICES" },
  { href: "/contact-us", name: "CONTACT US" },
];

const { width: screenWidth } = Dimensions.get("window");
const DRAWER_WIDTH = screenWidth * 0.8;

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const translateX = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const handleLinkPress = (href: string) => {
    const fullUrl = `https://www.sahilcnc.com${href}`;
    Linking.openURL(fullUrl);
    onClose();
  };

  const getIconForItem = (name: string) => {
    switch (name) {
      case "INDUSTRIES":
        return "business-outline";
      case "RESOURCES":
        return "library-outline";
      case "ABOUT US":
        return "people-outline";
      case "SALES & SERVICES":
        return "construct-outline";
      case "CONTACT US":
        return "call-outline";
      default:
        return "cube-outline";
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
            },
          ]}
        >
          <TouchableOpacity style={styles.overlayTouch} onPress={onClose} />
        </Animated.View>
      )}

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {/* Header */}
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          style={styles.drawerHeader}
        >
          <View style={styles.headerContent}>
            <ResponsiveText
              size="headlineMedium"
              color="textInverse"
              weight="bold"
            >
              Sahil Machines
            </ResponsiveText>
            <ResponsiveText size="bodyMedium" color="textInverse">
              CNC Solutions
            </ResponsiveText>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer}>
          {navLinks.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  if (item.submenu) {
                    toggleExpanded(item.name);
                  } else {
                    handleLinkPress(item.href);
                  }
                }}
              >
                <View style={styles.menuItemContent}>
                  <Ionicons
                    name={getIconForItem(item.name) as any}
                    size={24}
                    color={COLORS.textPrimary}
                  />
                  <ResponsiveText
                    size="bodyMedium"
                    color="textPrimary"
                    weight="medium"
                  >
                    {item.name}
                  </ResponsiveText>
                </View>
                {item.submenu ? (
                  <Ionicons
                    name={
                      expandedItems.has(item.name)
                        ? "chevron-down"
                        : "chevron-forward"
                    }
                    size={20}
                    color={COLORS.textSecondary}
                  />
                ) : (
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                )}
              </TouchableOpacity>

              {/* Submenu */}
              {item.submenu && expandedItems.has(item.name) && (
                <View style={styles.submenuContainer}>
                  {item.submenu.map((subItem, subIndex) => (
                    <TouchableOpacity
                      key={subIndex}
                      style={styles.submenuItem}
                      onPress={() => handleLinkPress(subItem.href)}
                    >
                      <ResponsiveText
                        size="bodySmall"
                        color="textSecondary"
                        weight="medium"
                      >
                        {subItem.name}
                      </ResponsiveText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => Linking.openURL("tel:+918427641925")}
          >
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              style={styles.footerGradient}
            >
              <Ionicons name="call-outline" size={20} color="white" />
              <ResponsiveText
                size="bodyMedium"
                color="textInverse"
                weight="medium"
              >
                Call Now
              </ResponsiveText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 1000,
  },
  overlayTouch: {
    flex: 1,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "white",
    zIndex: 1001,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  drawerHeader: {
    paddingTop: 60, // Account for status bar
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
  },
  headerContent: {
    marginBottom: SPACING.md,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: SPACING.md,
    padding: SPACING.xs,
  },
  menuContainer: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  drawerFooter: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  footerButton: {
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
  },
  footerGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
  submenuContainer: {
    backgroundColor: COLORS.gray[50],
    paddingLeft: SPACING.xl,
  },
  submenuItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
});

export default Drawer;
