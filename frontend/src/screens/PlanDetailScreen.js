import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import usePlanStore from "../store/planStore";
import S from "../styles/planDetail.style";
import COLORS from "../constants/colors";

// ── Health config ─────────────────────────────────────────────────────────────
const HEALTH_CFG = {
  Excellent: { color: COLORS.accent,  icon: "trending-up",       bg: "#E6FBF9" },
  Good:      { color: "#1976D2",      icon: "checkmark-circle",  bg: "#E8F4FD" },
  Fair:      { color: "#F9A825",      icon: "alert-circle",      bg: "#FFF8E1" },
  Poor:      { color: "#E65100",      icon: "warning",           bg: "#FFF3E0" },
  Critical:  { color: "#C62828",      icon: "close-circle",      bg: "#FFEBEE" },
};

const fmt = (n) =>
  n !== undefined && n !== null
    ? Number(n).toLocaleString("fr-MA", { maximumFractionDigits: 0 })
    : "—";

export default function PlanDetailScreen({ navigation }) {
  const { currentPlan } = usePlanStore();

  if (!currentPlan) {
    return (
      <View style={[S.screen, { justifyContent: "center", alignItems: "center" }]}>
        <Ionicons name="document-outline" size={64} color={COLORS.border} />
        <Text style={{ color: COLORS.textSecondary, marginTop: 12 }}>
          Aucun plan sélectionné
        </Text>
      </View>
    );
  }

  const r   = currentPlan.plan_result;
  const cfg = HEALTH_CFG[r.financial_health] ?? HEALTH_CFG.Fair;

  const expRatio = Math.min(r.expense_ratio ?? 0, 100);
  const expColor =
    expRatio > 80 ? "#C62828" : expRatio > 55 ? "#E65100" : COLORS.accent;

  const METRICS = [
    { icon: "cash-outline",        bg: "#E8F4FD", color: "#1976D2",   value: `${fmt(r.monthly_income)} DH`,    label: "Revenu mensuel"     },
    { icon: "receipt-outline",     bg: "#FFF3E0", color: "#E65100",   value: `${fmt(r.monthly_expenses)} DH`,  label: "Dépenses mensuelles" },
    { icon: "wallet-outline",      bg: "#E6FBF9", color: COLORS.accent, value: `${fmt(r.monthly_remaining)} DH`, label: "Reste du mois"     },
    { icon: "calendar-outline",    bg: "#F3E8FF", color: "#7B1FA2",   value: `${fmt(r.annual_savings)} DH`,    label: "Épargne annuelle"   },
  ];

  return (
    <View style={S.screen}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Header ───────────────────────────────── */}
        <View style={S.header}>
          <View style={S.headerRow}>
            <TouchableOpacity style={S.backBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={S.headerTitle} numberOfLines={1}>
              {currentPlan.title}
            </Text>
          </View>

          {/* Health hero */}
          <View style={S.healthHero}>
            <View style={[S.healthCircle, { backgroundColor: cfg.color + "33" }]}>
              <Text style={[S.healthScore, { color: cfg.color }]}>
                {r.health_score}
              </Text>
            </View>
            <Text style={[S.healthLabel, { color: cfg.color }]}>
              {r.financial_health}
            </Text>
            {r.ai_enhanced && (
              <View style={S.aiBadge}>
                <Ionicons name="sparkles" size={12} color={COLORS.accentLight} />
                <Text style={S.aiBadgeText}>Plan généré par l'IA</Text>
              </View>
            )}
          </View>
        </View>

        {/* ── Savings highlight ────────────────────── */}
        <View style={S.savingsCard}>
          <View style={S.savingsLeft}>
            <Text style={S.savingsLabel}>Épargne mensuelle recommandée</Text>
            <Text style={S.savingsValue}>{fmt(r.recommended_savings)} DH</Text>
            <Text style={S.savingsSub}>
              {r.months_to_goal > 0
                ? `Objectif atteint en ${r.months_to_goal} mois`
                : "Objectif non défini"}
            </Text>
          </View>
          <View style={S.savingsRateCircle}>
            <Text style={S.savingsRateValue}>{r.savings_rate}%</Text>
            <Text style={S.savingsRateLabel}>TAUX</Text>
          </View>
        </View>

        {/* ── Metric grid ──────────────────────────── */}
        <View style={S.metricGrid}>
          {METRICS.map((m, i) => (
            <View key={i} style={S.metricCard}>
              <View style={[S.metricIconWrap, { backgroundColor: m.bg }]}>
                <Ionicons name={m.icon} size={18} color={m.color} />
              </View>
              <Text style={S.metricValue}>{m.value}</Text>
              <Text style={S.metricLabel}>{m.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Expense ratio ────────────────────────── */}
        <View style={S.progressSection}>
          <Text style={S.sectionTitle}>Ratio de dépenses</Text>
          <View style={S.progressCard}>
            <View style={S.progressRow}>
              <Text style={S.progressKey}>Dépenses / Revenu</Text>
              <Text style={[S.progressPct, { color: expColor }]}>
                {expRatio.toFixed(1)} %
              </Text>
            </View>
            <View style={S.progressTrack}>
              <View
                style={[
                  S.progressFill,
                  { width: `${expRatio}%`, backgroundColor: expColor },
                ]}
              />
            </View>
            <Text style={S.progressDesc}>
              {expRatio > 80
                ? "⚠️ Dépenses très élevées — réduisez les coûts non essentiels."
                : expRatio > 55
                ? "📊 Dépenses modérées — quelques ajustements possibles."
                : "✅ Excellente maîtrise des dépenses !"}
            </Text>
          </View>
        </View>

        {/* ── Tips ────────────────────────────────── */}
        {r.tips?.length > 0 && (
          <View style={S.tipsSection}>
            <Text style={S.sectionTitle}>Conseils personnalisés 💡</Text>
            {r.tips.map((tip, i) => (
              <View key={i} style={S.tipCard}>
                <View style={S.tipDot}>
                  <Ionicons name="bulb-outline" size={14} color="#1565C0" />
                </View>
                <Text style={S.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Footer action ────────────────────────── */}
        <TouchableOpacity
          style={S.footerBtn}
          onPress={() => navigation.navigate("CreatePlan")}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
          <Text style={S.footerBtnText}>Créer un nouveau plan</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
