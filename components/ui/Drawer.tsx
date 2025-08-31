import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveText from './ResponsiveText';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const DRAWER_WIDTH = screenWidth * 0.8;

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const translateX = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

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

  const menuItems = [
    { icon: 'cube-outline', title: 'PRODUCTS', onPress: () => console.log('Products pressed') },
    { icon: 'business-outline', title: 'INDUSTRIES', onPress: () => console.log('Industries pressed') },
    { icon: 'library-outline', title: 'RESOURCES', onPress: () => console.log('Resources pressed') },
    { icon: 'people-outline', title: 'ABOUT US', onPress: () => console.log('About Us pressed') },
    { icon: 'construct-outline', title: 'SALES & SERVICES', onPress: () => console.log('Sales & Services pressed') },
    { icon: 'call-outline', title: 'CONTACT US', onPress: () => console.log('Contact Us pressed') },
  ];

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
            <ResponsiveText size="headlineMedium" color="textInverse" weight="bold">
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
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                item.onPress();
                onClose();
              }}
            >
              <View style={styles.menuItemContent}>
                <Ionicons name={item.icon as any} size={24} color={COLORS.textPrimary} />
                <ResponsiveText size="bodyMedium" color="textPrimary" weight="medium">
                  {item.title}
                </ResponsiveText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.drawerFooter}>
          <TouchableOpacity style={styles.footerButton}>
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              style={styles.footerGradient}
            >
              <Ionicons name="call-outline" size={20} color="white" />
              <ResponsiveText size="bodyMedium" color="textInverse" weight="medium">
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 1000,
  },
  overlayTouch: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1001,
    shadowColor: '#000',
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
    position: 'absolute',
    top: 60,
    right: SPACING.md,
    padding: SPACING.xs,
  },
  menuContainer: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  drawerFooter: {
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
  },
  footerButton: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  footerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.md,
  },
});

export default Drawer;
