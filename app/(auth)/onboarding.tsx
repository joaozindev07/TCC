import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

const sintomasOpcoes = [
  "TDAH", "Depressão", "Ansiedade", "Autismo", "TOC", "Burnout", "Outros"
];
const intensidadeOpcoes = ["Leves", "Moderados", "Intensos"];
const frequenciaOpcoes = ["Raramente", "Às vezes", "Frequentemente", "Quase sempre"];
const objetivoOpcoes = [
  "Apoio emocional", "Informações", "Chat com profissionais", "Comunidade", "Outro"
];

export default function OnboardingScreen({ onFinish }: { onFinish?: () => void }) {
  const [step, setStep] = useState(1);
  const [sintomas, setSintomas] = useState<string[]>([]);
  const [intensidade, setIntensidade] = useState<string | null>(null);
  const [frequencia, setFrequencia] = useState<string | null>(null);
  const [objetivos, setObjetivos] = useState<string[]>([]);

  const toggleSintoma = (item: string) => {
    setSintomas((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
  const toggleObjetivo = (item: string) => {
    setObjetivos((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        {step === 1 && (
          <>
            <Text style={styles.question}>O que você está passando?</Text>
            {sintomasOpcoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  sintomas.includes(item) && styles.optionSelected,
                ]}
                onPress={() => toggleSintoma(item)}
              >
                <Text style={[
                  styles.optionText,
                  sintomas.includes(item) && styles.optionTextSelected
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(2)}
              disabled={sintomas.length === 0}
            >
              <Text style={styles.nextButtonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.question}>Quão intensos estão seus sintomas?</Text>
            {intensidadeOpcoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  intensidade === item && styles.optionSelected,
                ]}
                onPress={() => setIntensidade(item)}
              >
                <View style={styles.radioCircle}>
                  {intensidade === item && <View style={styles.radioChecked} />}
                </View>
                <Text style={[
                  styles.optionText,
                  intensidade === item && styles.optionTextSelected
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(3)}
              disabled={!intensidade}
            >
              <Text style={styles.nextButtonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.question}>Com que frequência você sente isso?</Text>
            {frequenciaOpcoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  frequencia === item && styles.optionSelected,
                ]}
                onPress={() => setFrequencia(item)}
              >
                <View style={styles.radioCircle}>
                  {frequencia === item && <View style={styles.radioChecked} />}
                </View>
                <Text style={[
                  styles.optionText,
                  frequencia === item && styles.optionTextSelected
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => setStep(4)}
              disabled={!frequencia}
            >
              <Text style={styles.nextButtonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 4 && (
          <>
            <Text style={styles.question}>O que você espera encontrar aqui?</Text>
            {objetivoOpcoes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  objetivos.includes(item) && styles.optionSelected,
                ]}
                onPress={() => toggleObjetivo(item)}
              >
                <Text style={[
                  styles.optionText,
                  objetivos.includes(item) && styles.optionTextSelected
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={onFinish}
              disabled={objetivos.length === 0}
            >
              <Text style={styles.nextButtonText}>Finalizar</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D6C3F8" },
  inner: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  question: { fontSize: 22, fontWeight: "bold", color: "#49026E", marginBottom: 24, textAlign: "center" },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A259F7",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
    backgroundColor: "#fff",
    minWidth: 220,
  },
  optionSelected: {
    backgroundColor: "#A259F7",
    borderColor: "#49026E",
  },
  optionText: {
    fontSize: 18,
    color: "#49026E",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: "#49026E",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#A259F7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#fff",
  },
  radioChecked: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#A259F7",
  },
});