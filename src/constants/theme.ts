import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export interface ThemeColors { 
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  card: string;
  cardHover: string;
  cardBorder: string;
  
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  accent: string;
  accentSecondary: string;
  accentGradientStart: string;
  accentGradientEnd: string;
  
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  
  border: string;
  borderLight: string;
  borderFocus: string;
  
  overlay: string;
  overlayLight: string;
  overlayDark: string;
  backdrop: string;
  
  gradientPrimaryStart: string;
  gradientPrimaryEnd: string;
  gradientBackgroundStart: string;
  gradientBackgroundEnd: string;
  gradientCardStart: string;
  gradientCardEnd: string;
  
  tabBarActive: string;
  tabBarInactive: string;
  tabBarBackground: string;
  tabBarBorder: string;
  
  inputBackground: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputIcon: string;
  
  divider: string;
  dividerLight: string;
  
  shadowColor: string;
  
  rippleColor: string;
  
  splashBackground: string;
  splashLogoBackground: string;
  splashLogoShadow: string;
  splashText: string;
  splashIconColor: string;
}

export interface ThemeSizes {
  
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  body: number;
  caption: number;
  small: number;
  tiny: number;
  overline: number;
  
  radiusXs: number;
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
  radiusRound: number;
  
  
  width: number;
  height: number;
  
  
  iconXs: number;
  iconSm: number;
  iconMd: number;
  iconLg: number;
  iconXl: number;
  iconXxl: number;
  
  
  buttonSm: number;
  buttonMd: number;
  buttonLg: number;
  buttonXl: number;
  
  
  inputHeight: number;
  
  
  cardPadding: number;
  cardBorderRadius: number;
  
  
  screenPadding: number;
  screenPaddingHorizontal: number;
  screenPaddingVertical: number;
  
  
  headerHeight: number;
  headerPaddingTop: number;
  
  
  tabBarHeight: number;
  tabBarIconSize: number;
  
  
  avatarXs: number;
  avatarSm: number;
  avatarMd: number;
  avatarLg: number;
  avatarXl: number;
}

export interface ThemeFonts {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
  light: string;
  thin: string;
}

export interface ThemeShadows {
  none: any;
  small: any;
  medium: any;
  large: any;
  glow: any;
  glowLarge: any;
  inner: any;
  card: any;
  cardPressed: any;
  elevation: any;
}

export interface Theme {
  colors: ThemeColors;
  sizes: ThemeSizes;
  fonts: ThemeFonts;
  shadows: ThemeShadows;
}

export type ColorMode = 'dark' | 'light';

/* ===================== DARK THEME COLORS ===================== */

const DARK_COLORS: ThemeColors = {
  
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  primaryLight: '#FF8859',
  
  
  background: '#0F0F23',
  backgroundSecondary: '#1A1A2E',
  backgroundTertiary: '#252547',
  
  
  card: '#1E1E3F',
  cardHover: '#252547',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  
  
  text: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textTertiary: '#6B6B8C',
  textInverse: '#0F0F23',
  
  
  accent: '#00D9FF',
  accentSecondary: '#9D4EDD',
  accentGradientStart: '#00D9FF',
  accentGradientEnd: '#9D4EDD',
  
  
  success: '#06FFA5',
  successLight: 'rgba(6, 255, 165, 0.15)',
  warning: '#FFB800',
  warningLight: 'rgba(255, 184, 0, 0.15)',
  error: '#FF5757',
  errorLight: 'rgba(255, 87, 87, 0.15)',
  info: '#00D9FF',
  infoLight: 'rgba(0, 217, 255, 0.15)',
  
  
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.15)',
  borderFocus: '#FF6B35',
  
  
  overlay: 'rgba(15, 15, 35, 0.95)',
  overlayLight: 'rgba(15, 15, 35, 0.8)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
  backdrop: 'rgba(0, 0, 0, 0.6)',
  
  
  gradientPrimaryStart: '#FF6B35',
  gradientPrimaryEnd: '#FF8859',
  gradientBackgroundStart: '#0F0F23',
  gradientBackgroundEnd: '#1A1A2E',
  gradientCardStart: '#1E1E3F',
  gradientCardEnd: '#252547',
  
  
  tabBarActive: '#FF6B35',
  tabBarInactive: '#6B6B8C',
  tabBarBackground: '#0F0F23',
  tabBarBorder: 'rgba(255, 255, 255, 0.1)',
  
  
  inputBackground: '#1E1E3F',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  inputText: '#FFFFFF',
  inputPlaceholder: '#6B6B8C',
  inputIcon: '#6B6B8C',
  
  
  divider: 'rgba(255, 255, 255, 0.1)',
  dividerLight: 'rgba(255, 255, 255, 0.15)',
  
  
  shadowColor: '#000000',
  
  
  rippleColor: 'rgba(255, 107, 53, 0.2)',
  
  
  splashBackground: '#0F0F23',
  splashLogoBackground: '#1E1E3F',
  splashLogoShadow: '#FF6B35',
  splashText: '#FFFFFF',
  splashIconColor: '#FF6B35',
};

/* ===================== LIGHT THEME COLORS ===================== */

const LIGHT_COLORS: ThemeColors = {
  // Primary colors - Same warm orange for brand consistency
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  primaryLight: '#FF8859',
  
  // Background colors - Soothing shades of white/off-white
  background: '#F8F9EF',
  backgroundSecondary: '#F0F2E8',
  backgroundTertiary: '#E8EBE0',
  
  // Card colors - Subtle off-white with minimal borders
  card: '#FFFFFF',
  cardHover: '#F8F8FA',
  cardBorder: 'rgba(0, 0, 0, 0.06)',
  
  // Text colors - Inverted from dark theme
  text: '#1A1A2E',
  textSecondary: '#5C5C7A',
  textTertiary: '#8E8EA8',
  textInverse: '#FFFFFF',
  
  // Accent colors - Adjusted for light mode visibility
  accent: '#0099CC',
  accentSecondary: '#7C3AED',
  accentGradientStart: '#0099CC',
  accentGradientEnd: '#7C3AED',
  
  // Status colors - Adjusted for light backgrounds
  success: '#10B981',
  successLight: 'rgba(16, 185, 129, 0.12)',
  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.12)',
  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.12)',
  info: '#0099CC',
  infoLight: 'rgba(0, 153, 204, 0.12)',
  
  // Border colors - Subtle for light mode
  border: 'rgba(0, 0, 0, 0.06)',
  borderLight: 'rgba(0, 0, 0, 0.04)',
  borderFocus: '#FF6B35',
  
  // Overlay colors
  overlay: 'rgba(255, 255, 255, 0.96)',
  overlayLight: 'rgba(255, 255, 255, 0.88)',
  overlayDark: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.35)',
  
  // Gradient colors - Soft transitions
  gradientPrimaryStart: '#FF6B35',
  gradientPrimaryEnd: '#FF8859',
  gradientBackgroundStart: '#FAFAFC',
  gradientBackgroundEnd: '#F0F0F4',
  gradientCardStart: '#FFFFFF',
  gradientCardEnd: '#FAFAFC',
  
  // Tab bar
  tabBarActive: '#FF6B35',
  tabBarInactive: '#9CA3AF',
  tabBarBackground: '#FFFFFF',
  tabBarBorder: 'rgba(0, 0, 0, 0.06)',
  
  // Input colors
  inputBackground: '#F5F5F7',
  inputBorder: 'rgba(0, 0, 0, 0.08)',
  inputText: '#1A1A2E',
  inputPlaceholder: '#9CA3AF',
  inputIcon: '#9CA3AF',
  
  // Divider
  divider: 'rgba(0, 0, 0, 0.06)',
  dividerLight: 'rgba(0, 0, 0, 0.03)',
  
  // Shadow
  shadowColor: 'rgba(0, 0, 0, 0.08)',
  
  // Ripple effect
  rippleColor: 'rgba(255, 107, 53, 0.12)',
  
  // Splash
  splashBackground: '#F8F9EF',
  splashLogoBackground: '#FFFFFF',
  splashLogoShadow: '#FF6B35',
  splashText: '#1A1A2E',
  splashIconColor: '#FF6B35',
};

/* ===================== SIZES ===================== */

export const SIZES: ThemeSizes = {
  
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  
  
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 16,
  caption: 14,
  small: 12,
  tiny: 10,
  overline: 10,
  
  
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusRound: 999,
  
  
  width,
  height,
  
  
  iconXs: 12,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  iconXxl: 48,
  
  
  buttonSm: 32,
  buttonMd: 44,
  buttonLg: 52,
  buttonXl: 60,
  
  
  inputHeight: 48,
  
  
  cardPadding: 16,
  cardBorderRadius: 16,
  
  
  screenPadding: 16,
  screenPaddingHorizontal: 16,
  screenPaddingVertical: 16,
  
  
  headerHeight: 56,
  headerPaddingTop: 12,
  
  
  tabBarHeight: 60,
  tabBarIconSize: 24,
  
  
  avatarXs: 24,
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 56,
  avatarXl: 80,
};

/* ===================== FONTS ===================== */

export const FONTS: ThemeFonts = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
  light: 'System',
  thin: 'System',
};

/* ===================== SHADOWS ===================== */

const createShadows = (shadowColor: string): ThemeShadows => ({
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  glow: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  glowLarge: {
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
  },
  inner: {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  card: {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
  },
  cardPressed: {
    shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
  },
  elevation: {
    shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
  },
});

/* ===================== DARK THEME ===================== */

export const DARK_THEME: Theme = {
  colors: DARK_COLORS,
  sizes: SIZES,
  fonts: FONTS,
  shadows: createShadows(DARK_COLORS.shadowColor),
};

/* ===================== LIGHT THEME ===================== */

export const LIGHT_THEME: Theme = {
  colors: LIGHT_COLORS,
  sizes: SIZES,
  fonts: FONTS,
  shadows: createShadows(LIGHT_COLORS.shadowColor),
};

/* ===================== THEME OBJECTS (LEGACY SUPPORT) ===================== */


export const COLORS = DARK_COLORS;
const _LIGHT_COLORS = LIGHT_COLORS;
export { _LIGHT_COLORS as LIGHT_COLORS };
export const THEMES = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
};

/* ===================== SIZE CONSTANTS (LEGACY SUPPORT) ===================== */

const SIZE = SIZES;

/* ===================== SHADOW CONSTANTS (LEGACY SUPPORT) ===================== */

export const SHADOWS = createShadows(DARK_COLORS.shadowColor);
export const LIGHT_SHADOWS = createShadows(LIGHT_COLORS.shadowColor);

/* ===================== LAYOUT ===================== */

export const LAYOUT = {
  headerHeight: SIZES.headerHeight,
  tabBarHeight: SIZES.tabBarHeight,
  cardPadding: SIZES.cardPadding,
  screenPadding: SIZES.screenPadding,
  contentPadding: SIZES.md,
  itemSpacing: SIZES.sm,
  sectionSpacing: SIZES.lg,
};

/* ===================== ANIMATION ===================== */

export const ANIMATION = {
  fast: 150,
  medium: 250,
  slow: 400,
  slower: 600,
};

/* ===================== TRANSITIONS ===================== */

export const TRANSITIONS = {
  theme: ANIMATION.medium,
  press: 100,
  modal: 300,
  collapse: 200,
  expand: 250,
};

/* ===================== DEFAULT EXPORT ===================== */

export default {
  
  DARK_THEME,
  LIGHT_THEME,
  
  
  colors: DARK_COLORS,
  LIGHT_COLORS: _LIGHT_COLORS,
  COLORS,
  THEMES,
  
  
  sizes: SIZES,
  SIZES,
  SIZE,
  
  
  fonts: FONTS,
  FONTS,
  
  
  shadows: createShadows(DARK_COLORS.shadowColor),
  SHADOWS,
  LIGHT_SHADOWS,
  
  
  layout: LAYOUT,
  LAYOUT,
  
  
  animation: ANIMATION,
  ANIMATION,
  TRANSITIONS,
};