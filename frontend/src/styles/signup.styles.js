import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  // ── Navy Header ────────────────────────────────────
  header: {
    height: height * 0.26,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 28,
    paddingHorizontal: 24,
  },

  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.accentPink,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: COLORS.accentPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  appTagline: {
    fontSize: 13,
    color: COLORS.accentLight,
  },

  // ── White Card ─────────────────────────────────────
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 22,
    lineHeight: 19,
  },

  // ── Inputs ─────────────────────────────────────────
  inputGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 7,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    height: 52,
  },

  inputContainerFocused: {
    borderColor: COLORS.accent,
    backgroundColor: "#EEFFFE",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textDark,
  },

  eyeIcon: {
    padding: 6,
  },

  // ── Password strength ──────────────────────────────
  strengthRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 5,
  },

  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },

  // ── Button ─────────────────────────────────────────
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },

  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  // ── Footer ─────────────────────────────────────────
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    paddingBottom: 20,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  link: {
    color: COLORS.accent,
    fontWeight: "800",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default styles;
