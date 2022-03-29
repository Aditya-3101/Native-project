import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import ListView from "./ListContainer/ListView";
import Main from "./DetailPage/DetailPage";
import Carts from "./cartView/CartView";
import Empty from "./Home/EmptyPage";
import { StackRouter } from "react-navigation";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="Lists" component={ListView} />
        <Stack.Screen name="Detail" component={Main} />
        <Stack.Screen name="carts" component={Carts} />
        <Stack.Screen name="empty" component={Empty} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
