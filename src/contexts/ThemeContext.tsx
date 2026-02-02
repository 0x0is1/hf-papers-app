import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  COLORS as DARK_COLORS,
  LIGHT_COLORS,
  SIZES,
  FONTS,
  SHADOWS as DARK_SHADOWS,
  LIGHT_SHADOWS,
  LAYOUT,
  ANIMATION,
} from "@/constants/theme";

type ThemeValue = {
  COLORS: typeof DARK_COLORS;
  SIZES: typeof SIZES;
  FONTS: typeof FONTS;
  SHADOWS: typeof DARK_SHADOWS;
  LAYOUT: typeof LAYOUT;
  ANIMATION: typeof ANIMATION;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeValue>({
  COLORS: DARK_COLORS,
  SIZES,
  FONTS,
  SHADOWS: DARK_SHADOWS,
  LAYOUT,
  ANIMATION,
  isDark: true,
  toggleTheme: () => {},
});

const STORAGE_KEY = "APP_THEME_MODE";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          setIsDark(stored === "dark");
        }
      } catch (e) {
        console.log("Theme loading error:", e);
      }
      setHydrated(true);
    })();
  }, []);

  const toggleTheme = async () => {
    setIsDark((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEY, next ? "dark" : "light").catch(
        console.log
      );
      return next;
    });
  };

  const value = useMemo(
    () => ({
      COLORS: isDark ? DARK_COLORS : LIGHT_COLORS,
      SIZES,
      FONTS,
      SHADOWS: isDark ? DARK_SHADOWS : LIGHT_SHADOWS,
      LAYOUT,
      ANIMATION,
      isDark,
      toggleTheme,
    }),
    [isDark],
  );

  // Always provide context, don't return null
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  return ctx;
};
