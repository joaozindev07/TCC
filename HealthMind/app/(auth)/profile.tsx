"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Switch,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth, useUser } from "@clerk/clerk-expo"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from "expo-image-picker"

const { width, height } = Dimensions.get("window")
const STATUSBAR_HEIGHT = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0

export default function ProfilePage() {
  const router = useRouter()
  const { signOut } = useAuth()
  const { user } = useUser()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [name, setName] = useState("Maria Silva")
  const [email, setEmail] = useState("maria@email.com")
  const [loading, setLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let savedName = await AsyncStorage.getItem("profile_name")
        let savedEmail = await AsyncStorage.getItem("profile_email")
        const savedNotifications = await AsyncStorage.getItem("profile_notifications")
        const savedDarkMode = await AsyncStorage.getItem("profile_darkmode")
        const savedImage = await AsyncStorage.getItem("profile_image")

        // Se não houver nome salvo, pega do onboarding
        if (!savedName) {
          const onboardingUser = await AsyncStorage.getItem("onboardingUser")
          if (onboardingUser) {
            const { nome } = JSON.parse(onboardingUser)
            if (nome) savedName = nome
          }
        }

        // Se não houver email salvo, pega do Clerk
        if (!savedEmail && user?.primaryEmailAddress?.emailAddress) {
          savedEmail = user.primaryEmailAddress.emailAddress
        }

        if (savedName) setName(savedName)
        if (savedEmail) setEmail(savedEmail)
        if (savedNotifications) setNotificationsEnabled(savedNotifications === "true")
        if (savedDarkMode) setDarkModeEnabled(savedDarkMode === "true")
        if (savedImage) setProfileImage(savedImage)
      } catch (e) {
        // erro ao carregar
      }
    }
    loadProfile()
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    try {
      await AsyncStorage.setItem("profile_name", name)
      await AsyncStorage.setItem("profile_email", email)
      await AsyncStorage.setItem("profile_notifications", notificationsEnabled.toString())
      await AsyncStorage.setItem("profile_darkmode", darkModeEnabled.toString())
      setTimeout(() => {
        setLoading(false)
        Alert.alert("Sucesso", "Informações salvas localmente!")
      }, 800)
    } catch (e) {
      setLoading(false)
      Alert.alert("Erro", "Não foi possível salvar as informações.")
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    })
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri)
      await AsyncStorage.setItem("profile_image", result.assets[0].uri)
    }
  }

  return (
    <LinearGradient colors={["#A259F7", "#c85efd", "#be41fd"]} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      <View style={[styles.header, { paddingTop: STATUSBAR_HEIGHT + height * 0.02 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["rgba(255,255,255,0.95)", "rgba(255,255,255,0.9)", "rgba(255,255,255,0.95)"]}
          style={styles.mainContainer}
        >
          {/* Profile Info */}
          <View style={styles.section}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <LinearGradient colors={["#A259F7", "#c85efd"]} style={styles.avatar}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={{ width: 80, height: 80, borderRadius: 40 }} />
                  ) : (
                    <Text style={styles.avatarText}>MS</Text>
                  )}
                </LinearGradient>
                <TouchableOpacity style={styles.editAvatarButton} onPress={pickImage}>
                  <Ionicons name="camera" size={16} color="#A259F7" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileEmail}>{email}</Text>
                <View style={styles.membershipBadge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.profileJoined}>Membro Premium</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="person-outline" size={20} color="#A259F7" /> Informações Pessoais
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome completo</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#A259F7" style={styles.inputIcon} />
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seu nome" />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail" size={20} color="#A259F7" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="settings-outline" size={20} color="#A259F7" /> Preferências
            </Text>

            <View style={styles.preferenceCard}>
              <View style={styles.preferenceItem}>
                <View style={styles.preferenceLeft}>
                  <View style={styles.preferenceIconContainer}>
                    <Ionicons name="notifications" size={20} color="#A259F7" />
                  </View>
                  <View style={styles.preferenceInfo}>
                    <Text style={styles.preferenceTitle}>Notificações</Text>
                    <Text style={styles.preferenceDescription}>Receber lembretes e atualizações</Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#E5E7EB", true: "#A259F7" }}
                  thumbColor="#ffffff"
                />
              </View>

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceLeft}>
                  <View style={styles.preferenceIconContainer}>
                    <Ionicons name="moon" size={20} color="#A259F7" />
                  </View>
                  <View style={styles.preferenceInfo}>
                    <Text style={styles.preferenceTitle}>Modo escuro</Text>
                    <Text style={styles.preferenceDescription}>Tema escuro para o aplicativo</Text>
                  </View>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#E5E7EB", true: "#A259F7" }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#A259F7" /> Conta
            </Text>

            <View style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="lock-closed" size={20} color="#A259F7" />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Privacidade e Segurança</Text>
                  <Text style={styles.menuDescription}>Gerencie suas configurações de privacidade</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="bar-chart" size={20} color="#A259F7" />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Meus Dados</Text>
                  <Text style={styles.menuDescription}>Visualize seu histórico e estatísticas</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="help-circle" size={20} color="#A259F7" />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Ajuda e Suporte</Text>
                  <Text style={styles.menuDescription}>Central de ajuda e contato</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
              <LinearGradient colors={["#A259F7", "#c85efd"]} style={styles.saveButtonGradient}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                await signOut()
                router.replace("/login")
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>

      <View style={styles.androidSpacing} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  androidSpacing: {
    height: Platform.OS === "android" ? 24 : 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  mainContainer: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#A259F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  profileJoined: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
    marginLeft: 4,
  },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1F2937",
  },

  preferenceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  preferenceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: "#6B7280",
  },

  menuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: "#6B7280",
  },

  saveButton: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FEE2E2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  androidBottomSpacing: {
    paddingBottom: 32,
  },
})