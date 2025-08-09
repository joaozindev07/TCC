import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                <Text style={styles.title}>HEALTHMIND</Text>
                <Text style={styles.subtitle}>Bem-vindo ao HealthMind!</Text>
                <Text style={styles.description}>
                    Sua jornada para uma mente saudável começa aqui.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => { }}>
                    <Link href={"/mood"} style={styles.buttonText} asChild>
                        <Text style={styles.buttonText}>Começar</Text>
                    </Link>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6C3F8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -80,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#A259F7',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },

})