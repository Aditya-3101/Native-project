import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Reports = () => {
  const navigation = useNavigation();

  const [report, setReport] = useState("");

  return (
    <SafeAreaView style={styles.ReportHome}>
      <StatusBar backgroundColor={"rgb(255,255,255)"} barStyle="dark-content" />
      <View style={styles.transparentHeader}>
        <MaterialIcon
          name="arrow-back-ios"
          style={styles.backArrow}
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.recordsHeader}>Records</Text>
        <View style={{ width: "15%" }}></View>
      </View>
      <View>
        <TextInput
          multiline
          numberOfLines={10}
          placeholder="write your review"
          style={styles.textarea}
          value={report}
          onChangeText={setReport}
          keyboardType="default"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          ToastAndroid.showWithGravityAndOffset(
            "Report Submitted",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }}
      >
        <Text style={styles.submitBtn}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Reports;

const styles = StyleSheet.create({
  ReportHome: {
    width: width,
    height: height,
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
  },
  transparentHeader: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderBottomColor: "rgba(20,20,20,0.5)",
    borderBottomWidth: 0.5,
  },
  backArrow: {
    width: "15%",
    fontSize: 30,
    textAlign: "center",
  },
  recordsHeader: {
    width: "70%",
    fontWeight: "700",
    color: "rgb(0,0,0)",
    letterSpacing: 0.1,
    fontSize: 18,
    textAlign: "center",
  },
  textarea: {
    textAlignVertical: "top",
    textAlign: "left",
    width: width / 1.2,
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    borderColor: "gray",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 7,
  },
  submitBtn: {
    width: 200,
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "rgb(0,0,0)",
    paddingTop: 7,
    paddingBottom: 7,
    color: "rgb(255,255,255)",
    borderRadius: 5,
  },
});
