import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Alert,
  ActivityIndicator, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import usePlanStore from "../store/planStore";
import S from "../styles/createPlan.style";
import COLORS from "../constants/colors";

export default function CreatePlanScreen({ navigation }) {
  const [title,    setTitle]    = useState("");
  const [income,   setIncome]   = useState("");
  const [expenses, setExpenses] = useState("");
  const [goal,     setGoal]     = useState("");
  const [notes,    setNotes]    = useState("");
  const [focused,  setFocused]  = useState(null);

  const { createPlan, isLoading } = usePlanStore();

  const f = (field) => focused === field;

  const handleSubmit = async () => {
    if (!title.trim() || !income || !expenses || !goal) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const inc = parseFloat(income);
    const exp = parseFloat(expenses);
    const gl  = parseFloat(goal);

    if (isNaN(inc) || isNaN(exp) || isNaN(gl) || inc <= 0) {
      Alert.alert("Valeurs invalides", "Veuillez entrer des montants numériques valides.");
      return;
    }
    if (exp >= inc) {
      Alert.alert(
        "Dépenses trop élevées",
        "Les dépenses mensuelles doivent être inférieures au revenu disponible."
      );
      return;
    }

    const result = await createPlan({
      title:             title.trim(),
      available_amount:  inc,
      monthly_expenses:  exp,
      savings_goal:      gl,
      notes:             notes.trim() || null,
    });

    if (result.success) {
      navigation.replace("PlanDetail");
    } else {
      Alert.alert("Erreur", result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={S.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      {/* ── Header ───────────────────────────────── */}
      <View style={S.header}>
        <TouchableOpacity style={S.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <View>
          <Text style={S.headerTitle}>Nouveau plan</Text>
          <Text style={S.headerSub}>Analyse AI de vos finances</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={S.formCard}>

          {/* Hint */}
          <View style={S.hintRow}>
            <Ionicons name="sparkles" size={16} color="#1565C0" />
            <Text style={S.hintText}>
              L'IA analysera vos données et générera un plan d'épargne personnalisé.
            </Text>
          </View>

          {/* Title */}
          <View style={S.inputGroup}>
            <Text style={S.label}>Titre du plan *</Text>
            <View style={[S.inputRow, f("title") && S.inputRowFocused]}>
              <Ionicons
                name="create-outline" size={19}
                color={f("title") ? COLORS.accent : COLORS.textSecondary}
                style={S.inputIcon}
              />
              <TextInput
                style={S.input}
                placeholder="Ex : Plan épargne 2025"
                placeholderTextColor={COLORS.placeholderText}
                value={title}
                onChangeText={setTitle}
                onFocus={() => setFocused("title")}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Income */}
          <View style={S.inputGroup}>
            <Text style={S.label}>Revenu mensuel disponible (DH) *</Text>
            <View style={[S.inputRow, f("income") && S.inputRowFocused]}>
              <Ionicons
                name="cash-outline" size={19}
                color={f("income") ? COLORS.accent : COLORS.textSecondary}
                style={S.inputIcon}
              />
              <TextInput
                style={S.input}
                placeholder="Ex : 50000"
                placeholderTextColor={COLORS.placeholderText}
                value={income}
                onChangeText={setIncome}
                keyboardType="numeric"
                onFocus={() => setFocused("income")}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Expenses */}
          <View style={S.inputGroup}>
            <Text style={S.label}>Dépenses mensuelles (DH) *</Text>
            <View style={[S.inputRow, f("expenses") && S.inputRowFocused]}>
              <Ionicons
                name="receipt-outline" size={19}
                color={f("expenses") ? COLORS.accent : COLORS.textSecondary}
                style={S.inputIcon}
              />
              <TextInput
                style={S.input}
                placeholder="Ex : 30000"
                placeholderTextColor={COLORS.placeholderText}
                value={expenses}
                onChangeText={setExpenses}
                keyboardType="numeric"
                onFocus={() => setFocused("expenses")}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Goal */}
          <View style={S.inputGroup}>
            <Text style={S.label}>Objectif d'épargne (DH) *</Text>
            <View style={[S.inputRow, f("goal") && S.inputRowFocused]}>
              <Ionicons
                name="flag-outline" size={19}
                color={f("goal") ? COLORS.accent : COLORS.textSecondary}
                style={S.inputIcon}
              />
              <TextInput
                style={S.input}
                placeholder="Ex : 100000"
                placeholderTextColor={COLORS.placeholderText}
                value={goal}
                onChangeText={setGoal}
                keyboardType="numeric"
                onFocus={() => setFocused("goal")}
                onBlur={() => setFocused(null)}
              />
            </View>
          </View>

          {/* Notes */}
          <View style={S.inputGroup}>
            <Text style={S.label}>Notes (optionnel)</Text>
            <TextInput
              style={[S.textArea, f("notes") && { borderColor: COLORS.accent }]}
              placeholder="Remarques ou objectifs supplémentaires…"
              placeholderTextColor={COLORS.placeholderText}
              value={notes}
              onChangeText={setNotes}
              multiline
              onFocus={() => setFocused("notes")}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[S.submitBtn, isLoading && S.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color={COLORS.white} />
                <Text style={S.submitText}>Générer mon plan AI</Text>
              </>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
