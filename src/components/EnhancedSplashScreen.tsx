import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { Svg, Path, G } from "react-native-svg";
import { COLORS, SIZES } from "@/constants/theme";

interface SimpleSplashScreenProps {
  onFinish: () => void;
}

// Paper plane SVG component
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const PaperPlaneIcon = ({ size = 80, color = COLORS.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill={color} />
  </Svg>
);

const SimpleSplashScreen: React.FC<SimpleSplashScreenProps> = ({
  onFinish,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const iconFadeAnim = useRef(new Animated.Value(0)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequential smooth animations
    Animated.sequence([
      // Icon appears
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(iconFadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Text appears
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate after delay
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Icon container with subtle glow */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: iconFadeAnim,
              transform: [{ scale: iconScaleAnim }],
            },
          ]}
        >
          {/* Subtle background circle */}
          <View style={styles.iconBackground}>
            <View style={styles.iconGlow} />
          </View>

          {/* Paper plane icon */}
          <View style={styles.iconWrapper}>
            <PaperPlaneIcon size={80} color={COLORS.primary} />
          </View>
        </Animated.View>

        {/* App name and tagline */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textFadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.appName}>HF Papers</Text>
          <View style={styles.divider} />
          <Text style={styles.tagline}>Research Papers Simplified</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

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
  iconContainer: {
    marginBottom: SIZES.xxxl,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBackground: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.splashLogoBackground,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.splashLogoShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  iconGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.primary,
    opacity: 0.08,
  },
  iconWrapper: {
    zIndex: 2,
  },
  textContainer: {
    alignItems: "center",
  },
  appName: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.splashText,
    letterSpacing: -0.5,
    marginBottom: SIZES.sm,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    marginBottom: SIZES.sm,
  },
  tagline: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
});

export default SimpleSplashScreen;
