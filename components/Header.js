import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>NativeCart</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: Dimensions.get("window").width,
    backgroundColor: "rgb(20,20,20)",
  },
  header: {
    color: "rgb(256,250,255)",
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default Header;
