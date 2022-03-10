import React from "react";
import { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Widgets from "../widgets/Widgets";
import { IntakeContext } from "../contexts/Intake";
import { CartContext } from "../contexts/Getcart";

const Home = () => {
  const [search, setSearch] = useState("");

  const [intake, setIntake] = useContext(IntakeContext);

  const [items, setItems] = useContext(CartContext);

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
          <MaterialIcon
            name="local-mall"
            color="white"
            fontsize={45}
            style={styles.cartIcon}
          />
          <Text
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: 19,
              textAlign: "center",
              borderRadius: 50,
              color: "black",
              marginLeft: "auto",
              marginBottom: -5,
              fontSize: 13,
              right: 1,
              top: 8,
              fontWeight: "bold",
            }}
          >
            {items.length}
          </Text>
        </View>
        <View style={styles.searchBar}>
          <Icon name="bars" color="rgb(250,250,250)" style={styles.options} />
          <TextInput
            style={styles.textinput}
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            placeholderTextColor={"white"}
          />
          <Icon
            name="user-circle"
            color="rgb(250,250,250)"
            style={styles.cartIcon}
          />
        </View>
        <View style={styles.navbar}>
          {Data.map((para) => {
            return (
              <TouchableOpacity
                key={para.name}
                onPress={() => {
                  //console.log(para.name);
                  if (para.name === "Mobiles") {
                    setIntake("mobiles");
                    navigation.navigate("Lists");
                  } else if (para.name === "Laptops") {
                    setIntake("Laptops");
                    navigation.navigate("Lists");
                  }
                }}
              >
                <Text style={{ color: "rgb(255,255,255)" }}>{para.name}</Text>
              </TouchableOpacity>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 12,
    backgroundColor: "rgb(20,20,20)",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  textinput: {
    width: "70%",
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
    position: "absolute",
    right: "3%",
    width: 30,
    height: 30,
    fontSize: 30,
  },
  options: {
    position: "absolute",
    left: "3%",
    width: 30,
    height: 30,
    fontSize: 30,
  },
});

export default Home;
