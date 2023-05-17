import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Signup from "./Signup";

const LoginStack = createNativeStackNavigator();

const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoginStack.Screen name="Login" component={Login} />
      <LoginStack.Screen name="Signup" component={Signup} />
    </LoginStack.Navigator>
  );
};
export default LoginStackNavigator;
