import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerContainer from "./components/DrawerContainer";

// const Drawer=createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="DrawerContainer"
        >
          <Stack.Screen name="DrawerContainer" component={DrawerContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}