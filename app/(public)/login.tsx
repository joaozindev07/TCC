import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
    const { signIn, isLoaded, setActive } = useSignIn();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async  function handleLogin() {
        if (!isLoaded) return;

        try {
            const signinUser = await signIn.create({
                identifier: email,
                password: senha,
            })

            await setActive({ session: signinUser.createdSessionId });

        } catch (e) {
            console.error('Erro ao fazer login:', e);
        }
    }

    return (
        <LinearGradient
            colors={['#be41fdff', '#FDDCD0', '#ff58eebd']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
            <Text style={styles.title}>HEALTHMIND</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    {/* Adicione o ícone desejado aqui, exemplo: */}
                     <FontAwesome name="envelope" size={20} color="#888" style={styles.inputIcon} /> 
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#666"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    {/* Adicione o ícone desejado aqui, exemplo: */}
                    <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon} /> 
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        placeholderTextColor="#666"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.login} onPress={handleLogin} activeOpacity={0.8}>
                    <LinearGradient
                        colors={['#A259F7', '#be41fdff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginGradient}
                    >
                        <Text style={styles.loginText}>Entrar</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <AntDesign name="google" size={24} color="#EA4335" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="facebook" size={24} color="#1877F3" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <AntDesign name="apple1" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.linkContainer}>
                <Link href="/register" asChild>
                    <TouchableOpacity>
                        <Text style={styles.registerButtonText}>Não tem uma conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
        marginTop: -60,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f8f8f8',
        marginBottom: 32,
        letterSpacing: 2,
    },

    inputContainer: {
        width: '100%',
        paddingHorizontal: 24,
        marginTop: 36,
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        marginBottom: 24,
        elevation: 3,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 6,
    },
    input: {
        flex: 1,
        padding: 14,
        fontSize: 16,
        color: '#333',
        backgroundColor: 'transparent',
    },
    login: {
        borderRadius: 24,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden', // importante para o gradient respeitar o borderRadius
        elevation: 8,
    },
    loginGradient: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
    },

    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
        gap: 16,
    },
    socialButton: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 12,
        marginHorizontal: 8,
        elevation: 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 14,
        marginTop: 40,
    },
    registerButtonText: {
        color: '#f8f8f8',
        fontWeight: '900',
        fontSize: 14,
        textDecorationLine: 'underline',
        letterSpacing: 0.5,
    },
});