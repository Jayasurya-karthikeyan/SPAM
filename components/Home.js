import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

// Define motivational quotes data
const quotes = [
  {
    id: 1,
    category: "happy",
    image: require("../assets/motivation/m4.jpg"),
  },
  {
    id: 2,
    category: "happy",

    image: require("../assets/motivation/m6.jpg"),
  },
  {
    id: 3,
    category: "happy",

    image: require("../assets/motivation/m3.jpg"),
  },
  {
    id: 4,
    category: "happy",

    image: require("../assets/motivation/m1.jpg"),
  },
  {
    id: 5,
    category: "sad",

    image: require("../assets/motivation/m3.jpg"),
  },
  {
    id: 6,
    category: "sad",

    image: require("../assets/motivation/m2.jpg"),
  },
  {
    id: 7,
    category: "sad",

    image: require("../assets/motivation/m3.jpg"),
  },
  {
    id: 8,
    category: "sad",

    image: require("../assets/motivation/m2.jpg"),
  },
  {
    id: 9,
    category: "neutral",

    image: require("../assets/motivation/m6.jpg"),
  },
  {
    id: 10,
    category: "neutral",

    image: require("../assets/motivation/m4.jpg"),
  },
];

const MotivationalQuotesApp = () => {
  // const []
  // Render individual quote card
  const renderQuoteCard = ({ item }) =>
    item && item.category === "happy" ? (
      <View style={styles.cardContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
    ) : null;
  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        renderItem={renderQuoteCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginVertical: 8,
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    // height: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default MotivationalQuotesApp;
