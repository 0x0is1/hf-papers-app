import React, { useState, useCallback, useEffect, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import EnhancedSplashScreen from "@/components/EnhancedSplashScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import { registerDailyPaperTask } from "@/services/dailyPaperBackgroundTask";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function LayoutStack() {
  const { COLORS } = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="paper-details" />
        <Stack.Screen name="paper-pdf" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const router = useRouter();
  const [showApp, setShowApp] = useState(false);
  const hasHandledInitialNotification = useRef(false);
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        console.log("Notification permission not granted.");
        return;
      }

      await registerDailyPaperTask();
    };

    setupNotifications();
  }, []);

  useEffect(() => {
    const response = Notifications.getLastNotificationResponse();

    if (response && !hasHandledInitialNotification.current) {
      hasHandledInitialNotification.current = true;

      const data = response.notification.request.content.data;

      if (data?.screen === "trending") {
        setTimeout(() => {
          router.replace("/(tabs)/trending");
        }, 300);
      }
    }

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;

        if (data?.screen === "trending") {
          router.replace("/(tabs)/trending");
        }
      },
    );

    return () => subscription.remove();
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowApp(true);
  }, []);

  const handleSplashMounted = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {!showApp ? (
          <EnhancedSplashScreen
            onFinish={handleSplashFinish}
            onMounted={handleSplashMounted}
          />
        ) : (
          <LayoutStack />
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
