import React, { useState, useEffect } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { db, auth } from "../FireBase";
import { ref, get, set } from "firebase/database";
import Communications from "react-native-communications";
import axios from "axios";
import { encode } from "base-64";

export default function App() {
  const pin1 = {
    latitude: 13.059278,
    longitude: 80.233656,
  };
  const initial = {
    latitude: 13.059278,
    longitude: 80.233656,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  };
  const [pin, setPin] = useState({
    latitude: 13.059278,
    longitude: 80.233656,
  });
  // useEffect(() => console.log("+++++++++++++++++++++++++++++++++++", pin), pin);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(pin1);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const currentUser = auth.currentUser;
  const userId = currentUser.uid;

  // const sendSMS = (phoneNumber, message) => {
  //   return new Promise((resolve, reject) => {
  //     Communications.text(phoneNumber, message, {})
  //       .then(() => {
  //         console.log("SMS sent successfully.");
  //         resolve();
  //       })
  //       .catch((error) => {
  //         console.error("Error sending SMS:", error);
  //         reject(error);
  //       });
  //   });
  // };

  const sendSMS = async (phoneNumber, message) => {
    const accountSid = "AC24dedb2f98c89068b149c7d0aac05689";
    const authToken = "57ed317c061dba9458df9cea8af5ac8c";

    // var twilio = require("twilio")(accountSid, authToken);

    // const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    // const data = new URLSearchParams();
    // data.append("To", '+916374460535');
    // data.append("From", "+12543748761");
    // data.append("Body", message);

    // try {
    //   const response = await axios.post(apiUrl, data, {
    //     auth: {
    //       username: accountSid,
    //       password: authToken,
    //     },
    //   });

    //   console.log("SMS sent successfully. SID:", response.data.sid);
    // } catch (error) {
    //   console.error("Error sending SMS:", error);
    // }
  };

  const alertParent = (distance, location) => {
    const usersRef = ref(db, "Users");
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
          const phoneNumber = 6374460535; // Replace with the desired phone number
          const message =
            "Alert! Your ward has moved to this place of distance" +
            distance / 1000 +
            "km from the previous location"; // Replace with the desired message

          sendSMS(phoneNumber, message)
            .then(() => {
              // SMS sent successfully
              console.log("0");
            })
            .catch((error) => {
              // Error sending SMS
              console.error("Error sending SMS:", error);
            });
        } else {
          console.log("User not found.");
        }
      })
      .catch((error) => {
        console.error("Error sending alert", error);
      });

    console.log("Message will be sent");
  };
  alertParent(1100, pin);

  useEffect(() => {
    const usersRef = ref(db, "Users");

    if (currentUser) {
      const locationData = {
        Latitude: pin.latitude,
        Longitude: pin.longitude,
      }; // Replace "Your Location" with the actual location data

      // Retrieve the current "Users" data from the database
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
            if (usersArray[userIndex].location) {
              function calculateDistance(lat1, lon1, lat2, lon2) {
                const R = 6371e3; // Earth's radius in meters
                const φ1 = (lat1 * Math.PI) / 180; // Convert latitudes to radians
                const φ2 = (lat2 * Math.PI) / 180;
                const Δφ = ((lat2 - lat1) * Math.PI) / 180;
                const Δλ = ((lon2 - lon1) * Math.PI) / 180;

                const a =
                  Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) *
                    Math.cos(φ2) *
                    Math.sin(Δλ / 2) *
                    Math.sin(Δλ / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                const distance = R * c; // Distance in meters
                return distance;
              }

              const location1 = locationData;
              const location2 = usersArray[userIndex].location; //center

              const distance = calculateDistance(
                location1.Latitude,
                location1.Longitude,
                location2.Latitude,
                location2.Longitude
              );

              // console.log(distance)

              const radius = 500; // Radius in meters

              if (distance >= radius) {
                usersArray[userIndex].location = locationData;

                // Set the updated array back to the "Users" reference in the database
                set(usersRef, usersArray)
                  .then(() => {
                    console.log("Location data added successfully.");
                  })
                  .catch((error) => {
                    console.error("Error adding location data:", error);
                  });
                alertParent(distance, locationData);
              }
            } else {
              usersArray[userIndex].location = locationData;

              // Set the updated array back to the "Users" reference in the database
              set(usersRef, usersArray)
                .then(() => {
                  console.log("Location data added successfully.");
                })
                .catch((error) => {
                  console.error("Error adding location data:", error);
                });
            }
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

    // set(ref(db, "Report/Location/"), {
    //   Latitude: pin.latitude,
    //   Longitude: pin.longitude,
    // })
    //   .then()
    //   .catch((err) => console.log("error"));
  }, [pin]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.059278,
          longitude: 80.233656,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e) => {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker
          coordinate={pin}
          title="child"
          description="The place where your child last visited"
        />
        <Circle center={pin} radius={250}></Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
