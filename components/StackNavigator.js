import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import ListView from "./ListContainer/ListView";
import Main from "./DetailPage/DetailPage";
import Carts from "./cartView/CartView";
import Empty from "./Home/EmptyPage";
import All from "./Home/AllCategories";
import SearchQuery from "./Home/SearchQuery";
import { StackRouter } from "react-navigation";
import SignUp from "./Home/SignUp";
import LogIn from "./Home/SignIn";
import Checkout from "./cartView/Checkout";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Lists" component={ListView} />
        <Stack.Screen name="Detail" component={Main} />
        <Stack.Screen name="carts" component={Carts} />
        <Stack.Screen name="empty" component={Empty} />
        <Stack.Screen name="allCategories" component={All} />
        <Stack.Screen name="Search" component={SearchQuery} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen name="signup" component={SignUp} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
