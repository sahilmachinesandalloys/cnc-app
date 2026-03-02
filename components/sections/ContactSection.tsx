import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ResponsiveText } from "../ui";
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants";

interface ContactItemProps {
  icon: string;
  text: string;
  onPress?: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={18} color="#cc6f00" />
      </View>
      <ResponsiveText
        size="bodyMedium"
        color="textPrimary"
        weight="medium"
        style={styles.contactText}
      >
        {text}
      </ResponsiveText>
    </TouchableOpacity>
  );
};

interface SocialIconProps {
  icon: string;
  onPress: () => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.socialIcon}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon as any} size={20} color="#cc6f00" />
    </TouchableOpacity>
  );
};

const ContactSection: React.FC = () => {
  const handleAddressPress = async () => {
    const address = "8-B, Industrial Estate, Batala 143505";
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open maps application");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open maps");
    }
  };

  const handleEmailPress = async (email: string) => {
    const url = `mailto:${email}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open email application");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open email");
    }
  };

  const handlePhonePress = async () => {
    const phoneNumber = "+918427641925";
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

  const handleSocialPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this link");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open link");
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <ResponsiveText
          size="titleMedium"
          color="textPrimary"
          weight="bold"
          style={styles.title}
        >
          CONTACT
        </ResponsiveText>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <ContactItem
          icon="location-outline"
          text="8-B, Industrial Estate, Batala 143505"
          onPress={handleAddressPress}
        />

        <ContactItem
          icon="mail-outline"
          text="info@sahilcnc.com"
          onPress={() => handleEmailPress("info@sahilcnc.com")}
        />

        <ContactItem
          icon="mail-outline"
          text="sales@sahilcnc.com"
          onPress={() => handleEmailPress("sales@sahilcnc.com")}
        />

        <ContactItem
          icon="call-outline"
          text="+91-8427641925"
          onPress={handlePhonePress}
        />
      </View>

      {/* Social Media Links */}
      <View style={styles.socialContainer}>
        <SocialIcon
          icon="logo-linkedin"
          onPress={() =>
            handleSocialPress(
              "https://www.linkedin.com/company/sahil-cnc-machines/"
            )
          }
        />

        <SocialIcon
          icon="logo-instagram"
          onPress={() =>
            handleSocialPress(
              "https://www.instagram.com/sahilcncmachines/?igsh=MXVmODBueDZkM3Z1YQ%3D%3D#"
            )
          }
        />

        <SocialIcon
          icon="logo-facebook"
          onPress={() =>
            handleSocialPress(
              "https://www.facebook.com/profile.php?id=61556416797746&mibextid=ZbWKwL"
            )
          }
        />

        <SocialIcon
          icon="logo-youtube"
          onPress={() =>
            handleSocialPress("https://www.youtube.com/@sahilcncmachines")
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md, // Reduced from lg to md
    backgroundColor: COLORS.white,
  },
  header: {
    marginBottom: SPACING.md, // Reduced from lg to md
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  contactInfo: {
    marginBottom: SPACING.md, // Reduced from lg to md
    gap: SPACING.sm, // Reduced from md to sm
    alignItems: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.xs, // Reduced from sm to xs
  },
  iconContainer: {
    width: 20, // Reduced from 24 to 20
    alignItems: "center",
    marginRight: SPACING.sm, // Reduced from md to sm
  },
  contactText: {
    lineHeight: 18, // Reduced from 20 to 18
    textAlign: "center",
  },
  socialContainer: {
    flexDirection: "row",
    gap: SPACING.md, // Reduced from lg to md
    justifyContent: "center",
  },
  socialIcon: {
    padding: SPACING.xs, // Reduced from sm to xs
  },
});

export default ContactSection;
