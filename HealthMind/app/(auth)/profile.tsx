"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native"
import { useRouter } from "expo-router"
import { Link } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { width, height } = Dimensions.get("window")
const STATUSBAR_HEIGHT = Platform.OS === "android" ? StatusBar.currentHeight ?? 24 : 0

export default function ProfilePage() {
  const router = useRouter()
  const { signOut } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [name, setName] = useState("Maria Silva")
  const [email, setEmail] = useState("maria@email.com")
  const [loading, setLoading] = useState(false)

  // Carregar dados salvos ao abrir a tela
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedName = await AsyncStorage.getItem("profile_name")
        const savedEmail = await AsyncStorage.getItem("profile_email")
        const savedNotifications = await AsyncStorage.getItem("profile_notifications")
        const savedDarkMode = await AsyncStorage.getItem("profile_darkmode")
        if (savedName) setName(savedName)
        if (savedEmail) setEmail(savedEmail)
        if (savedNotifications) setNotificationsEnabled(savedNotifications === "true")
        if (savedDarkMode) setDarkModeEnabled(savedDarkMode === "true")
      } catch (e) {
        // erro ao carregar
      }
    }
    loadProfile()
  }, [])

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={[styles.header, { paddingTop: STATUSBAR_HEIGHT + height * 0.02 }]}>
        <Link href={"/home"} asChild>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.section}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MS</Text>
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Text style={styles.editAvatarText}>✏️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileEmail}>{email}</Text>
              <Text style={styles.profileJoined}>Membro desde Janeiro 2024</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nome completo</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seu nome" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceTitle}>Notificações</Text>
              <Text style={styles.preferenceDescription}>Receber lembretes e atualizações</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#E5E7EB", true: "#A259F7" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Text style={styles.preferenceTitle}>Modo escuro</Text>
              <Text style={styles.preferenceDescription}>Tema escuro para o aplicativo</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#E5E7EB", true: "#A259F7" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔒</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>Privacidade e Segurança</Text>
              <Text style={styles.menuDescription}>Gerencie suas configurações de privacidade</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📊</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>Meus Dados</Text>
              <Text style={styles.menuDescription}>Visualize seu histórico e estatísticas</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>Ajuda e Suporte</Text>
              <Text style={styles.menuDescription}>Central de ajuda e contato</Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              await signOut()
              router.replace("/login")
            }}
          >
            <Text style={styles.logoutButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    // paddingTop será sobrescrito no componente
  },
  backButton: {
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: width * 0.075,
    color: "#1F2937",
    marginTop: -17,
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSpacer: {
    width: width * 0.11,
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 12,
    marginTop: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },

  // Profile Header
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
    backgroundColor: "#A259F7",
    alignItems: "center",
    justifyContent: "center",
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
  },
  editAvatarText: {
    fontSize: 12,
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
    marginBottom: 4,
  },
  profileJoined: {
    fontSize: 14,
    color: "#9CA3AF",
  },

  // Input Groups
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F2937",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  // Preferences
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
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

  // Menu Items
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: "center",
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
  menuArrow: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  // Action Buttons
  saveButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
})
