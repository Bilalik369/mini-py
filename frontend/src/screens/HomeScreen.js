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

const FEATURES = [
  {
    id: "1",
    icon: "wallet-outline",
    iconBg: COLORS.primary,
    iconColor: COLORS.white,
    title: "Suivi des dépenses",
    desc: "Visualisez où va votre argent chaque mois et gardez le contrôle.",
  },
  {
    id: "2",
    icon: "trending-up-outline",
    iconBg: COLORS.accent,
    iconColor: COLORS.primary,
    title: "Objectifs d'épargne",
    desc: "Fixez vos objectifs et suivez votre progression en temps réel.",
  },
  {
    id: "3",
    icon: "pie-chart-outline",
    iconBg: "#FFF0F5",
    iconColor: COLORS.accentPink,
    title: "Budgets intelligents",
    desc: "Créez des budgets par catégorie et évitez les mauvaises surprises.",
  },
  {
    id: "4",
    icon: "shield-checkmark-outline",
    iconBg: "#F0FFFE",
    iconColor: COLORS.accent,
    title: "100% Sécurisé",
    desc: "Vos données financières sont protégées et chiffrées.",
  },
];

export default function HomeScreen({ navigation }) {
  const lottieRef = useRef(null);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── Lottie Animation ─────────────────────── */}
        <View style={styles.animationSection}>
          <LottieView
            ref={lottieRef}
            source={require("../../assets/Finance - Paper plane.json")}
            style={styles.animationWrapper}
            autoPlay
            loop
          />
          <Text style={styles.animationTitle}>Gérez votre argent 💰</Text>
          <Text style={styles.animationSubtitle}>
            Organisez vos finances, suivez vos dépenses et atteignez vos objectifs d'épargne facilement.
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

        {/* ── Features ─────────────────────────────── */}
        <Text style={styles.sectionTitle}>Pourquoi FinanceApp ?</Text>
        <View style={styles.featuresList}>
          {FEATURES.map((f) => (
            <View key={f.id} style={styles.featureCard}>
              <View style={[styles.featureIconCircle, { backgroundColor: f.iconBg }]}>
                <Ionicons name={f.icon} size={22} color={f.iconColor} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
