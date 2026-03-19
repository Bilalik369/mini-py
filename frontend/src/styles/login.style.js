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
    height: height * 0.36,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 36,
    paddingHorizontal: 24,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },

  appName: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: 1,
    marginBottom: 6,
  },

  appTagline: {
    fontSize: 14,
    color: COLORS.accentLight,
    letterSpacing: 0.3,
  },

  // ── White Card ─────────────────────────────────────
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },

  cardTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 28,
    lineHeight: 21,
  },

  // ── Inputs ─────────────────────────────────────────
  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
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
    height: 54,
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

  // ── Divider ────────────────────────────────────────
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  dividerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginHorizontal: 12,
    fontWeight: "500",
  },

  // ── Button ─────────────────────────────────────────
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 22,
    paddingBottom: 16,
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
