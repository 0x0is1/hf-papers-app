import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

interface SimpleSplashScreenProps {
  onFinish: () => void;
}

const SimpleSplashScreen: React.FC<SimpleSplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heartbeatAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Combined heartbeat + rotation animation
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(heartbeatAnim, {
            toValue: 1.12,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(heartbeatAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(200),
        ])
      ),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
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

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
        {/* Logo with heartbeat and rotation */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: heartbeatAnim }, { rotate: spin }],
            },
          ]}
        >
          {/* Outer ring */}
          <View style={styles.outerRing}>
            <View style={styles.outerRingDot} />
            <View style={styles.outerRingDot} />
            <View style={styles.outerRingDot} />
            <View style={styles.outerRingDot} />
          </View>
          
          {/* Main icon circle */}
          <View style={styles.iconCircle}>
            <MaterialIcons name="link" size={64} color={COLORS.splashIconColor} />
          </View>
          
          {/* Inner glow ring */}
          <View style={styles.innerGlow} />
        </Animated.View>

        {/* Simple text */}
        <Text style={styles.appName}>HF Papers</Text>
        <Text style={styles.tagline}>By NYS</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.splashBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: SIZES.xxl,
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRingDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.splashLogoBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
    zIndex: 1,
  },
  innerGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: COLORS.primary,
    opacity: 0.2,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.splashText,
    letterSpacing: -1,
    marginBottom: SIZES.sm,
  },
  tagline: {
    fontSize: SIZES.h5,
    color: COLORS.textSecondary,
    fontWeight: '500',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default SimpleSplashScreen;
