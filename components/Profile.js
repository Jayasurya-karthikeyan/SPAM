import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { auth, db } from "../FireBase";
import * as Location from "expo-location";

export default function Profile({ navigation }) {
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(null);

  const currentUser = auth.currentUser;
  // if (currentUser) {
  const userId = currentUser.uid;
  // console.log("Current user ID:", userId);
  // } else {
  //   console.log("No user is currently logged in.");
  // }

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
            console.log(usersArray[userIndex]);

            getAddress(usersArray[userIndex].location)
              .then((ad) => console.log(a))
              .catch((e) => console.log(e));
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileItem}>{data?.fullname}</Text>
        <Text style={styles.profileItem}>{data?.email}</Text>
        <Text style={styles.profileItem}>{add}</Text>
        <Text style={styles.profileItem}>{data?.phone}</Text>
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
