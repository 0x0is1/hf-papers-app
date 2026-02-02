import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const { COLORS, SIZES } = useTheme();

  return (
    <View style={styles(COLORS, SIZES).container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      {message && <Text style={styles(COLORS, SIZES).message}>{message}</Text>}
    </View>
  );
};

const styles = (COLORS: any, SIZES: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.background,
    },
    message: {
      color: COLORS.textSecondary,
      fontSize: SIZES.body,
      marginTop: SIZES.md,
    },
  });

export default LoadingSpinner;
