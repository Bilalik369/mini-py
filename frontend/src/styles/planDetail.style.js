import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");

const S = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },

  // ── Header ───────────────────────────────────────────
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 52,
    paddingHorizontal: 22,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 14,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
  },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: "800", color: COLORS.white },

  // Health hero
  healthHero: { alignItems: "center" },
  healthCircle: {
    width: 72, height: 72, borderRadius: 36,
    justifyContent: "center", alignItems: "center",
    marginBottom: 8,
  },
  healthScore: { fontSize: 26, fontWeight: "900", color: COLORS.white },
  healthLabel: { fontSize: 14, fontWeight: "700", color: "rgba(255,255,255,0.85)" },
  aiBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4,
    marginTop: 8,
  },
  aiBadgeText: { fontSize: 11, color: COLORS.accentLight, fontWeight: "600" },

  // ── Metric grid ──────────────────────────────────────
  metricGrid: {
    flexDirection: "row", flexWrap: "wrap",
    paddingHorizontal: 16, gap: 10, marginTop: 20,
  },
  metricCard: {
    width: (width - 52) / 2,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16, padding: 14,
    borderWidth: 1.5, borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  metricIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: "center", alignItems: "center",
    marginBottom: 8,
  },
  metricValue: { fontSize: 18, fontWeight: "800", color: COLORS.textDark },
  metricLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },

  // ── Savings highlight ────────────────────────────────
  savingsCard: {
    marginHorizontal: 20, marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 20, padding: 20,
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  savingsLeft:  { flex: 1 },
  savingsLabel: { fontSize: 12, color: COLORS.accentLight, marginBottom: 4 },
  savingsValue: { fontSize: 28, fontWeight: "900", color: COLORS.white },
  savingsSub:   { fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 },
  savingsRight: { alignItems: "center" },
  savingsRateCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.accent,
    justifyContent: "center", alignItems: "center",
  },
  savingsRateValue: { fontSize: 16, fontWeight: "900", color: COLORS.primary },
  savingsRateLabel: { fontSize: 9, color: COLORS.primary, fontWeight: "700" },

  // ── Expense progress ────────────────────────────────
  progressSection: { marginHorizontal: 20, marginTop: 20 },
  sectionTitle: {
    fontSize: 14, fontWeight: "700", color: COLORS.primary, marginBottom: 10,
  },
  progressCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16, padding: 16,
    borderWidth: 1.5, borderColor: COLORS.border,
  },
  progressRow: {
    flexDirection: "row", justifyContent: "space-between",
    marginBottom: 8,
  },
  progressKey:   { fontSize: 13, color: COLORS.textSecondary },
  progressPct:   { fontSize: 13, fontWeight: "700", color: COLORS.primary },
  progressTrack: {
    height: 10, borderRadius: 5,
    backgroundColor: COLORS.border, overflow: "hidden",
  },
  progressFill:  { height: "100%", borderRadius: 5 },
  progressDesc:  { fontSize: 11, color: COLORS.textSecondary, marginTop: 8 },

  // ── Tips ─────────────────────────────────────────────
  tipsSection: { marginHorizontal: 20, marginTop: 20 },
  tipCard: {
    flexDirection: "row", alignItems: "flex-start",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14, padding: 14, marginBottom: 10,
    borderWidth: 1.5, borderColor: COLORS.border, gap: 10,
  },
  tipDot: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#E8F4FD",
    justifyContent: "center", alignItems: "center",
    flexShrink: 0,
  },
  tipText: { flex: 1, fontSize: 13, color: COLORS.textDark, lineHeight: 19 },

  // ── Footer button ────────────────────────────────────
  footerBtn: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20, marginTop: 24,
    backgroundColor: COLORS.accent,
    borderRadius: 16, height: 54, gap: 10,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
  footerBtnText: { fontSize: 15, fontWeight: "800", color: COLORS.primary },
});

export default S;
