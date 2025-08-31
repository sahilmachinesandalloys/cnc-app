import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ResponsiveText } from '../ui';
import { COLORS, SPACING } from '../../constants';
import { useDrawer } from '../../contexts/DrawerContext';

interface HeaderProps {
  onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress }) => {
  const { openDrawer } = useDrawer();

  const handleMenuPress = () => {
    openDrawer();
    onMenuPress?.();
  };

  return (
    <View style={styles.header}>
      <View style={styles.topBar}>
        <View style={styles.branding}>
          <Image
            source={require('../../assets/app-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.iconButton} onPress={handleMenuPress}>
          <Ionicons name="grid-outline" size={24} color={COLORS.gray[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.sm,
    paddingRight: SPACING.sm + 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 70,
  },
  iconButton: {
    padding: SPACING.xs,
  },
});

export default Header;
