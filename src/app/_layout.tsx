import React, { useState, useCallback } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import EnhancedSplashScreen from "@/components/EnhancedSplashScreen";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

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
  const [showApp, setShowApp] = useState(false);

  const handleSplashFinish = useCallback(() => {
    setShowApp(true);
  }, []);

  const handleSplashLayout = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
      {!showApp ? (
        <EnhancedSplashScreen
          onFinish={handleSplashFinish}
          onMounted={handleSplashLayout}
        />
      ) : (
        <LayoutStack />
      )}
    </ThemeProvider>
  );
}
