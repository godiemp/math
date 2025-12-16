/**
 * Input component
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  containerStyle,
  ...props
}: InputProps) {
  const { colors, radii, components } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return colors.danger;
    if (isFocused) return colors.tint;
    return colors.separator;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.labelPrimary }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            height: components.input.height,
            borderRadius: components.input.radius,
            paddingHorizontal: components.input.paddingHorizontal,
            backgroundColor: colors.surface,
            borderColor: getBorderColor(),
            color: colors.labelPrimary,
          },
        ]}
        placeholderTextColor={colors.labelSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    fontSize: 17,
  },
  error: {
    fontSize: 13,
    marginTop: 4,
  },
});
