import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const moods = [
  { emoji: "😄", label: "Muito feliz" },
  { emoji: "😊", label: "Feliz" },
  { emoji: "😐", label: "Neutro" },
  { emoji: "😔", label: "Triste" },
  { emoji: "😢", label: "Muito triste" },
];

export default function MoodScreen() {
  return (
    <View style={styles.container}>
      {/* Topo com logo e título */}
      <View style={styles.header}>
        <Image source={require("../../assets/images/icon.png")} style={styles.logo} />
        <Text style={styles.title}>HEALTHMIND</Text>
      </View>

      {/* Emojis de humor */}
      <ScrollView contentContainerStyle={styles.moodList}>
        <View style={styles.moodRow}>
          {moods.map((mood, idx) => (
            <TouchableOpacity key={idx} style={styles.moodButton}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Lista vertical de moods */}
        {moods.map((mood, idx) => (
          <TouchableOpacity key={idx} style={styles.moodItem}>
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Rodapé de navegação */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8ACFF",
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
  },
  moodList: {
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 12,
  },
  moodButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    flex: 1,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEAFE",
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
  },
  moodLabel: {
    marginLeft: 16,
    fontSize: 18,
    color: "#333",
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