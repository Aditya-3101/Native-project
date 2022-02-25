import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Mobiles from "./smartphones/Mobiles";
import { StackRouter } from "react-navigation";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="mobile" component={Mobiles} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
