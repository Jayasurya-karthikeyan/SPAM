import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth, db } from "../FireBase";
import { get, ref, set } from "firebase/database";
import { Button, TextInput } from "react-native-paper";
import Sentiment from "sentiment";

export default function KeyPad() {
  // useEffect(() => {
  //   set(ref(db, "Report/Search"), {
  //     Search: 3,
  //   })
  //     .then()
  //     .catch((err) => console.log("error"));
  // });
  
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;

  function handlepress() {
    console.log("Press");
  }
  const [result, setResult] = useState(null);
  const [inputText, setInputText] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  var sentiment = new Sentiment();

  const analyse = (text) => {
    console.log(text);
    const result = sentiment.analyze(text);
    setResult(result.score);

    const usersRef = ref(db, "Users");
    if (currentUser) {
      get(usersRef)
        .then((snapshot) => {
          const usersData = snapshot.val();
          let usersArray;

          // If "Users" data doesn't exist, create a new array
          if (!usersData) {
            usersArray = [];
          } else {
            // If "Users" data exists, convert it to an array
            usersArray = Object.values(usersData);
          }

          // Find the user with the matching user ID
          const userIndex = usersArray.findIndex((user) => user.uid === userId);

          if (userIndex !== -1) {
            // User found, update the location parameter
            usersArray[userIndex].Search = result.score;

            // Set the updated array back to the "Users" reference in the database
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

    console.log("Sentiment analysis result:", result);
  };

  const debounceSearch = (text) => {
    setInputText(text);
    if (debounceTimeout) clearTimeout(debounceTimeout);
    setDebounceTimeout(setTimeout(() => analyse(text), 1500));
  };
  return (
    <>
      <View>
        <Text>
          This feature helps to use the keypad search of your child and get the
          negative search
        </Text>
        <Button onPress={handlepress}>KeyPad</Button>

        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={debounceSearch}
          placeholder="Enter some text"
        />
        {result && <Text style={styles.text}>Score:{result}</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6fabc",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#414141",
    fontSize: 30,
  },
  text: {
    // flex: 1,
    color: "#414141",
    fontSize: 30,
    fontWeight: "bold",
  },
});

// import React from "react";
// import { View } from "react-native";
// import Report from "./Report";
// const KeyPad = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center" }}>
//       <Report />
//     </View>
//   );
// };

// export default KeyPad;

// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import { db } from "../FireBase";
// import { ref, set } from "firebase/database";
// import { Button } from "react-native-paper";

// export default function KeyPad() {

// useEffect(() => {
//   set(ref(db, "Report/Search"), {
//     Search: 7
//   })
//     .then()
//     .catch((err) => console.log("error"));
// });

// function handlepress(){
// console.log("Press");
// }
//   return (
//     <>
//       <View>
//         <Text>
//           This feature helps to use the keypad search of your child and get the
//           negative search
//         </Text>
//         <Button onPress={handlepress} >KeyPad</Button>
//       </View>
//     </>
//   );
// }
