/**
 * Theme provider for React Native
 * Uses system color scheme detection
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { colors, spacing, radii, typography, shadows, components } from '@paes/shared';

interface Theme {
  colors: typeof colors.light;
  spacing: typeof spacing;
  radii: typeof radii;
  typography: typeof typography;
  shadows: typeof shadows;
  components: typeof components;
  isDark: boolean;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const theme: Theme = {
    colors: isDark ? colors.dark : colors.light,
    spacing,
    radii,
    typography,
    shadows,
    components,
    isDark,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export type { Theme };
