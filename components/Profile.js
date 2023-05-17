import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileItem}>MANOJ S</Text>
        <Text style={styles.profileItem}>manoj@gmail.com</Text>
        <Text style={styles.profileItem}>
          LICET, Nungambakkam, Chennai, India
        </Text>
        <Text style={styles.profileItem}>89898990</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: "#4c68d7", // Change to the desired color
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  profileItem: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0", // Change to the desired color
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20, // Add some padding to the sides
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#333", // Change to the desired color
  },
  container: {
    backgroundColor: "#fff", // Change to the desired color
    flex: 1, // Ensure the container fills the entire screen
  },
});
