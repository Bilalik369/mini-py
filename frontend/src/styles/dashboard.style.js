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
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 13, color: COLORS.accentLight, marginBottom: 2 },
  username: { fontSize: 22, fontWeight: "800", color: COLORS.white },

  avatarCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.accent,
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { fontSize: 17, fontWeight: "800", color: COLORS.primary },

  // ── Summary banner ───────────────────────────────────
  summaryBanner: {
    marginTop: 18,
    flexDirection: "row",
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
  },
  summaryValue: { fontSize: 18, fontWeight: "800", color: COLORS.white },
  summaryLabel: { fontSize: 11, color: COLORS.accentLight, marginTop: 2 },

  // ── CTA button ───────────────────────────────────────
  ctaWrap: { paddingHorizontal: 22, marginTop: 22 },
  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    height: 56,
    gap: 10,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaText: { fontSize: 16, fontWeight: "800", color: COLORS.primary },

  // ── Section title ────────────────────────────────────
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    paddingHorizontal: 22,
    marginTop: 24,
    marginBottom: 12,
  },

  // ── Plan card ────────────────────────────────────────
  planCard: {
    marginHorizontal: 22,
    marginBottom: 12,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  planCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  planTitle: { fontSize: 15, fontWeight: "700", color: COLORS.textDark, flex: 1 },
  healthBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 8,
  },
  healthBadgeText: { fontSize: 11, fontWeight: "700" },

  planMeta: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6 },
  planSavings: { fontSize: 18, fontWeight: "800", color: COLORS.primary, marginTop: 6 },
  planSavingsLabel: { fontSize: 11, color: COLORS.textSecondary },

  planProgressRow: { flexDirection: "row", alignItems: "center", marginTop: 10, gap: 8 },
  progressTrack: {
    flex: 1, height: 6, borderRadius: 3,
    backgroundColor: COLORS.border,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3 },
  progressLabel: { fontSize: 11, color: COLORS.textSecondary, width: 36, textAlign: "right" },

  // ── Empty state ──────────────────────────────────────
  emptyWrap: { alignItems: "center", paddingVertical: 40, paddingHorizontal: 32 },
  emptyText: { fontSize: 15, fontWeight: "600", color: COLORS.textSecondary, marginTop: 12, textAlign: "center" },
  emptySubText: { fontSize: 13, color: COLORS.placeholderText, marginTop: 6, textAlign: "center" },

  // ── Logout ───────────────────────────────────────────
  logoutRow: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: 22, marginTop: 8,
  },
  logoutText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "600" },
});

export default S;
