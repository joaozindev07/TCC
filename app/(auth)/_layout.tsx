import { useAuth } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function ProfileButton() {
    return(
        <Link href="/profile" asChild>
            <MaterialIcons name="face" size={24} color="#fff" style={{ marginRight: 10 }} />
        </Link>
    )
}

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
            <Stack.Screen name="home" options={{ headerShown: false }} redirect={!isSignedIn}/>
            <Stack.Screen name="profile" options={{ headerTitle: "", headerRight: () => <LogoutButton/> }} redirect={!isSignedIn}/>
            <Stack.Screen name="mood" options={{ headerTitle: "", }} redirect={!isSignedIn}/>
            <Stack.Screen name="professional" options={{ headerTitle: "", }} redirect={!isSignedIn}/>
        </Stack>
    );
}