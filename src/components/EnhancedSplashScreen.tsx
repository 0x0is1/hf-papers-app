import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "@/constants/theme";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.6)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;
  const iconGlow = useRef(new Animated.Value(0.2)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Entry animation
    Animated.sequence([
      Animated.timing(containerOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconFloat, {
          toValue: -6,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(iconFloat, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Subtle breathing glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconGlow, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(iconGlow, {
          toValue: 0.2,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    // Exit transition
    const timer = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(onFinish);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: containerOpacity }]}>
        {/* Icon with glow */}
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              transform: [{ scale: iconScale }, { translateY: iconFloat }],
              shadowOpacity: iconGlow,
            },
          ]}
        >
          <Ionicons name="paper-plane" size={72} color={COLORS.primary} />
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleSlide }],
          }}
        >
          <Text style={styles.title}>HF Papers</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Research Papers Simplified
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.splashBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.splashLogoBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.xxl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 25,
    elevation: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.splashText,
    letterSpacing: -0.5,
    marginBottom: SIZES.sm,
  },
  tagline: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
});
