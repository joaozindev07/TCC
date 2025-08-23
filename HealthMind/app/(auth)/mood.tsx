"use client"

import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native"
import { useRouter } from "expo-router"

const { width } = Dimensions.get("window")

export default function HomePage() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [dailyNote, setDailyNote] = useState("")

  const moods = [
    { emoji: "😊", label: "Feliz", color: "#10B981" },
    { emoji: "😌", label: "Calmo", color: "#3B82F6" },
    { emoji: "😔", label: "Triste", color: "#6B7280" },
    { emoji: "😰", label: "Ansioso", color: "#F59E0B" },
    { emoji: "😡", label: "Irritado", color: "#EF4444" },
  ]

  const professionals = [
    { name: "Dra. Ana Silva", specialty: "Ansiedade e Depressão", rating: "4.9", available: true },
    { name: "Dr. Carlos Lima", specialty: "Terapia Cognitiva", rating: "4.8", available: true },
    { name: "Dra. Maria Santos", specialty: "Relacionamentos", rating: "4.9", available: false },
  ]

  const resources = [
    { title: "Meditação Guiada", type: "Áudio", duration: "10 min", category: "meditation" },
    { title: "Técnicas de Respiração", type: "Artigo", duration: "5 min", category: "breathing" },
    { title: "Podcast: Mindfulness", type: "Podcast", duration: "25 min", category: "podcast" },
    { title: "Exercícios de Gratidão", type: "Vídeo", duration: "8 min", category: "gratitude" },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.headerContainer}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Bem-vindo ao seu{"\n"}espaço de bem-estar</Text>
              <Text style={styles.heroSubtitle}>
                Conecte-se com profissionais e recursos para cuidar da sua saúde mental
              </Text>

              {/* Search Bar */}
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar recursos, profissionais..."
                  placeholderTextColor="#6B7280"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchIcon}>🔍</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/profile")}>
              <View style={styles.profileIcon}>
                <Text style={styles.profileIconText}>👤</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Abstract Illustration Placeholder */}
          <View style={styles.heroIllustration}>
            <View style={styles.illustrationCircle1} />
            <View style={styles.illustrationCircle2} />
            <View style={styles.illustrationCircle3} />
          </View>
        </View>

        {/* Daily Mood Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como você está se sentindo hoje?</Text>
          <View style={styles.moodContainer}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === mood.label && { ...styles.moodButtonSelected, borderColor: mood.color },
                ]}
                onPress={() => setSelectedMood(mood.label)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[styles.moodLabel, selectedMood === mood.label && { color: mood.color }]}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedMood && (
            <View style={styles.noteContainer}>
              <TextInput
                style={styles.noteInput}
                placeholder={`Conte mais sobre como você está se sentindo ${selectedMood.toLowerCase()}...`}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                value={dailyNote}
                onChangeText={setDailyNote}
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.saveNoteButton}>
                <Text style={styles.saveNoteText}>Salvar reflexão</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Connection to Professionals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conecte-se com profissionais</Text>
          <Text style={styles.sectionSubtitle}>Psicólogos e terapeutas especializados</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.professionalsScroll}>
            {professionals.map((prof, index) => (
              <View key={index} style={styles.professionalCard}>
                <View style={styles.professionalHeader}>
                  <View style={styles.professionalAvatar}>
                    <Text style={styles.professionalInitial}>{prof.name.charAt(0)}</Text>
                  </View>
                  <View style={[styles.statusIndicator, { backgroundColor: prof.available ? "#10B981" : "#6B7280" }]} />
                </View>
                <Text style={styles.professionalName}>{prof.name}</Text>
                <Text style={styles.professionalSpecialty}>{prof.specialty}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>⭐ {prof.rating}</Text>
                  <Text style={styles.availabilityText}>{prof.available ? "Disponível agora" : "Ocupado"}</Text>
                </View>
                <TouchableOpacity style={[styles.connectButton, !prof.available && styles.connectButtonDisabled]}>
                  <Text style={[styles.connectButtonText, !prof.available && styles.connectButtonTextDisabled]}>
                    {prof.available ? "Conectar" : "Agendar"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Resource Carousel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recursos para você</Text>
          <Text style={styles.sectionSubtitle}>Conteúdos selecionados para seu bem-estar</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.resourcesScroll}>
            {resources.map((resource, index) => (
              <TouchableOpacity key={index} style={styles.resourceCard}>
                <View style={styles.resourceHeader}>
                  <View style={[styles.resourceIcon, { backgroundColor: getResourceColor(resource.category) }]}>
                    <Text style={styles.resourceIconText}>{getResourceIcon(resource.category)}</Text>
                  </View>
                  <Text style={styles.resourceDuration}>{resource.duration}</Text>
                </View>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceType}>{resource.type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Community Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Histórias da comunidade</Text>
          <View style={styles.testimonialsContainer}>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "Encontrei o apoio que precisava. Os profissionais são incríveis e me ajudaram muito."
              </Text>
              <Text style={styles.testimonialAuthor}>- Maria, 28 anos</Text>
            </View>
            <View style={styles.testimonialCard}>
              <Text style={styles.testimonialText}>
                "Os recursos de meditação mudaram minha rotina. Agora consigo lidar melhor com a ansiedade."
              </Text>
              <Text style={styles.testimonialAuthor}>- João, 35 anos</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Precisa de ajuda imediata?</Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Suporte 24h</Text>
          </TouchableOpacity>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Privacidade</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Termos</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Contato</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function getResourceColor(category: string) {
  const colors: { [key: string]: string } = {
    meditation: "#A259F7",
    breathing: "#3B82F6",
    podcast: "#10B981",
    gratitude: "#F59E0B",
  }
  return colors[category] || "#6B7280"
}

function getResourceIcon(category: string) {
  const icons: { [key: string]: string } = {
    meditation: "🧘",
    breathing: "🌬️",
    podcast: "🎧",
    gratitude: "🙏",
  }
  return icons[category] || "📱"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 2,
  },
  heroContent: {
    flex: 1,
    paddingRight: 16,
  },
  profileButton: {
    marginTop: 8,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  profileIconText: {
    fontSize: 20,
    color: "#6B7280",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 40,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 12,
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 18,
  },
  heroIllustration: {
    position: "absolute",
    right: -20,
    top: 40,
    width: 120,
    height: 120,
  },
  illustrationCircle1: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#A259F7",
    opacity: 0.1,
    top: 0,
    right: 0,
  },
  illustrationCircle2: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#A259F7",
    opacity: 0.2,
    top: 30,
    right: 40,
  },
  illustrationCircle3: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#A259F7",
    opacity: 0.05,
    top: 20,
    right: 20,
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
  },

  // Mood Tracker
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  moodButton: {
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F1F5F9",
    borderWidth: 2,
    borderColor: "transparent",
    minWidth: 60,
  },
  moodButtonSelected: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  noteContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 20,
  },
  noteInput: {
    fontSize: 16,
    color: "#1F2937",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  saveNoteButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveNoteText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Professionals
  professionalsScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  professionalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginRight: 16,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  professionalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
  },
  professionalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#A259F7",
    alignItems: "center",
    justifyContent: "center",
  },
  professionalInitial: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    right: 0,
    top: 0,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  professionalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "600",
  },
  availabilityText: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "500",
  },
  connectButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  connectButtonDisabled: {
    backgroundColor: "#F1F5F9",
  },
  connectButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  connectButtonTextDisabled: {
    color: "#6B7280",
  },

  // Resources
  resourcesScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  resourceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
    width: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  resourceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  resourceIconText: {
    fontSize: 18,
  },
  resourceDuration: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  resourceType: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Testimonials
  testimonialsContainer: {
    gap: 16,
  },
  testimonialCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 20,
  },
  testimonialText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 24,
    marginBottom: 12,
    fontStyle: "italic",
  },
  testimonialAuthor: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  footerText: {
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
    fontWeight: "500",
  },
  emergencyButton: {
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  emergencyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerLinks: {
    flexDirection: "row",
    gap: 24,
  },
  footerLink: {
    fontSize: 14,
    color: "#6B7280",
    textDecorationLine: "underline",
  },
})
