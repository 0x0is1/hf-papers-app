import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  StatusBar,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const SettingsScreen = () => {
  const { COLORS, SIZES, isDark, toggleTheme } = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const handleOpenURL = (url: string) => {
    Linking.openURL(url);
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles(COLORS, SIZES).settingItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles(COLORS, SIZES).settingLeft}>
        <View style={styles(COLORS, SIZES).iconContainer}>
          <MaterialIcons name={icon as any} size={22} color={COLORS.primary} />
        </View>
        <View style={styles(COLORS, SIZES).settingText}>
          <Text style={styles(COLORS, SIZES).settingTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles(COLORS, SIZES).settingSubtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement ||
        (onPress && (
          <MaterialIcons
            name="chevron-right"
            size={22}
            color={COLORS.textTertiary}
          />
        ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles(COLORS, SIZES).container}>
      <StatusBar barStyle={COLORS.background === '#FAFAFC' ? 'dark-content' : 'light-content'} />
      
      {/* Fixed Header */}
      <View style={styles(COLORS, SIZES).headerContainer}>
        <View style={styles(COLORS, SIZES).logoRow}>
          <View style={styles(COLORS, SIZES).logoContainer}>
            <Ionicons name="options" size={28} color={COLORS.primary} />
          </View>
          <View style={styles(COLORS, SIZES).titleContainer}>
            <Text style={styles(COLORS, SIZES).appTitle}>Settings</Text>
            <Text style={styles(COLORS, SIZES).appSubtitle}>Customize your experience</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles(COLORS, SIZES).scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Info */}
        <View style={styles(COLORS, SIZES).section}>
          <View style={styles(COLORS, SIZES).card}>
            <View style={styles(COLORS, SIZES).appInfoContainer}>
              <View style={styles(COLORS, SIZES).appIcon}>
                <MaterialIcons name="article" size={40} color={COLORS.primary} />
              </View>
              <View style={styles(COLORS, SIZES).appInfo}>
                <Text style={styles(COLORS, SIZES).appName}>HF Papers</Text>
                <Text style={styles(COLORS, SIZES).appVersion}>Version 0.0.1</Text>
                <Text style={styles(COLORS, SIZES).appDescription}>
                  Your daily dose of AI research
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles(COLORS, SIZES).section}>
          <Text style={styles(COLORS, SIZES).sectionTitle}>Preferences</Text>
          <View style={styles(COLORS, SIZES).card}>
            <SettingItem
              icon="notifications"
              title="Notifications"
              subtitle="Get notified about new papers"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: COLORS.border, true: COLORS.border }}
                  thumbColor={COLORS.primary}
                />
              }
            />
            <View style={styles(COLORS, SIZES).divider} />
            <SettingItem
              icon="dark-mode"
              title="Dark Mode"
              subtitle={isDark ? "Enabled" : "Disabled"}
              rightElement={
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: COLORS.border, true: COLORS.border }}
                  thumbColor={COLORS.primary}
                />
              }
            />
          </View>
        </View>

        {/* Resources */}
        <View style={styles(COLORS, SIZES).section}>
          <Text style={styles(COLORS, SIZES).sectionTitle}>Resources</Text>
          <View style={styles(COLORS, SIZES).card}>
            <SettingItem
              icon="link"
              title="HuggingFace Papers"
              subtitle="Visit official website"
              onPress={() => handleOpenURL("https://huggingface.co/papers")}
            />
            <View style={styles(COLORS, SIZES).divider} />
            <SettingItem
              icon="code"
              title="API Documentation"
              subtitle="Learn about the Papers API"
              onPress={() =>
                handleOpenURL("https://huggingface.co/docs/hub/en/api")
              }
            />
            <View style={styles(COLORS, SIZES).divider} />
            <SettingItem
              icon="science"
              title="arXiv"
              subtitle="Open access to research"
              onPress={() => handleOpenURL("https://arxiv.org")}
            />
          </View>
        </View>

        {/* Stats */}
        <View style={styles(COLORS, SIZES).section}>
          <Text style={styles(COLORS, SIZES).sectionTitle}>Stats</Text>
          <View style={styles(COLORS, SIZES).statsContainer}>
            <View style={styles(COLORS, SIZES).statCard}>
              <MaterialIcons name="article" size={32} color={COLORS.primary} />
              <Text style={styles(COLORS, SIZES).statValue}>1000+</Text>
              <Text style={styles(COLORS, SIZES).statLabel}>Papers</Text>
            </View>
            <View style={styles(COLORS, SIZES).statCard}>
              <MaterialIcons name="update" size={32} color={COLORS.success} />
              <Text style={styles(COLORS, SIZES).statValue}>Daily</Text>
              <Text style={styles(COLORS, SIZES).statLabel}>Updates</Text>
            </View>
          </View>
        </View>

        {/* Support */}
        <View style={styles(COLORS, SIZES).section}>
          <Text style={styles(COLORS, SIZES).sectionTitle}>Support</Text>
          <View style={styles(COLORS, SIZES).card}>
            <SettingItem
              icon="bug-report"
              title="Report an Issue"
              subtitle="Help us improve"
              onPress={() =>
                handleOpenURL("https://github.com/huggingface/hub-docs/issues")
              }
            />
            <View style={styles(COLORS, SIZES).divider} />
            <SettingItem
              icon="info"
              title="About HuggingFace"
              subtitle="Learn more"
              onPress={() => handleOpenURL("https://huggingface.co/about")}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles(COLORS, SIZES).footer}>
          <Text style={styles(COLORS, SIZES).footerText}>
            Made with ❤️ using HuggingFace API by NYS
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = (COLORS: any, SIZES: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    headerContainer: {
      backgroundColor: COLORS.background,
      paddingTop: SIZES.lg,
      paddingHorizontal: SIZES.md,
      paddingBottom: SIZES.md,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.divider,
    },
    scrollContent: {
      flex: 1,
      paddingVertical: 20
    },
    logoRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    logoContainer: {
      width: 48,
      height: 48,
      borderRadius: SIZES.radiusMd,
      backgroundColor: COLORS.primaryLight + '20',
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      marginLeft: SIZES.md,
    },
    appTitle: {
      fontSize: SIZES.h3,
      fontWeight: "700",
      color: COLORS.text,
    },
    appSubtitle: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      marginTop: 2,
    },
    section: { marginBottom: SIZES.lg },
    sectionTitle: {
      fontSize: SIZES.h5,
      fontWeight: "600",
      color: COLORS.textSecondary,
      paddingHorizontal: SIZES.md,
      marginBottom: SIZES.sm,
    },
    card: {
      backgroundColor: COLORS.card,
      marginHorizontal: SIZES.md,
      borderRadius: SIZES.radiusLg,
      overflow: "hidden",
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: SIZES.md,
    },
    settingLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: SIZES.radiusMd,
      backgroundColor: COLORS.backgroundTertiary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: SIZES.md,
    },
    settingText: { flex: 1 },
    settingTitle: {
      fontSize: SIZES.body,
      fontWeight: "600",
      color: COLORS.text,
    },
    settingSubtitle: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.divider,
      marginLeft: 72,
    },
    appInfoContainer: {
      flexDirection: "row",
      padding: SIZES.md,
      alignItems: "center",
    },
    appIcon: {
      width: 64,
      height: 64,
      borderRadius: SIZES.radiusLg,
      backgroundColor: COLORS.backgroundTertiary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: SIZES.md,
    },
    appInfo: { flex: 1 },
    appName: {
      fontSize: SIZES.h4,
      fontWeight: "700",
      color: COLORS.text,
    },
    appVersion: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      marginTop: 4,
    },
    appDescription: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      marginTop: SIZES.sm,
      lineHeight: 18,
    },
    statsContainer: {
      flexDirection: "row",
      paddingHorizontal: SIZES.md,
      gap: SIZES.md,
    },
    statCard: {
      flex: 1,
      backgroundColor: COLORS.card,
      padding: SIZES.md,
      borderRadius: SIZES.radiusLg,
      alignItems: "center",
    },
    statValue: {
      fontSize: SIZES.h3,
      fontWeight: "700",
      color: COLORS.text,
      marginTop: SIZES.sm,
    },
    statLabel: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      marginTop: 4,
      textAlign: "center",
    },
    footer: {
      alignItems: "center",
      paddingBottom: SIZES.xl,
    },
    footerText: {
      fontSize: SIZES.caption,
      color: COLORS.textSecondary,
      textAlign: "center",
    },
  });

export default SettingsScreen;
