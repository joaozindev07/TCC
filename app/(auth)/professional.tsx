import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

const professionals = [
    {
        id: 1,
        name: "Dra. Ana Souza",
        specialty: "Psicóloga Clínica",
        image: require('../../assets/images/icon.png'),
        rating: 4.9,
        price: "R$ 120/h",
    },
    {
        id: 2,
        name: "Dr. João Silva",
        specialty: "Psicólogo Infantil",
        image: require('../../assets/images/icon.png'),
        rating: 4.8,
        price: "R$ 100/h",
    },
    {
        id: 3,
        name: "Dra. Maria Oliveira",
        specialty: "Psicóloga Organizacional",
        image: require('../../assets/images/icon.png'),
        rating: 5.0,
        price: "R$ 150/h",
    },
];

export default function ProfessionalScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.list}>
            <Text style={styles.title}>Encontre um Psicólogo</Text>
            <Text style={styles.subtitle}>Contrate sessões online com profissionais qualificados</Text>
                {professionals.map((pro) => (
                    <View key={pro.id} style={styles.card}>
                        <Image source={pro.image} style={styles.avatar} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{pro.name}</Text>
                            <Text style={styles.specialty}>{pro.specialty}</Text>
                            <View style={styles.row}>
                                <FontAwesome name="star" size={16} color="#FFD700" />
                                <Text style={styles.rating}>{pro.rating}</Text>
                                <Text style={styles.price}>{pro.price}</Text>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Agendar Sessão</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <Link href="/mood" asChild>
                    <MaterialIcons name="psychology" size={28} color="#A259F7" />
                </Link>
                <Link href="/professional" asChild>
                    <MaterialIcons name="boy" size={36} color="#A259F7" />
                </Link>
                <Link href={"/profile"} asChild>
                    <MaterialIcons name="face" size={28} color="#A259F7" style={{ marginRight: 10 }} />
                </Link>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D6C3F8',
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#A259F7',
        marginTop: 10,
        marginBottom: 4,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    list: {
        paddingBottom: 80,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        elevation: 3,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
        backgroundColor: '#eee',
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    specialty: {
        fontSize: 14,
        color: '#A259F7',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        fontSize: 14,
        color: '#333',
        marginLeft: 4,
        marginRight: 12,
    },
    price: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        backgroundColor: '#A259F7',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 24,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        elevation: 8,
        paddingBottom: 30,
    },
});