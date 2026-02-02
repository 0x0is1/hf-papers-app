import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

/* ===================== TYPE DEFINITIONS ===================== */

export interface ThemeColors {
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Card colors
  card: string;
  cardHover: string;
  cardBorder: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Accent colors
  accent: string;
  accentSecondary: string;
  accentGradientStart: string;
  accentGradientEnd: string;
  
  // Status colors
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;
  
  // Border colors
  border: string;
  borderLight: string;
  borderFocus: string;
  
  // Overlay colors
  overlay: string;
  overlayLight: string;
  overlayDark: string;
  backdrop: string;
  
  // Gradient colors
  gradientPrimaryStart: string;
  gradientPrimaryEnd: string;
  gradientBackgroundStart: string;
  gradientBackgroundEnd: string;
  gradientCardStart: string;
  gradientCardEnd: string;
  
  // Tab bar
  tabBarActive: string;
  tabBarInactive: string;
  tabBarBackground: string;
  tabBarBorder: string;
  
  // Input colors
  inputBackground: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputIcon: string;
  
  // Divider
  divider: string;
  dividerLight: string;
  
  // Shadow
  shadowColor: string;
  
  // Ripple
  rippleColor: string;
  
  // Splash screen specific
  splashBackground: string;
  splashLogoBackground: string;
  splashLogoShadow: string;
  splashText: string;
  splashIconColor: string;
}

export interface ThemeSizes {
  // Spacing
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
  
  // Font sizes
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
  
  // Border radius
  radiusXs: number;
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
  radiusRound: number;
  
  // Dimensions
  width: number;
  height: number;
  
  // Icon sizes
  iconXs: number;
  iconSm: number;
  iconMd: number;
  iconLg: number;
  iconXl: number;
  iconXxl: number;
  
  // Button heights
  buttonSm: number;
  buttonMd: number;
  buttonLg: number;
  buttonXl: number;
  
  // Input heights
  inputHeight: number;
  
  // Card
  cardPadding: number;
  cardBorderRadius: number;
  
  // Screen
  screenPadding: number;
  screenPaddingHorizontal: number;
  screenPaddingVertical: number;
  
  // Header
  headerHeight: number;
  headerPaddingTop: number;
  
  // Tab bar
  tabBarHeight: number;
  tabBarIconSize: number;
  
  // Avatar sizes
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
  // Primary colors - Vibrant orange for high contrast on dark
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  primaryLight: '#FF8859',
  
  // Background colors - Deep, rich dark tones
  background: '#0F0F23',
  backgroundSecondary: '#1A1A2E',
  backgroundTertiary: '#252547',
  
  // Card colors - Slightly lighter than background for depth
  card: '#1E1E3F',
  cardHover: '#252547',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  
  // Text colors - High contrast white with softened variants
  text: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textTertiary: '#6B6B8C',
  textInverse: '#0F0F23',
  
  // Accent colors - Cyan and purple for visual interest
  accent: '#00D9FF',
  accentSecondary: '#9D4EDD',
  accentGradientStart: '#00D9FF',
  accentGradientEnd: '#9D4EDD',
  
  // Status colors - Vibrant but not jarring
  success: '#06FFA5',
  successLight: 'rgba(6, 255, 165, 0.15)',
  warning: '#FFB800',
  warningLight: 'rgba(255, 184, 0, 0.15)',
  error: '#FF5757',
  errorLight: 'rgba(255, 87, 87, 0.15)',
  info: '#00D9FF',
  infoLight: 'rgba(0, 217, 255, 0.15)',
  
  // Border colors - Subtle for dark mode
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.15)',
  borderFocus: '#FF6B35',
  
  // Overlay colors - For modals, dialogs, etc.
  overlay: 'rgba(15, 15, 35, 0.95)',
  overlayLight: 'rgba(15, 15, 35, 0.8)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
  backdrop: 'rgba(0, 0, 0, 0.6)',
  
  // Gradient colors
  gradientPrimaryStart: '#FF6B35',
  gradientPrimaryEnd: '#FF8859',
  gradientBackgroundStart: '#0F0F23',
  gradientBackgroundEnd: '#1A1A2E',
  gradientCardStart: '#1E1E3F',
  gradientCardEnd: '#252547',
  
  // Tab bar
  tabBarActive: '#FF6B35',
  tabBarInactive: '#6B6B8C',
  tabBarBackground: '#0F0F23',
  tabBarBorder: 'rgba(255, 255, 255, 0.1)',
  
  // Input colors
  inputBackground: '#1E1E3F',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
  inputText: '#FFFFFF',
  inputPlaceholder: '#6B6B8C',
  inputIcon: '#6B6B8C',
  
  // Divider
  divider: 'rgba(255, 255, 255, 0.1)',
  dividerLight: 'rgba(255, 255, 255, 0.15)',
  
  // Shadow
  shadowColor: '#000000',
  
  // Ripple effect
  rippleColor: 'rgba(255, 107, 53, 0.2)',
  
  // Splash screen specific - Dark mode
  splashBackground: '#0F0F23',
  splashLogoBackground: '#1E1E3F',
  splashLogoShadow: '#FF6B35',
  splashText: '#FFFFFF',
  splashIconColor: '#FF6B35',
};

/* ===================== LIGHT THEME COLORS ===================== */

const LIGHT_COLORS: ThemeColors = {
  // Primary colors - Vibrant orange for contrast
  primary: '#FF6B35',
  primaryDark: '#E55A2B',
  primaryLight: '#FF8C5A',
  
  // Background colors - Clean whites
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#E9ECEF',
  
  // Card colors - Pure white
  card: '#FFFFFF',
  cardHover: '#F8F9FA',
  cardBorder: '#DEE2E6',
  
  // Text colors - Dark for readability
  text: '#212529',
  textSecondary: '#6C757D',
  textTertiary: '#ADB5BD',
  textInverse: '#FFFFFF',
  
  // Accent colors
  accent: '#0D6EFD',
  accentSecondary: '#6F42C1',
  accentGradientStart: '#0D6EFD',
  accentGradientEnd: '#6F42C1',
  
  // Status colors
  success: '#198754',
  successLight: '#D1E7DD',
  warning: '#FFC107',
  warningLight: '#FFF3CD',
  error: '#DC3545',
  errorLight: '#F8D7DA',
  info: '#0DCAF0',
  infoLight: '#CFF4FC',
  
  // Border colors
  border: '#DEE2E6',
  borderLight: '#E9ECEF',
  borderFocus: '#FF6B35',
  
  // Overlay colors
  overlay: 'rgba(255, 255, 255, 0.95)',
  overlayLight: 'rgba(255, 255, 255, 0.8)',
  overlayDark: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.4)',
  
  // Gradient colors
  gradientPrimaryStart: '#FF6B35',
  gradientPrimaryEnd: '#FF8C5A',
  gradientBackgroundStart: '#FFFFFF',
  gradientBackgroundEnd: '#F8F9FA',
  gradientCardStart: '#FFFFFF',
  gradientCardEnd: '#F8F9FA',
  
  // Tab bar
  tabBarActive: '#FF6B35',
  tabBarInactive: '#ADB5BD',
  tabBarBackground: '#FFFFFF',
  tabBarBorder: '#DEE2E6',
  
  // Input colors
  inputBackground: '#F8F9FA',
  inputBorder: '#DEE2E6',
  inputText: '#212529',
  inputPlaceholder: '#ADB5BD',
  inputIcon: '#6C757D',
  
  // Divider
  divider: '#E9ECEF',
  dividerLight: '#F8F9FA',
  
  // Shadow
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  
  // Ripple effect
  rippleColor: 'rgba(255, 107, 53, 0.2)',
  
  // Splash screen specific - Light mode
  splashBackground: '#FFFFFF',
  splashLogoBackground: '#FFFFFF',
  splashLogoShadow: '#FF6B35',
  splashText: '#212529',
  splashIconColor: '#FF6B35',
};

/* ===================== SIZES ===================== */

export const SIZES: ThemeSizes = {
  // Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  
  // Font sizes
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
  
  // Border radius
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusRound: 999,
  
  // Dimensions
  width,
  height,
  
  // Icon sizes
  iconXs: 12,
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
  iconXxl: 48,
  
  // Button heights
  buttonSm: 32,
  buttonMd: 44,
  buttonLg: 52,
  buttonXl: 60,
  
  // Input heights
  inputHeight: 48,
  
  // Card
  cardPadding: 16,
  cardBorderRadius: 16,
  
  // Screen
  screenPadding: 16,
  screenPaddingHorizontal: 16,
  screenPaddingVertical: 16,
  
  // Header
  headerHeight: 56,
  headerPaddingTop: 12,
  
  // Tab bar
  tabBarHeight: 60,
  tabBarIconSize: 24,
  
  // Avatar sizes
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 7,
    borderWidth: 0.1
  },
  cardPressed: {
    shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 0.1
  },
  elevation: {
    shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 0.1
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

// For backward compatibility - extract colors as flat object
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
  // Theme objects
  DARK_THEME,
  LIGHT_THEME,
  
  // Color objects
  colors: DARK_COLORS,
  LIGHT_COLORS: _LIGHT_COLORS,
  COLORS,
  THEMES,
  
  // Size objects
  sizes: SIZES,
  SIZES,
  SIZE,
  
  // Font objects
  fonts: FONTS,
  FONTS,
  
  // Shadow objects
  shadows: createShadows(DARK_COLORS.shadowColor),
  SHADOWS,
  LIGHT_SHADOWS,
  
  // Layout
  layout: LAYOUT,
  LAYOUT,
  
  // Animation
  animation: ANIMATION,
  ANIMATION,
  TRANSITIONS,
};
