import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { SIZES } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { COLORS } = useTheme();
  const insets = useSafeAreaInsets();

  const TAB_HEIGHT = 60 + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.tabBarActive,
        tabBarInactiveTintColor: COLORS.tabBarInactive,
        tabBarStyle: {
          backgroundColor: COLORS.tabBarBackground,
          borderTopWidth: 0,
          height: TAB_HEIGHT,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          elevation: 12,
        },

        tabBarLabelStyle: {
          fontSize: SIZES.small,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="trending"
        options={{
          title: "Trending",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="whatshot" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "options" : "options-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
