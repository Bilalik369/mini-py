import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Lottie section ─────────────────────────────────
  animationSection: {
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 8,
  },

  animationWrapper: {
    width: width * 0.88,
    height: width * 0.88,
  },

  animationTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: -12,
    marginBottom: 8,
    textAlign: "center",
  },

  animationSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 21,
    paddingHorizontal: 28,
    marginBottom: 24,
  },

  // ── Auth buttons ───────────────────────────────────
  authButtons: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },

  btnSignIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    height: 56,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  btnSignInText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  btnSignUp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    height: 56,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  btnSignUpText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  // ── Quick actions ──────────────────────────────────
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 14,
    paddingHorizontal: 24,
  },

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
  },

  actionCard: {
    width: (width - 56) / 2,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 18,
    alignItems: "flex-start",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  actionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 3,
  },

  actionDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },

});

export default styles;
