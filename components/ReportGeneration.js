import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { db, messaging,auth } from "../FireBase";
import { ref, onValue } from "firebase/database";
import database from "firebase/database";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

// import { color } from "react-native-reanimated";

export default function Report() {
  const [data, setData] = useState([]);

  // useEffect(()=>{
  //   getFCMToken()
  // })
  // async function getFCMToken() {
  //   const fcmToken = await messaging.getToken();
  //   console.log("FCM Token:", fcmToken);
  // }

  // Get the FCM token for the current device
  // const sendMail = async () => {
  //   const { uri } = await Print.printToFileAsync({
  //     html: "<h1>My pdf!</h1>",
  //   });

  //   MailComposer.composeAsync({
  //     subject: "efeferf",
  //     body: "e3de1d2efd2efd",
  //     recipients: ["selvakavimanoj777@gmail.com"],
  //     attachments: [uri],
  //   });
  // };
  const currentUser = auth.currentUser;
  if (currentUser) {
    const userId = currentUser.uid;
    console.log("Current user ID:", userId);
  } else {
    console.log("No user is currently logged in.");
  }

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();

      if (data !== null) {
        const firstReport = Object.values(data)[0]; // get the first item
        setData([firstReport]); // set the report state with the first item only
      }
    });
  }, []);

  console.log(data);

  const html = `
      <html>
        <body>
          <h1>Hi, this is your child's activity</h1>
                  <h2>He is in the location:${data[0]?.Location.Area} </h2>

                    <h2>He had been in the state: ${data[0]?.Emotion} for the past 3 hours</h2>

          <h2>He had done Negative Search: ${data[0]?.Search.Search}</h2>
               <h2>He used the mobile apps for the past ${data[0]?.App}</h2>

        </body>
      </html>
    `;

  // const html = `
  //   <html>
  //     <body>
  //       <h1>Hi This is your child's activity</h1>
  //       <h2>He is in the location LICET</h2>
  //       <h2>He searched negative activity 7 times today </h2>
  //       <h2>He is in the stress mode for today</h2>
  //       <h2>He used the mobile apps for the past 5 hours</h2>
  //     </body>
  //   </html>
  // `;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false,
    });

    await shareAsync(file.uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Today's Report</Text>
      <View>
        <Text style={styles.desc}>
          The Report is generated based on the usage of your child's activity
        </Text>
      </View>

      <Button title="Generate PDF" onPress={generatePdf} />
      {/* <Button title="send mail" onPress={sendMail} /> */}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <View>
  //       <Text style={styles.text}>Today's Report</Text>
  //     </View>

  //     <Button title="Generate PDF" onPress={generatePdf} />
  //     <StatusBar style="auto" />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 10,
  },
  textInput: {
    alignSelf: "stretch",
    padding: 8,
    margin: 8,
  },
  text: {
    fontSize: 20,
    alignItems: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 17,
    alignItems: "center",

    marginBottom: 20,
    fontWeight: "bold",
  },
});
