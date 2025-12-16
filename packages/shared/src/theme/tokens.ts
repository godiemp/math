/**
 * Design tokens extracted from design-system.json
 * Formatted for React Native StyleSheet compatibility
 */

export const colors = {
  light: {
    tint: '#0A84FF',
    tintAlt: '#5E5CE6',
    bg: '#F7F7F7',
    surface: '#FFFFFF',
    elevatedSurface: '#FFFFFF',
    labelPrimary: '#000000',
    labelSecondary: 'rgba(0,0,0,0.6)',
    separator: 'rgba(0,0,0,0.12)',
    separatorStrong: 'rgba(0,0,0,0.24)',
    fill: 'rgba(0,0,0,0.04)',
    success: '#34C759',
    warning: '#FF9F0A',
    danger: '#FF453A',
    info: '#64D2FF',
    link: '#0A84FF',
  },
  dark: {
    tint: '#0A84FF',
    tintAlt: '#9A99FF',
    bg: '#000000',
    surface: '#121212',
    elevatedSurface: '#1C1C1C',
    labelPrimary: '#FFFFFF',
    labelSecondary: 'rgba(255,255,255,0.7)',
    separator: 'rgba(255,255,255,0.16)',
    separatorStrong: 'rgba(255,255,255,0.28)',
    fill: 'rgba(255,255,255,0.06)',
    success: '#30D158',
    warning: '#FF9F0A',
    danger: '#FF453A',
    info: '#64D2FF',
    link: '#0A84FF',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type ColorRole = keyof typeof colors.light;

export const spacing = {
  baseline: 4,
  0: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 14,
  8: 16,
  9: 20,
  10: 24,
  11: 28,
  12: 32,
  14: 40,
  16: 48,
  18: 56,
  20: 64,
} as const;

export const radii = {
  none: 0,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  full: 999,
} as const;

export const typography = {
  heading: {
    fontFamily: 'System',
    fontWeight: '700' as const,
    sizes: {
      xs: 24,
      sm: 28,
      md: 34,
      lg: 44,
      xl: 56,
    },
  },
  body: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    sizes: {
      xs: 13,
      sm: 15,
      md: 17,
      lg: 19,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  mono: {
    fontFamily: 'System',
    fontWeight: '400' as const,
    sizes: {
      xs: 12,
      sm: 13,
      md: 14,
      lg: 16,
    },
  },
} as const;

export const shadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  ambient: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 4,
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 36,
    elevation: 8,
  },
  popover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.26,
    shadowRadius: 48,
    elevation: 12,
  },
} as const;

export const motion = {
  durations: {
    micro: 120,
    short: 180,
    standard: 240,
    long: 300,
  },
  springs: {
    default: { stiffness: 340, damping: 32, mass: 1 },
    emphasized: { stiffness: 420, damping: 30, mass: 1 },
    micro: { stiffness: 500, damping: 36, mass: 0.8 },
  },
} as const;

export const components = {
  button: {
    height: 44,
    radius: radii.sm,
    paddingHorizontal: 16,
    gap: 8,
  },
  input: {
    height: 44,
    radius: radii.sm,
    paddingHorizontal: 12,
  },
  card: {
    radius: radii.md,
    padding: 16,
  },
  navbar: {
    height: 56,
  },
  chip: {
    height: 28,
    radius: radii.full,
    paddingHorizontal: 10,
  },
} as const;

export const accessibility = {
  minHitTarget: 44,
  focusRingWidth: 3,
} as const;
