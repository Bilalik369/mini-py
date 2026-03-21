import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "../store/authStore";
import styles from "../styles/signup.styles";
import COLORS from "../constants/colors";

function getStrength(pw) {
  if (!pw) return 0;
  if (pw.length < 6) return 1;
  const checks = [/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(pw)).length;
  return Math.min(checks + 1, 4);
}

const STRENGTH_COLOR = ["", "#FF6B8A", "#FFB347", "#42A5F5", "#00DCD2"];
const STRENGTH_LABEL = ["", "Faible", "Moyen", "Bon", "Fort 💪"];

export default function SignupScreen({ navigation }) {
  const [username,        setUsername]        = useState("");
  const [email,           setEmail]           = useState("");
  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword,    setShowPassword]    = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [focusedField,    setFocusedField]    = useState(null);
  const [formError,       setFormError]       = useState("");   // ← inline error

  const { register, isLoading, clearError } = useAuthStore();

  const strength        = getStrength(password);
  const passwordsMatch  = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const f = (field) => focusedField === field;

  const showError = (msg) => setFormError(msg);

  const handleRegister = async () => {
    setFormError("");
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      showError("Veuillez remplir tous les champs.");
      return;
    }
    if (username.trim().length < 3) {
      showError("Le nom d'utilisateur doit contenir au moins 3 caractères.");
      return;
    }
    if (password.length < 6) {
      showError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      showError("Les mots de passe ne correspondent pas.");
      return;
    }
    const result = await register(username.trim(), email.trim(), password);
    if (!result.success) {
      showError(result.error);
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
          <Ionicons name="person-add" size={28} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Créer un compte</Text>
        <Text style={styles.appTagline}>Rejoignez FinanceApp gratuitement</Text>
      </View>

      {/* ── White Card ───────────────────────────────── */}
      <ScrollView
        style={styles.card}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.cardTitle}>Inscription ✨</Text>
        <Text style={styles.cardSubtitle}>Quelques informations pour commencer</Text>

        {/* ── Inline error banner ───────────────────── */}
        {formError !== "" && (
          <View style={{
            flexDirection: "row", alignItems: "center",
            backgroundColor: "#FFEBEE", borderRadius: 12,
            padding: 12, marginBottom: 16, gap: 8,
            borderWidth: 1, borderColor: "#FFCDD2",
          }}>
            <Ionicons name="alert-circle" size={18} color="#C62828" />
            <Text style={{ flex: 1, fontSize: 13, color: "#C62828", fontWeight: "600" }}>
              {formError}
            </Text>
            <TouchableOpacity onPress={() => setFormError("")}>
              <Ionicons name="close" size={16} color="#C62828" />
            </TouchableOpacity>
          </View>
        )}

        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nom d'utilisateur</Text>
          <View style={[styles.inputContainer, f("username") && styles.inputContainerFocused]}>
            <Ionicons
              name="person-outline" size={19}
              color={f("username") ? COLORS.accent : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="johndoe"
              placeholderTextColor={COLORS.placeholderText}
              value={username}
              onChangeText={(t) => { setUsername(t); setFormError(""); }}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocusedField("username")}
              onBlur={() => setFocusedField(null)}
            />
            {username.length >= 3 && (
              <Ionicons name="checkmark-circle" size={19} color={COLORS.accent} />
            )}
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Adresse e-mail</Text>
          <View style={[styles.inputContainer, f("email") && styles.inputContainerFocused]}>
            <Ionicons
              name="mail-outline" size={19}
              color={f("email") ? COLORS.accent : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              placeholderTextColor={COLORS.placeholderText}
              value={email}
              onChangeText={(t) => { setEmail(t); setFormError(""); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            {email.includes("@") && email.includes(".") && (
              <Ionicons name="checkmark-circle" size={19} color={COLORS.accent} />
            )}
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={[styles.inputContainer, f("password") && styles.inputContainerFocused]}>
            <Ionicons
              name="lock-closed-outline" size={19}
              color={f("password") ? COLORS.accent : COLORS.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.placeholderText}
              value={password}
              onChangeText={(t) => { setPassword(t); setFormError(""); }}
              secureTextEntry={!showPassword}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={19} color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {password.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <View style={styles.strengthRow}>
                {[1, 2, 3, 4].map((lvl) => (
                  <View
                    key={lvl}
                    style={[
                      styles.strengthBar,
                      lvl <= strength && { backgroundColor: STRENGTH_COLOR[strength] },
                    ]}
                  />
                ))}
              </View>
              <Text style={{ fontSize: 11, marginTop: 5, color: STRENGTH_COLOR[strength], fontWeight: "700" }}>
                {STRENGTH_LABEL[strength]}
              </Text>
            </View>
          )}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmer le mot de passe</Text>
          <View style={[
            styles.inputContainer,
            f("confirm") && styles.inputContainerFocused,
            passwordsMismatch && { borderColor: COLORS.error },
            passwordsMatch    && { borderColor: COLORS.accent },
          ]}>
            <Ionicons
              name="shield-checkmark-outline" size={19}
              color={
                passwordsMismatch ? COLORS.error
                  : passwordsMatch ? COLORS.accent
                  : f("confirm")  ? COLORS.accent
                  : COLORS.textSecondary
              }
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={COLORS.placeholderText}
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setFormError(""); }}
              secureTextEntry={!showConfirm}
              onFocus={() => setFocusedField("confirm")}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
              <Ionicons
                name={showConfirm ? "eye-outline" : "eye-off-outline"}
                size={19} color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {passwordsMismatch && (
            <Text style={{ fontSize: 11, color: COLORS.error, marginTop: 5, fontWeight: "600" }}>
              ✕ Les mots de passe ne correspondent pas
            </Text>
          )}
          {passwordsMatch && (
            <Text style={{ fontSize: 11, color: COLORS.accent, marginTop: 5, fontWeight: "600" }}>
              ✓ Les mots de passe correspondent
            </Text>
          )}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.75 }]}
          onPress={handleRegister}
          disabled={isLoading}
          activeOpacity={0.85}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <Text style={styles.buttonText}>Créer mon compte</Text>
          )}
        </TouchableOpacity>


        <View style={styles.footer}>
          <Text style={styles.footerText}>Déjà un compte ?</Text>
          <TouchableOpacity
            onPress={() => { clearError(); setFormError(""); navigation.navigate("Login"); }}
            activeOpacity={0.7}
          >
            <Text style={styles.link}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
