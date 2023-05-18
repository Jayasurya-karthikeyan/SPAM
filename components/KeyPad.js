import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth, db } from "../FireBase";
import { get, ref, set } from "firebase/database";
import { Button, TextInput } from "react-native-paper";
import Sentiment from "sentiment";

const KeyPad = () => {
  const currentUser = auth?.currentUser;
  const userId = currentUser?.uid;

  const [result, setResult] = useState(0);
  const [inputText, setInputText] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // useEffect(() => {
  //   set(ref(db, "Report/Search"), {
  //     Search: 3,
  //   })
  //     .then()
  //     .catch((err) => console.log("error"));
  // }, []);

  const handlePress = () => {
    console.log("Press");
  };

  const analyse = (text) => {
    console.log(text);
    const sentiment = new Sentiment();
    const analysisResult = sentiment.analyze(text);
    setResult(analysisResult.score);

    const usersRef = ref(db, "Users");
    if (currentUser) {
      get(usersRef)
        .then((snapshot) => {
          const usersData = snapshot.val();
          let usersArray = [];

          if (usersData) {
            usersArray = Object.values(usersData);
          }

          const userIndex = usersArray.findIndex((user) => user.uid === userId);

          if (userIndex !== -1) {
            usersArray[userIndex].Search = analysisResult.score;
            set(usersRef, usersArray)
              .then(() => {
                console.log("Emotion data added successfully.");
              })
              .catch((error) => {
                console.error("Error adding Emotion data:", error);
              });
          } else {
            console.log("User not found.");
          }
        })
        .catch((error) => {
          console.error("Error retrieving current user data:", error);
        });
    } else {
      console.log("No user is currently logged in.");
    }

    console.log("Sentiment analysis result:", analysisResult);
  };

  const debounceSearch = (text) => {
    setInputText(text);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(setTimeout(() => analyse(text), 1500));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analyse your Status</Text>
      <Text>
        This feature helps to use the keypad search of your child and get the
        negative search
      </Text>

      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={debounceSearch}
        placeholder="Enter some text"
      />
      {inputText.length > 0 && <Text style={styles.text}>Score: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f6fabc",
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
    paddingTop: 40,
  },
  input: {
    height: 40,
    width: "100%",
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    color: "#414141",
    fontSize: 20,
  },
  text: {
    color: "#414141",
    fontSize: 30,
    padding: 20,
    fontWeight: "bold",
  },
});

export default KeyPad;
