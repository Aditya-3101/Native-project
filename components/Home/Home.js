import React from "react";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Widgets from "../widgets/Widgets";
import { MobileProvider } from "../contexts/MobileContext";

const Home = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(search);
  }, [search]);

  const Data = [
    {
      name: "All",
    },
    {
      name: "Mobiles",
    },
    {
      name: "Laptops",
    },
    {
      name: "Desktops",
    },
    {
      name: "Tablets",
    },
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#343a40"} />
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.header}>NativeCart</Text>
          <Icon
            name="shopping-cart"
            color="white"
            fontsize={45}
            style={styles.cartIcon}
          />
        </View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textinput}
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            placeholderTextColor={"white"}
          />
        </View>
        <View style={styles.navbar}>
          {Data.map((para) => {
            return (
              <Text style={{ color: "white" }} key={para.name}>
                {para.name}
              </Text>
            );
          })}
        </View>
        <Widgets />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  main: {
    height: Dimensions.get("window").height / 10,
    justifyContent: "center",
    backgroundColor: "rgb(20,20,20)",
    borderBottomColor: "black",
    width: Dimensions.get("window").width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  nav: {
    width: Dimensions.get("window").width / 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(20,20,20)",
  },
  header: {
    color: "rgb(256,250,255)",
    fontSize: 25,
  },
  searchBar: {
    width: "100%",
    height: Dimensions.get("window").height / 12,
    backgroundColor: "rgb(20,20,20)",
    alignItems: "center",
  },
  textinput: {
    width: "80%",
    height: "80%",
    backgroundColor: "#343a40",
    borderRadius: 35,
    padding: 9,
    fontSize: 15,
    color: "white",
  },
  navbar: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 15,
    backgroundColor: "#495057",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cartIcon: {
    width: 30,
    height: 30,
    fontSize: 30,
  },
});

export default Home;
