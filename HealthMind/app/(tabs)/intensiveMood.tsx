"use client"

import { useState, useRef } from "react"
import { Animated, View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Image, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

const dailyChallenges = [
  {
    id: 1,
    day: 1,
    title: "Gratidão Matinal",
    description: "Liste 3 coisas pelas quais você é grato hoje",
    icon: "sunny-outline",
    completed: true,
    xp: 50,
    difficulty: "Fácil",
  },
  {
    id: 2,
    day: 2,
    title: "Respiração Consciente",
    description: "5 minutos de respiração profunda e mindfulness",
    icon: "leaf-outline",
    completed: true,
    xp: 75,
    difficulty: "Fácil",
  },
  {
    id: 3,
    day: 3,
    title: "Ato de Bondade",
    description: "Faça algo gentil por alguém hoje",
    icon: "heart-outline",
    completed: true,
    xp: 100,
    difficulty: "Médio",
  },
  {
    id: 4,
    day: 4,
    title: "Movimento Feliz",
    description: "30 minutos de atividade física que você goste",
    icon: "fitness-outline",
    completed: false,
    xp: 125,
    difficulty: "Médio",
    current: true,
  },
  {
    id: 5,
    day: 5,
    title: "Conexão Social",
    description: "Converse com um amigo ou familiar querido",
    icon: "people-outline",
    completed: false,
    xp: 100,
    difficulty: "Fácil",
  },
  {
    id: 6,
    day: 6,
    title: "Criatividade",
    description: "Dedique tempo a uma atividade criativa",
    icon: "color-palette-outline",
    completed: false,
    xp: 150,
    difficulty: "Médio",
  },
  {
    id: 7,
    day: 7,
    title: "Reflexão Semanal",
    description: "Reflita sobre seus progressos e conquistas",
    icon: "journal-outline",
    completed: false,
    xp: 200,
    difficulty: "Difícil",
  },
]

const achievements = [
  {
    id: 1,
    title: "Primeiro Passo",
    description: "Complete seu primeiro desafio",
    icon: "trophy-outline",
    unlocked: true,
  },
  { id: 2, title: "Sequência de 3", description: "Complete 3 dias seguidos", icon: "flame-outline", unlocked: true },
  { id: 3, title: "Uma Semana", description: "Complete 7 dias de desafios", icon: "ribbon-outline", unlocked: false },
]

export default function IntensiveMoodScreen() {
  const [currentStreak, setCurrentStreak] = useState(3)
  const [totalXP, setTotalXP] = useState(225)
  const [selectedTab, setSelectedTab] = useState("challenges")
  const scrollY = useRef(new Animated.Value(0)).current

  // Calcule a altura dinâmica baseada na sessão ativa
  const itemCount = selectedTab === "challenges" ? dailyChallenges.length : achievements.length
  // Exemplo: cada item ocupa 120px + padding, ajuste conforme seu design
  const estimatedItemHeight = 120
  const baseHeight = 220 // altura do header + tabs + padding
  const initialTop = height * 0.45; // ajuste esse valor para ficar logo abaixo da barra de progresso


  const completedChallenges = dailyChallenges.filter((challenge) => challenge.completed).length
  const progressPercentage = (completedChallenges / dailyChallenges.length) * 100

  const renderChallengeCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.challengeCard, item.completed && styles.completedCard, item.current && styles.currentCard]}
      activeOpacity={0.8}
    >
      <View style={styles.challengeHeader}>
        <View style={[styles.challengeIconContainer, item.completed && styles.completedIconContainer]}>
          <Ionicons
            name={item.completed ? "checkmark" : item.icon}
            size={24}
            color={item.completed ? "#FFFFFF" : "#A259F7"}
          />
        </View>
        <View style={styles.challengeInfo}>
          <View style={styles.challengeTitleRow}>
            <Text style={styles.challengeDay}>Dia {item.day}</Text>
            <View style={[styles.difficultyBadge, getDifficultyStyle(item.difficulty)]}>
              <Text style={[styles.difficultyText, getDifficultyTextStyle(item.difficulty)]}>{item.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.challengeTitle}>{item.title}</Text>
          <Text style={styles.challengeDescription}>{item.description}</Text>
        </View>
        <View style={styles.challengeReward}>
          <Text style={styles.xpText}>+{item.xp} XP</Text>
        </View>
      </View>

      {item.current && (
        <TouchableOpacity style={styles.startButtonWrapper} activeOpacity={0.8}>
          <LinearGradient
            colors={["#A259F7", "#c85efd", "#be41fd"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButton}
          >
            <Ionicons name="play" size={16} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Começar Desafio</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )

  const renderAchievement = ({ item }) => (
    <View style={[styles.achievementCard, !item.unlocked && styles.lockedAchievement]}>
      <View style={[styles.achievementIcon, item.unlocked && styles.unlockedIcon]}>
        <Ionicons name={item.icon} size={24} color={item.unlocked ? "#FFC107" : "#9CA3AF"} />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[styles.achievementTitle, !item.unlocked && styles.lockedText]}>{item.title}</Text>
        <Text style={[styles.achievementDescription, !item.unlocked && styles.lockedText]}>{item.description}</Text>
      </View>
    </View>
  )

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Fácil":
        return styles.easyBadge
      case "Médio":
        return styles.mediumBadge
      case "Difícil":
        return styles.hardBadge
      default:
        return styles.easyBadge
    }
  }

  const getDifficultyTextStyle = (difficulty) => {
    switch (difficulty) {
      case "Fácil":
        return styles.easyText
      case "Médio":
        return styles.mediumText
      case "Difícil":
        return styles.hardText
      default:
        return styles.easyText
    }
  }

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.imageLogo}
            />
        <Text style={styles.appTitle}>Intensivo Dias Felizes</Text>
        <Text style={styles.subtitle}>7 dias para transformar seu humor</Text>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="flame" size={20} color="#FFC107" />
            </View>
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Sequência</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="star" size={20} color="#FFC107" />
            </View>
            <Text style={styles.statNumber}>{totalXP}</Text>
            <Text style={styles.statLabel}>XP Total</Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{completedChallenges}/7</Text>
            <Text style={styles.statLabel}>Completos</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={["#10B981", "#34D399"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${progressPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{Math.round(progressPercentage)}% completo</Text>
        </View>
      </View>

      {/* Animated Content Section */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            backgroundColor: "#FFFFFF",
            position: "absolute",
            left: 0,
            right: 0,
            top: scrollY.interpolate({
              inputRange: [0, 180],
              outputRange: [initialTop, height * 0.2], // começa abaixo da barra de progresso, sobe até 20% do topo
              extrapolate: "clamp",
            }),
            height: scrollY.interpolate({
              inputRange: [0, 180],
              outputRange: [height - initialTop, height - height * 0.2], // altura acompanha o movimento
              extrapolate: "clamp",
            }),
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          },
        ]}
      >
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "challenges" && styles.activeTab]}
              onPress={() => setSelectedTab("challenges")}
              >
              <Text style={[styles.tabText, selectedTab === "challenges" && styles.activeTabText]}>Desafios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "achievements" && styles.activeTab]}
              onPress={() => setSelectedTab("achievements")}
            >
              <Text style={[styles.tabText, selectedTab === "achievements" && styles.activeTabText]}>Conquistas</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {selectedTab === "challenges" ? (
            <View>
              {dailyChallenges.map((item) => renderChallengeCard({ item }))}
            </View>
          ) : (
            <View>
              {achievements.map((item) => renderAchievement({ item }))}
            </View>
          )}

          <View style={styles.androidBottomSpacing} />
        </Animated.ScrollView>
      </Animated.View>
          </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  imageLogo: {
    width: 100,
    height: 100,
    marginTop: 60,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    zIndex: 3,
    paddingBottom: 30,
    marginTop: 50,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    padding: 4,

  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeTabText: {
    color: "#A259F7",
    fontWeight: "600",
  },
  challengesList: {
    paddingBottom: 20,
  },
  challengeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: "#F3F4F6",
  },
  completedCard: {
    borderColor: "#10B981",
    backgroundColor: "#F0FDF4",
  },
  currentCard: {
    borderColor: "#A259F7",
    backgroundColor: "#FAF5FF",
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  challengeIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  completedIconContainer: {
    backgroundColor: "#10B981",
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  challengeDay: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A259F7",
    textTransform: "uppercase",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  easyBadge: {
    backgroundColor: "#D1FAE5",
  },
  mediumBadge: {
    backgroundColor: "#FEF3C7",
  },
  hardBadge: {
    backgroundColor: "#FEE2E2",
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "600",
  },
  easyText: {
    color: "#065F46",
  },
  mediumText: {
    color: "#92400E",
  },
  hardText: {
    color: "#991B1B",
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  challengeReward: {
    alignItems: "flex-end",
  },
  xpText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A259F7",
  },
  startButtonWrapper: {
    marginTop: 16,
    borderRadius: 12,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 16,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  achievementsList: {
    paddingBottom: 20,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lockedAchievement: {
    opacity: 0.6,
    marginBottom: 40,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  unlockedIcon: {
    backgroundColor: "#FEF3C7",
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  lockedText: {
    color: "#9CA3AF",
  },
  androidBottomSpacing: {
    height: 24,
  },
})
