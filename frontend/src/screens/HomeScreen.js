import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import styles from "../styles/home.style";
import COLORS from "../constants/colors";

const QUICK_ACTIONS = [
  {
    id: "1",
    label: "Envoyer",
    desc: "Transfert rapide",
    icon: "paper-plane",
    bg: COLORS.primary,
    iconColor: COLORS.white,
  },
  {
    id: "2",
    label: "Recevoir",
    desc: "Demander un paiement",
    icon: "download-outline",
    bg: COLORS.accent,
    iconColor: COLORS.primary,
  },
  {
    id: "3",
    label: "Statistiques",
    desc: "Voir les dépenses",
    icon: "bar-chart-outline",
    bg: "#FFF0F5",
    iconColor: COLORS.accentPink,
  },
  {
    id: "4",
    label: "Historique",
    desc: "Toutes vos transactions",
    icon: "time-outline",
    bg: "#F0FFFE",
    iconColor: COLORS.accent,
  },
];

export default function HomeScreen({ navigation }) {
  const lottieRef = useRef(null);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── Lottie Animation ─────────────────────── */}
        <View style={styles.animationSection}>
          <LottieView
            ref={lottieRef}
            source={require("../../assets/Finance - Paper plane.json")}
            style={styles.animationWrapper}
            autoPlay
            loop
          />
          <Text style={styles.animationTitle}>Vos finances, en vol ✈️</Text>
          <Text style={styles.animationSubtitle}>
            Envoyez de l'argent partout dans le monde rapidement et en toute sécurité.
          </Text>
        </View>

        {/* ── Sign In / Sign Up buttons ────────────── */}
        <View style={styles.authButtons}>
          <TouchableOpacity
            style={styles.btnSignIn}
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.85}
          >
            <Ionicons name="log-in-outline" size={20} color={COLORS.white} style={{ marginRight: 8 }} />
            <Text style={styles.btnSignInText}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => navigation.navigate("Signup")}
            activeOpacity={0.85}
          >
            <Ionicons name="person-add-outline" size={20} color={COLORS.primary} style={{ marginRight: 8 }} />
            <Text style={styles.btnSignUpText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        {/* ── Quick Actions ────────────────────────── */}
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIconCircle, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon} size={22} color={action.iconColor} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Text style={styles.actionDesc}>{action.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
