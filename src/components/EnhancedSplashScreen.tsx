import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import { COLORS, SIZES } from "@/constants/theme";
import appIcon from "@assets/adaptive-icon.png"

interface SplashScreenProps {
  onFinish: () => void;
  onMounted?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, onMounted }) => {
  const containerOpacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.6)).current;
  const iconFloat = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.9)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    onMounted?.();

    let floatingLoop: Animated.CompositeAnimation;
    let glowLoop: Animated.CompositeAnimation;

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
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation
    floatingLoop = Animated.loop(
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
    );
    floatingLoop.start();

    // Glow animation
    glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowScale, {
          toValue: 1.15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowScale, {
          toValue: 0.9,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    );
    glowLoop.start();

    const timer = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(onFinish);
    }, 2600);

    return () => {
      clearTimeout(timer);
      floatingLoop?.stop();
      glowLoop?.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: containerOpacity }]}>
        <Animated.View
          style={[
            styles.iconStack,
            {
              transform: [{ scale: iconScale }, { translateY: iconFloat }],
            },
          ]}
        >
          <View style={styles.iconCenter}>
            <Animated.View
              style={[styles.glow, { transform: [{ scale: glowScale }] }]}
            />

            <View style={styles.iconWrapper}>
              <Image source={appIcon} style={styles.iconImage} />
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleSlide }],
          }}
        >
          <Text style={styles.title}>HF Papers</Text>
        </Animated.View>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          Research Papers Simplified
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const ICON_SIZE = 120;

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
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    objectFit: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  iconStack: {
    marginBottom: SIZES.xxl,
  },
  iconCenter: {
    width: ICON_SIZE + (ICON_SIZE * 0.5),
    height: ICON_SIZE + (ICON_SIZE * 0.5),
    justifyContent: "center",
    alignItems: "center",
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: "100%",
    backgroundColor: COLORS.primary,
    opacity: 0.08,
  },
  iconWrapper: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: COLORS.splashLogoBackground,
    justifyContent: "center",
    alignItems: "center",
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
