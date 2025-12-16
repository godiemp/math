/**
 * Home/Dashboard screen (placeholder)
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/contexts';
import { useTheme } from '../../src/theme';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { colors, radii, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderRadius: radii.md }]}>
        <Text style={[styles.welcome, { color: colors.labelPrimary }]}>
          Bienvenido, {user?.displayName || user?.username}
        </Text>
        <Text style={[styles.email, { color: colors.labelSecondary }]}>
          {user?.email}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: colors.danger, borderRadius: radii.sm },
        ]}
        onPress={logout}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  card: {
    padding: 24,
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
  },
  logoutButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
