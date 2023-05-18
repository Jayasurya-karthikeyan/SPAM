import React from "react";
import { View, StyleSheet, ImageBackground, Keyboard } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import image from "../assets/login.png";
import { auth, db, firebase } from "../FireBase";
import { get, ref, set } from "firebase/database";

export default function Signup({ navigation }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    type: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();

    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    // if (!inputs.fullname) {
    //   handleError("Please input fullname", "fullname");
    //   isValid = false;
    // }

    // if (!inputs.phone) {
    //   handleError("Please input phone number", "phone");
    //   isValid = false;
    // }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (isValid) {
      console.log(inputs);
      //   console.log(inputs);
      auth
        .createUserWithEmailAndPassword(inputs.email, inputs.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("------------------" + user.uid);
          const userData = {
            uid: user.uid,
            email: user.email,
            fullname: inputs.fullname,
            phone: inputs.phone,
            type: inputs.type,
          };
          //   console.log("......." + db.collection("users"));
          // Store additional user data in Firebase
          //   firebase.firestore().collection("users")
          //     .doc(user.uid)
          //     .set(userData)
          //     .then(() => {
          //       console.log("User data stored successfully");
          //       navigation.navigate("Login");
          //     })
          //     .catch((error) => {
          //       console.error("Error storing user data: ", error);
          //       alert("An error occurred while signing up. Please try again.");
          //     });

          try {
            // db.ref("users/" + user.uid).set(userData);
            // .then(() => {
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
                  console.log(usersArray);
                }

                // Append the new user data to the array
                usersArray.push(userData);

                // Set the updated array back to the "Users" reference in the database
                set(usersRef, usersArray)
                  .then(() => {
                    console.log("User data appended successfully.");
                  })
                  .catch((error) => {
                    console.error("Error appending user data:", error);
                  });
              })
              .catch((error) => {
                console.error("Error retrieving current user data:", error);
              });
            console.log("User data stored successfully");
            navigation.navigate("Login");
            // })
          } catch (error) {
            console.error("Error storing user data: ", error);
            alert("An error occurred while signing up. Please try again.");
          }

          console.log("Registered with:", user.email);
          //   navigation.navigate("Login");
        })
        .catch((error) => alert(error.message));
      //   auth
      //     .createUserWithEmailAndPassword(inputs.email, inputs.password)
      //     .then((userCredentials) => {
      //       const user = userCredentials.user;
      //       console.log("Registered with:", user.email);
      //       navigation.navigate("Login");
      //     })
      //     .catch((error) => alert(error.message));
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    // <ImageBackground style={styles.image} source={image} resizeMode="cover">
    <View style={styles.signUpContainer}>
      <Text style={styles.loginHeader}>SIGN UP</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleOnchange(text, "fullname")}
        onFocus={() => handleError(null, "fullname")}
        iconName="account-outline"
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullname}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleOnchange(text, "type")}
        onFocus={() => handleError(null, "type")}
        iconName="account-outline"
        label="Account Type"
        placeholder="Enter your Account Type"
        error={errors.type}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={(text) => handleOnchange(text, "phone")}
        onFocus={() => handleError(null, "phone")}
        iconName="phone-outline"
        label="Phone Number"
        placeholder="Enter your phone no"
        error={errors.phone}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleOnchange(text, "email")}
        onFocus={() => handleError(null, "email")}
        iconName="email-outline"
        label="Email"
        placeholder="Enter your email address"
        error={errors.email}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        secureTextEntry={true}
        onChangeText={(text) => handleOnchange(text, "password")}
        onFocus={() => handleError(null, "password")}
        iconName="lock-outline"
        label="Password"
        placeholder="Enter your password"
        error={errors.password}
        password
        right={<TextInput.Icon name="eye" />}
      />
      <Button style={styles.signupButton} mode="contained" onPress={validate}>
        Signup
      </Button>
      <Text style={styles.loginText}>Already a User</Text>
      <Button
        style={styles.loginButton}
        mode="contained"
        color="#FFC75F"
        onPress={() => navigation.navigate("Login Page")}
      >
        Login here
      </Button>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    padding: 10,
    paddingTop: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat",
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: "white",
    fontFamily: "Montserrat",
  },
  signupButton: {
    marginVertical: 10,
    width: 200,
  },
  loginText: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat",
  },
  loginButton: {
    width: 200,
    fontFamily: "Montserrat",
  },
});
