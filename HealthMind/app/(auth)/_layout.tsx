import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AuthTabsLayout() {
  const { isSignedIn } = useAuth();

  // Você pode proteger as rotas aqui, se necessário

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A259F7",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 50,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="mood"
        options={{
          title: "Humor",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="professional"
        options={{
          title: "Profissionais",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
