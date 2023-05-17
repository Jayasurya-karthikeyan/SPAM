import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HelpPage from "./HelpPage";
import Aboutus from "./AboutUs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import Home from "./Home";
import Location from "./Location";
import Report from "./ReportGeneration";
import Activities from "./Activities";
import KeyPad from "./KeyPad";
import AppUsage from "./AppUsage";
import Profile from "./Profile";
import Emotion from "./Emotion";
import LoginStackNavigator from "./LoginStackNavigator";
const Drawer = createDrawerNavigator();

export default function DrawerContainer(props) {
  return (
    // <NavigationContainer>
    <Drawer.Navigator
      screenOptions={{
        // headerShown: false,
        drawerActiveBackgroundColor: "orange",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="Login"
        component={LoginStackNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="mobile1" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Activities"
        component={Activities}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="filter" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Location"
        component={Location}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="profile" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="KeyPad"
        component={KeyPad}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="shrink" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AppUsage"
        component={AppUsage}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="caretup" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Emotion"
        component={Emotion}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="caretup" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="table" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="User Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="user" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpPage}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="help" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={Aboutus}
        options={{
          drawerIcon: ({ color }) => (
            // <Image source={IconLogo} style={{ width: 35, height: 35 }} />
            <Ionicons name="bookmark" size={25} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
    /* </NavigationContainer> */
  );
}
