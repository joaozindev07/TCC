import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ role?: string; prefs?: string }>({});

  const handleNext = async (value: string) => {
    let newAnswers = { ...answers };

    if (step === 0) newAnswers.role = value; // cliente ou profissional
    if (step === 1) newAnswers.prefs = value; // preferência de experiência

    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // salva no AsyncStorage e manda pra home
      await AsyncStorage.setItem("onboardingData", JSON.stringify(newAnswers));
      router.replace("/(tabs)/home"); 
    }
  };

  const questions = [
    {
      title: "Você é Cliente ou Profissional?",
      options: ["Cliente", "Profissional"],
    },
    {
      title: "O que você mais valoriza?",
      options: ["Rapidez", "Preço", "Qualidade"],
    },
  ];

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      <Text className="text-xl font-bold mb-6 text-center">
        {questions[step].title}
      </Text>

      {questions[step].options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleNext(option)}
          className="bg-purple-500 py-3 px-6 rounded-2xl mb-4 w-full"
        >
          <Text className="text-white text-center font-medium">{option}</Text>
        </TouchableOpacity>
      ))}

      <Text className="mt-6 text-gray-500">
        {step + 1} / {questions.length}
      </Text>
    </View>
  );
}
    