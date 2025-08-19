import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// function isValidEmail(email: string) {
//   return /\S+@\S+\.\S+/.test(email);
// }

// function isValidDate(dia: string, mes: string, ano: string) {
//   if (dia.length !== 2 || mes.length !== 2 || ano.length !== 4) return false;
//   const date = new Date(`${ano}-${mes}-${dia}`);
//   return (
//     date.getFullYear() === Number(ano) &&
//     date.getMonth() + 1 === Number(mes) &&
//     date.getDate() === Number(dia)
//   );
// }

export default function RegisterScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [emailpending, setEmailPending] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // const camposValidos =
  //   nome.trim().length > 2 &&
  //   isValidEmail(email) &&
  //   senha.length >= 6 &&
  //   isValidDate(dia, mes, ano) &&
  //   genero.length > 0;

  // async function handleregister() {
  //   if (!isLoaded || loading || !camposValidos) return;
  //   setErro('');
  //   setLoading(true);

  //   try {
  //     await signUp.create({
  //       firstName: nome,
  //       emailAddress: email,
  //       password: senha,
  //     });

  //     await signUp.prepareEmailAddressVerification({
  //       strategy: 'email_code',
  //     });
  //     setEmailPending(true);
  //   } catch (e: any) {
  //     setErro(e.errors?.[0]?.message || 'Erro ao registrar. Tente novamente.');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function handleVerifyAccount() {
  //   if (!isLoaded || loading) return;
  //   setErro('');
  //   setLoading(true);

  //   try {
  //     const verification = await signUp?.attemptEmailAddressVerification({
  //       code,
  //     });

  //     await setActive({ session: verification.createdSessionId });
  //     router.replace('/onboarding');
  //   } catch (e: any) {
  //     setErro(e.errors?.[0]?.message || 'Código inválido. Tente novamente.');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return (
    <View style={styles.container}>
      {/* Topo roxo */}
      <LinearGradient
        colors={['#A259F7', '#c85efdff']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.topSection}
      >
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}>HEALTHMIND</Text>
      </LinearGradient>
      {/* Inputs em área branca com border radius superior */}
      <View style={styles.inputSection}>
        {erro ? <Text style={styles.error}>{erro}</Text> : null}
        {!emailpending && (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <FontAwesome name="user" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                placeholderTextColor="#666"
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>
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
                placeholder="Senha (mín. 6 caracteres)"
                placeholderTextColor="#666"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>
            <View style={styles.birthRow}>
              <Text style={styles.birthLabel}>DATA DE NASCIMENTO</Text>
              <View style={styles.birthInputs}>
                <TextInput
                  style={styles.birthInput}
                  placeholder="DD"
                  placeholderTextColor="#666"
                  value={dia}
                  onChangeText={setDia}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  style={styles.birthInput}
                  placeholder="MM"
                  placeholderTextColor="#666"
                  value={mes}
                  onChangeText={setMes}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  style={styles.birthInput}
                  placeholder="AAAA"
                  placeholderTextColor="#666"
                  value={ano}
                  onChangeText={setAno}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <FontAwesome name="venus-mars" size={20} color="#888" style={styles.inputIcon} />
              <Picker
                selectedValue={genero}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  if (itemValue !== "") setGenero(itemValue);
                }}
                dropdownIconColor="#888"
              >
                <Picker.Item label="Selecione o gênero" value="" color="#888" enabled={genero === ""} />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
                <Picker.Item label="Outro" value="Outro" />
                <Picker.Item label="Prefiro não dizer" value="Prefiro não dizer" />
              </Picker>
            </View>
           
              <TouchableOpacity
                style={[styles.registerButton,
                  //!camposValidos || loading ? { opacity: 0.6 } : null
                ]}
              // onPress={handleregister}
              // disabled={!camposValidos || loading}
              >
                <LinearGradient
                  colors={['#A259F7', '#be41fdff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerGradient}
                >

                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '900', fontSize: 16 }}>Criar Conta</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            <View style={styles.linkContainer}>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Eu já tenho uma conta</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )}

        {emailpending && (
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Digite o código enviado ao seu email</Text>
            <TextInput
              style={styles.input}
              placeholder="Código"
              placeholderTextColor="#666"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity
              style={[styles.registerButton, loading ? { opacity: 0.6 } : null]}
              //onPress={handleVerifyAccount}
              disabled={loading || code.length < 4}
            >
              <LinearGradient
                colors={['#A259F7', '#be41fdff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '900', fontSize: 16 }}>Ativar Conta</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
    textAlign: 'center',
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
    paddingTop: 30,
    paddingBottom: 30,
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
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: 'transparent',
  },
  birthRow: {
    width: '100%',
    marginBottom: 14,
  },
  birthLabel: {
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 12,
  },
  birthInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  birthInput: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    fontSize: 16,
    color: '#333',
    elevation: 2,
    width: '30%',
    textAlign: 'center',
  },
  registerGradient: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    borderRadius: 24,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 14,
    marginTop: 40,
    justifyContent: 'center',
  },
  link: {
    color: '#696868ff',
    fontSize: 14,
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
  picker: {
    flex: 1,
    padding: 0,
    height: 58,
    color: '#666',
    backgroundColor: 'transparent',
  },
  error: {
    color: '#ff3333',
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 15,
    textAlign: 'center',
  },
});