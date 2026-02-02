import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const { COLORS, SIZES } = useTheme();

  return (
    <View style={styles(COLORS, SIZES).container}>
      <MaterialIcons name="error-outline" size={64} color={COLORS.error} />
      <Text style={styles(COLORS, SIZES).message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles(COLORS, SIZES).retryButton} onPress={onRetry}>
          <MaterialIcons name="refresh" size={20} color={COLORS.text} />
          <Text style={styles(COLORS, SIZES).retryText}>Retry</Text>
        </TouchableOpacity>
      )}
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
      padding: SIZES.xl,
    },
    message: {
      color: COLORS.textSecondary,
      fontSize: SIZES.body,
      textAlign: 'center',
      marginTop: SIZES.md,
      marginBottom: SIZES.lg,
    },
    retryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      paddingHorizontal: SIZES.lg,
      paddingVertical: SIZES.sm,
      borderRadius: SIZES.radiusMd,
    },
    retryText: {
      color: COLORS.text,
      fontSize: SIZES.body,
      fontWeight: '600',
      marginLeft: SIZES.xs,
    },
  });

export default ErrorMessage;
