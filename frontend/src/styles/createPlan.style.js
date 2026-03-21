import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

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
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center", alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "800", color: COLORS.white },
  headerSub:   { fontSize: 13, color: COLORS.accentLight, marginTop: 2 },

  // ── Form card ────────────────────────────────────────
  formCard: {
    margin: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },

  // ── Input group ──────────────────────────────────────
  inputGroup: { marginBottom: 18 },
  label: {
    fontSize: 12, fontWeight: "700",
    color: COLORS.primary, marginBottom: 8,
    letterSpacing: 0.6, textTransform: "uppercase",
  },
  inputRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14, borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14, height: 52,
  },
  inputRowFocused: {
    borderColor: COLORS.accent,
    backgroundColor: "#EEFFFE",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18, shadowRadius: 6,
    elevation: 3,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: COLORS.textDark },

  textArea: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14, borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: COLORS.textDark,
    height: 80, textAlignVertical: "top",
  },

  // ── Hint row ─────────────────────────────────────────
  hintRow: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#E8F4FD",
    borderRadius: 12, padding: 12,
    marginBottom: 20, gap: 8,
  },
  hintText: { flex: 1, fontSize: 12, color: "#1565C0", lineHeight: 17 },

  // ── Submit ───────────────────────────────────────────
  submitBtn: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 16, height: 56,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 10,
    elevation: 6,
  },
  submitBtnDisabled: { opacity: 0.65 },
  submitText: { fontSize: 16, fontWeight: "800", color: COLORS.white, letterSpacing: 0.4 },
});

export default S;
