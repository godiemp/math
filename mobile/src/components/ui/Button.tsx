/**
 * Button component
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const { colors, radii, components } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.fill;
    switch (variant) {
      case 'primary':
        return colors.tint;
      case 'secondary':
        return colors.surface;
      case 'danger':
        return colors.danger;
      case 'ghost':
        return 'transparent';
      default:
        return colors.tint;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.labelSecondary;
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'secondary':
      case 'ghost':
        return colors.tint;
      default:
        return '#FFFFFF';
    }
  };

  const buttonStyle: ViewStyle = {
    height: components.button.height,
    borderRadius: components.button.radius,
    paddingHorizontal: components.button.paddingHorizontal,
    backgroundColor: getBackgroundColor(),
    borderWidth: variant === 'secondary' ? 1 : 0,
    borderColor: variant === 'secondary' ? colors.separator : undefined,
  };

  const textStyle: TextStyle = {
    color: getTextColor(),
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
});
