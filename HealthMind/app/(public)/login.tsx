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

    async function handleLogin() {
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
        <View style={styles.container}>
            {/* Topo roxo */}
            <LinearGradient
              colors={['#A259F7', '#c85efdff']}
              start={{ x: 0, y: 1}}
              end={{ x: 0, y: 0}}
              style={styles.topSection}
            >
                <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
                <Text style={styles.title}>HEALTHMIND</Text>
            </LinearGradient>
            {/* Inputs e botões em fundo branco */}
            <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                    
                    <View style={styles.inputWrapper}>
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
                    <Text style={{marginTop: -20, marginBottom: 20, color: '#666', marginRight: -160, fontSize: 14}}>Esqueceu a senha?</Text>
                    <TouchableOpacity style={styles.login} onPress={handleLogin} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#A259F7', '#be41fdff']}
                            style={styles.loginGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.loginText}>Entrar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <AntDesign name="google" size={34} color="#EA4335" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <FontAwesome name="facebook" size={34} color="#1877F3" />
                        </TouchableOpacity>
                    </View>
                    <Link href="/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.registerButtonText}>Não tem uma conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A259F7',
    },
    topSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 42,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 16,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f8f8f8',
        marginBottom: 0,
        letterSpacing: 2,
    },
    inputSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 42,      
        borderTopRightRadius: 42,     
        marginTop: 10,               
        zIndex: 2,                   
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 26,
        borderRadius: 26,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: -70,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 24,
        marginBottom: 30,
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
        overflow: 'hidden',
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
        marginVertical: 20,
        marginTop: 40,
        paddingBottom: 50,
        gap: 36,
    },
    socialButton: {
       flexDirection: 'row',
    },
    linkContainer: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 14,
        marginTop: 40,
    },
    registerButtonText: {
        color: '#696868ff',
        fontSize: 14,
        textDecorationLine: 'underline',
        letterSpacing: 0.5,
    },
});