import React, { useState, useEffect } from 'react';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import EnhancedSplashScreen from "@/components/EnhancedSplashScreen";
import { View, StyleSheet } from 'react-native';

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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="paper-details"
          options={{ headerShown: false, presentation: "card" }}
        />
        <Stack.Screen
          name="paper-pdf"
          options={{ headerShown: false, presentation: "card" }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false);
  };

  return (
    <ThemeProvider>
      {isSplashVisible ? (
        <EnhancedSplashScreen onFinish={handleSplashFinish} />
      ) : (
        <LayoutStack />
      )}
    </ThemeProvider>
  );
}
