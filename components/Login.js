import React from "react";
import { View, StyleSheet, Text, Keyboard, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../FireBase";


export default function Login({ navigation }) {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      auth
        .signInWithEmailAndPassword(inputs.email, inputs.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert("Error Logging in! Try again!");
          console.log(error.message);
        });
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginHeader}>LOGIN</Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => handleOnchange(text, "email")}
        onFocus={() => handleError(null, "email")}
        error={errors.email}
        placeholder="Email"
        label="Enter your Email"
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        secureTextEntry
        label="Enter your Password"
        onChangeText={(text) => handleOnchange(text, "password")}
        onFocus={() => handleError(null, "password")}
        placeholder="Password"
        error={errors.password}
      />
      <Button
        style={styles.loginButton}
        mode="contained"
        onPress={() => validate()}
      >
        Login
      </Button>

      <Text style={styles.registerText}>NEW TO SPAM?</Text>
      <Button
        style={styles.registerButton}
        mode="contained"
        color="#FFC75F"
        onPress={() => navigation.navigate("Signup")}
      >
        Register Here!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#0ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 0,
    // height: 300,
  },
  loginHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    // fontFamily: "Montserrat",
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
    // fontFamily: "Montserrat",
  },
  loginButton: {
    marginVertical: 10,
    width: 200,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    // fontFamily: "Montserrat",
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  registerText: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    // fontFamily: "Montserrat",
  },
  registerButton: {
    width: 200,
    // fontFamily: "Montserrat",
  },
});

// export default Login;
