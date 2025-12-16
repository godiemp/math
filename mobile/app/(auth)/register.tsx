/**
 * Register screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/contexts';
import { useTheme } from '../../src/theme';
import { Button, Input } from '../../src/components/ui';

export default function RegisterScreen() {
  const { register } = useAuth();
  const { colors, radii } = useTheme();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    // Validation
    if (!username.trim()) {
      setError('Por favor ingresa un nombre de usuario');
      return;
    }
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }
    if (!email.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }
    if (!password) {
      setError('Por favor ingresa una contraseña');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (!displayName.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    if (!acceptedTerms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);
    setError('');

    const result = await register({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password,
      displayName: displayName.trim(),
      acceptedTerms,
    });

    if (result.success) {
      router.replace('/(app)');
    } else {
      setError(result.error || 'Error al registrarse');
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.labelPrimary }]}>
              Crear cuenta
            </Text>
            <Text style={[styles.subtitle, { color: colors.labelSecondary }]}>
              Regístrate para practicar PAES
            </Text>
          </View>

          <View style={[styles.form, { backgroundColor: colors.surface, borderRadius: radii.lg }]}>
            <Input
              label="Nombre de usuario"
              placeholder="usuario123"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="username"
              returnKeyType="next"
            />

            <Input
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              returnKeyType="next"
            />

            <Input
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword"
              returnKeyType="next"
            />

            <Input
              label="Tu nombre"
              placeholder="¿Cómo te llamamos?"
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
              textContentType="name"
              returnKeyType="done"
            />

            <View style={styles.termsContainer}>
              <Switch
                value={acceptedTerms}
                onValueChange={setAcceptedTerms}
                trackColor={{ false: colors.fill, true: colors.tint }}
                thumbColor={colors.surface}
              />
              <Text style={[styles.termsText, { color: colors.labelSecondary }]}>
                Acepto los{' '}
                <Text style={{ color: colors.tint }}>términos y condiciones</Text>
              </Text>
            </View>

            {error ? (
              <View style={[styles.errorContainer, { backgroundColor: colors.danger + '15' }]}>
                <Text style={[styles.errorText, { color: colors.danger }]}>
                  {error}
                </Text>
              </View>
            ) : null}

            <Button
              title="Crear cuenta"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
            />
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.labelSecondary }]}>
              ¿Ya tienes cuenta?{' '}
            </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={[styles.linkText, { color: colors.tint }]}>
                  Inicia sesión
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
  },
  form: {
    padding: 24,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  termsText: {
    flex: 1,
    fontSize: 15,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
  },
  registerButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
