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
<<<<<<< HEAD

function LogoutButton() {
    const { signOut } = useAuth();

    return (
        <TouchableOpacity onPress={() => signOut()} style={{ marginRight: 10 }}>
            <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default function StackPage() {
    const { isSignedIn } = useAuth();

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#D6C3F8', },
            headerTintColor: '#A259F7',
        }}>
            <Stack.Screen name="profile" options={{ headerShown: false }} redirect={!isSignedIn}/>
            <Stack.Screen name="home" options={{ headerShown: false }} redirect={!isSignedIn}/>
            <Stack.Screen name="professional" options={{ headerShown: false }} redirect={!isSignedIn}/>
        </Stack>
    );
}
=======
>>>>>>> 51d881d49755c1f659c02e4b4fb8c6ba8972a3f7
