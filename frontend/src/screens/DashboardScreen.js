import React, { useEffect, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import useAuthStore from "../store/authStore";
import usePlanStore from "../store/planStore";
import S from "../styles/dashboard.style";
import COLORS from "../constants/colors";

// ── Health badge colours ──────────────────────────────────────────────────────
const HEALTH_COLOR = {
  Excellent: { bg: "#E6FBF9", text: COLORS.accent },
  Good:      { bg: "#E8F4FD", text: "#1976D2"     },
  Fair:      { bg: "#FFF8E1", text: "#F9A825"     },
  Poor:      { bg: "#FFF3E0", text: "#E65100"     },
  Critical:  { bg: "#FFEBEE", text: "#C62828"     },
};

function HealthBadge({ label }) {
  const c = HEALTH_COLOR[label] ?? { bg: COLORS.border, text: COLORS.textSecondary };
  return (
    <View style={[S.healthBadge, { backgroundColor: c.bg }]}>
      <Text style={[S.healthBadgeText, { color: c.text }]}>{label}</Text>
    </View>
  );
}

function PlanCard({ plan, onPress }) {
  const r  = plan.plan_result;
  const sr = Math.min(r.savings_rate ?? 0, 100);

  return (
    <TouchableOpacity style={S.planCard} onPress={onPress} activeOpacity={0.8}>
      <View style={S.planCardRow}>
        <Text style={S.planTitle} numberOfLines={1}>{plan.title}</Text>
        <HealthBadge label={r.financial_health} />
      </View>

      <Text style={S.planMeta}>
        Revenu : {r.monthly_income?.toLocaleString()} DH  •  Dépenses : {r.monthly_expenses?.toLocaleString()} DH
      </Text>

      <Text style={S.planSavings}>{r.recommended_savings?.toLocaleString()} DH</Text>
      <Text style={S.planSavingsLabel}>Épargne mensuelle recommandée</Text>

      <View style={S.planProgressRow}>
        <View style={S.progressTrack}>
          <View
            style={[
              S.progressFill,
              { width: `${sr}%`, backgroundColor: COLORS.accent },
            ]}
          />
        </View>
        <Text style={S.progressLabel}>{sr.toFixed(0)} %</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function DashboardScreen({ navigation }) {
  const { user, logout }            = useAuthStore();
  const { plans, isLoading, fetchPlans, setCurrentPlan } = usePlanStore();

  // Reload plans each time this screen comes into focus
  useFocusEffect(
    useCallback(() => { fetchPlans(); }, [])
  );

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "U";

  const totalSaved = plans.reduce(
    (acc, p) => acc + (p.plan_result?.recommended_savings ?? 0), 0
  );
  const bestHealth = plans.length
    ? plans.reduce((best, p) => {
        const order = ["Critical", "Poor", "Fair", "Good", "Excellent"];
        return order.indexOf(p.plan_result?.financial_health) >
               order.indexOf(best)
          ? p.plan_result.financial_health
          : best;
      }, "Critical")
    : "—";

  const handleLogout = () => {
    usePlanStore.getState().clearPlans();
    logout();
  };

  return (
    <View style={S.screen}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchPlans}
            tintColor={COLORS.accent}
          />
        }
      >
        {/* ── Header ──────────────────────────────── */}
        <View style={S.header}>
          <View style={S.headerRow}>
            <View>
              <Text style={S.greeting}>Bienvenue 👋</Text>
              <Text style={S.username}>{user?.username ?? "Utilisateur"}</Text>
            </View>
            <View style={S.avatarCircle}>
              <Text style={S.avatarText}>{initials}</Text>
            </View>
          </View>

          {/* Summary banner */}
          <View style={S.summaryBanner}>
            <View style={S.summaryCard}>
              <Text style={S.summaryValue}>{plans.length}</Text>
              <Text style={S.summaryLabel}>Plans créés</Text>
            </View>
            <View style={S.summaryCard}>
              <Text style={S.summaryValue}>{totalSaved.toFixed(0)} DH</Text>
              <Text style={S.summaryLabel}>Épargne totale / mois</Text>
            </View>
            <View style={S.summaryCard}>
              <Text style={S.summaryValue}>{bestHealth}</Text>
              <Text style={S.summaryLabel}>Meilleure santé</Text>
            </View>
          </View>
        </View>

        {/* ── CTA ─────────────────────────────────── */}
        <View style={S.ctaWrap}>
          <TouchableOpacity
            style={S.ctaBtn}
            onPress={() => navigation.navigate("CreatePlan")}
            activeOpacity={0.85}
          >
            <Ionicons name="add-circle-outline" size={22} color={COLORS.primary} />
            <Text style={S.ctaText}>Créer un nouveau plan</Text>
          </TouchableOpacity>
        </View>

        {/* ── Plans list ──────────────────────────── */}
        <Text style={S.sectionTitle}>
          {plans.length > 0 ? `Mes plans (${plans.length})` : "Mes plans"}
        </Text>

        {isLoading && plans.length === 0 ? (
          <ActivityIndicator
            size="large"
            color={COLORS.accent}
            style={{ marginTop: 40 }}
          />
        ) : plans.length === 0 ? (
          <View style={S.emptyWrap}>
            <Ionicons name="document-text-outline" size={56} color={COLORS.border} />
            <Text style={S.emptyText}>Aucun plan pour l'instant</Text>
            <Text style={S.emptySubText}>
              Créez votre premier plan financier et laissez l'IA vous guider.
            </Text>
          </View>
        ) : (
          plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onPress={() => {
                setCurrentPlan(plan);
                navigation.navigate("PlanDetail");
              }}
            />
          ))
        )}

        {/* ── Logout ──────────────────────────────── */}
        <TouchableOpacity style={S.logoutRow} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={16} color={COLORS.textSecondary} />
          <Text style={S.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
