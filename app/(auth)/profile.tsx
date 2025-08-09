import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const { user } = useUser();

    const [name, setName] = useState(user?.unsafeMetadata?.displayName ?? "Nome do Usuário");

    async function handleUpdateUser() {
        try {
            await user?.update({
                unsafeMetadata: { displayName: name },
            });
        } catch (e) {
            console.error('Erro ao atualizar usuário:', e);
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/icon.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>
                {(typeof user?.unsafeMetadata?.displayName === 'string' && user.unsafeMetadata.displayName) || "Nome do Usuário"}
            </Text>
            <Text style={styles.subtitle}>{user?.emailAddresses[0]?.emailAddress ?? "usuario@email.com"}</Text>
            <Text style={styles.description}>Aqui vai uma breve descrição sobre o usuário.</Text>
            <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#fff', marginTop: 10, borderWidth: 1, borderColor: '#A259F7' }]} >
                <Text style={[styles.buttonText, { color: '#A259F7' }]}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6C3F8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,                
        marginBottom: 20,
        borderRadius: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#A259F7',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
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
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});