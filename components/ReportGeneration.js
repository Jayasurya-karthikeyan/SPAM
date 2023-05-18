import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { db, messaging, auth } from "../FireBase";
import { ref, onValue, get } from "firebase/database";
import database from "firebase/database";
import * as Location from "expo-location";
import * as MailComposer from "expo-mail-composer";
import * as Print from "expo-print";

// import { color } from "react-native-reanimated";

export default function Report() {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(null);

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
  // if (currentUser) {
  const userId = currentUser.uid;
  // console.log("Current user ID:", userId);
  // } else {
  //   console.log("No user is currently logged in.");
  // }

  useEffect(() => console.log(add), add);

  useEffect(() => {
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
            setData(usersArray[userIndex]);

            getAddress(usersArray[userIndex].location)
              .then((ad) => console.log(a))
              .catch((e) => console.log(e));
            console.log(usersArray[userIndex].location);
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
    console.log(data);
  }, []);

  const getAddress = async (location) => {
    const { Latitude, Longitude } = location;
    const address = await Location.reverseGeocodeAsync({
      latitude: Latitude,
      longitude: Longitude,
    });

    if (address.length > 0) {
      console.log(address[0]);
      const { street, city, district, name, region, postalCode, country } =
        address[0];
      const fullAddress = `${name}, ${
        street ? street : ""
      },${district}, ${city}, ${region}, ${postalCode}, ${country}`;
      console.log("Address:", fullAddress);
      setAdd(fullAddress);
      return address;
    } else {
      console.log("No address found");
    }
  };

  const html = `

<html>
<head>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            background-color: #f9f9f9;
            font-size: 18px;
        }
        
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        
        .json-key {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <table>

        <tr>
            <td class="json-key">User ID</td>
            <td>${data?.uid}</td>
        </tr>
        <tr>
            <td class="json-key">Email</td>
            <td>${data?.email}</td>
        </tr>        <tr>
            <td class="json-key">Phone</td>
            <td>${data?.phone}</td>
        </tr>
        <tr>
            <td class="json-key">Type</td>
            <td>${data?.type}</td>
        </tr>
        <tr>
            <td class="json-key">Search</td>
            <td>${data?.Search}</td>
        </tr>
        <tr>
            <td class="json-key">Location</td>
            <td>${add}</td>
        </tr>
        <tr>
            <td class="json-key">Emotion</td>
            <td>${data?.emotion}</td>
        </tr>
    </table>
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
      <View style={styles.bttn}>
        <Button title="Generate PDF" onPress={generatePdf} />
      </View>
      {/* <View style={styles.table}>
        <Text style={styles.keyText}>uid</Text>
        <Text style={styles.valueText}>{data?.uid}</Text>
      </View>
      <View style={styles.table}>
        <Text style={styles.keyText}>email</Text>
        <Text style={styles.valueText}>{data?.email}</Text>
      </View> */}
      <View style={styles.table}>
        <Text style={styles.keyText}>fullname</Text>
        <Text style={styles.valueText}>{data?.fullname}</Text>
      </View>
      {/* <View style={styles.table}>
        <Text style={styles.keyText}>phone</Text>
        <Text style={styles.valueText}>{data?.phone}</Text>
      </View> */}
      <View style={styles.table}>
        <Text style={styles.keyText}>type</Text>
        <Text style={styles.valueText}>{data?.type}</Text>
      </View>
      <View style={styles.table}>
        <Text style={styles.keyText}>search</Text>
        <Text style={styles.valueText}>{data?.Search}</Text>
      </View>
      <View style={styles.table}>
        <Text style={styles.keyText}>emotion</Text>
        <Text style={styles.valueText}>{data?.emotion}</Text>
      </View>
      {add && (
        <View style={styles.table}>
          <Text style={styles.keyText}>location</Text>
          <Text style={styles.valueText}>{add}</Text>
        </View>
      )}
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.text}>Today's Report</Text>
    //   <View>
    //     <Text style={styles.desc}>
    //       The Report is generated based on the usage of your child's activity
    //     </Text>
    //   </View>

    //   <Button title="Generate PDF" onPress={generatePdf} />
    //   {/* <Button title="send mail" onPress={sendMail} /> */}
    // </View>
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
  // const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
    alignItems: "center",
    // justifyContent: "center",
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
  bttn: {
    marginBottom: 15,
    // marginTop: 200,
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 20,
  },
  keyText: {
    fontWeight: "bold",
    width: "40%",
    fontSize: 18,
    color: "#333333",
  },
  valueText: {
    width: "60%",
    fontSize: 18,
    color: "#555555",
  },
  // });
});
