import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "../store/authStore";
import styles from "../styles/login.style";
import COLORS from "../constants/colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { login, isLoading, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs.");
      return;
    }
    const result = await login(email.trim(), password);
    if (!result.success) {
      Alert.alert("Échec de connexion", result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      {/* ── Navy Header ──────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="wallet" size={36} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>FinanceApp</Text>
        <Text style={styles.appTagline}>Gérez votre argent intelligemment</Text>
      </View>

      {/* ── White Card ───────────────────────────────── */}
      <ScrollView
        style={styles.card}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.cardTitle}>Bon retour 👋</Text>
        <Text style={styles.cardSubtitle}>
          Connectez-vous pour accéder à votre tableau de bord
        </Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View
            style={[
              styles.inputContainer,
              focusedField === "email" && styles.inputContainerFocused,
            ]}
          >
            <Ionicons
              name="mail-outline"
              size={19}
              color={focusedField === "email" ? COLORS.accent : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              placeholderTextColor={COLORS.placeholderText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mot de passe</Text>
          <View
            style={[
              styles.inputContainer,
              focusedField === "password" && styles.inputContainerFocused,
            ]}
          >
            <Ionicons
              name="lock-closed-outline"
              size={19}
              color={focusedField === "password" ? COLORS.accent : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.placeholderText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={19}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>🔒 connexion sécurisée</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Button — teal with navy text */}
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.75 }]}
          onPress={handleLogin}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <Text style={styles.buttonText}>Se connecter</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Pas encore de compte ?</Text>
          <TouchableOpacity
            onPress={() => { clearError(); navigation.navigate("Signup"); }}
            activeOpacity={0.7}
          >
            <Text style={styles.link}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
