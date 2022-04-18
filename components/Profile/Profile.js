import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from "react-native";
import { useContext, useState } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ProfileContext } from "../contexts/ProfileContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useContext(ProfileContext);

  const { userName, Pnumber, Mail } = profile[0];

  const [modalVisible, setModalVisible] = useState(false);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.ProfileContainer}>
      <StatusBar backgroundColor={"rgba(10,10,10,0.90)"} />
      <View style={styles.BackIcon}>
        <MaterialIcon
          name="arrow-back-ios"
          style={styles.icons}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View style={styles.names}>
        <MaterialIcon name="account-circle" style={styles.displayIcon} />
        <View style={styles.displayName}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userContact}>{Pnumber}</Text>
          <Text style={styles.userMail}>{Mail}</Text>
        </View>
      </View>
      <View style={styles.design}></View>
      <View style={styles.optionContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("carts")}>
          <View style={styles.SingleOption}>
            <MaterialIcon name="local-mall" style={{ fontSize: 30 }} />
            <Text
              style={{
                fontSize: 17,
                width: "80%",
              }}
            >
              My Cart
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("carts")}>
          <View style={styles.SingleOption}>
            <MaterialIcon name="receipt" style={{ fontSize: 30 }} />
            <Text
              style={{
                fontSize: 17,
                width: "80%",
              }}
            >
              My Orders
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("records")}
        >
          <View style={styles.SingleOption}>
            <MaterialIcon name="receipt-long" style={{ fontSize: 30 }} />
            <Text
              style={{
                fontSize: 17,
                width: "80%",
              }}
            >
              Records
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("reports")}
        >
          <View style={styles.SingleOption}>
            <MaterialIcon name="flag" style={{ fontSize: 30 }} />
            <Text
              style={{
                fontSize: 17,
                width: "80%",
              }}
            >
              Report Problem
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.SingleOption}>
            <MaterialIcon name="logout" style={{ fontSize: 30 }} />
            <Text
              style={{
                fontSize: 17,
                width: "80%",
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {setModalVisible ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalempty}>
              <Text style={styles.modalHeader}>Logout</Text>
              <Text style={styles.modalmessage}>
                Are you sure you want to logout?
              </Text>
              <View style={styles.dissmissbtns}>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.dismisstxt}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.modalDismiss} onPress={() => logout()}>
                  <Text style={styles.dismisstxt}>Okay</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ProfileContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  names: {
    width: width,
    //height: 0,
    borderRightWidth: 50,
    backgroundColor: "rgba(10,10,10,0.90)",
    borderRightColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 99,
  },
  displayPicture: {
    width: 105,
    height: 105,
    borderRadius: 50,
  },
  displayIcon: {
    width: 105,
    height: 105,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.98)",
    color: "rgba(20,20,20,0.99)",
    borderRadius: 50,
  },
  design: {
    width: 0,
    height: 0,
    borderLeftWidth: 60,
    borderRightWidth: 660,
    borderBottomWidth: 120,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(10,10,10,0.90)",
    transform: [{ rotate: "180deg" }],
  },
  displayName: {
    width: "50%",
    justifyContent: "space-evenly",
    height: 100,
  },
  userName: {
    color: "rgba(255,255,255,0.99)",
    fontSize: 20,
    textAlign: "left",
  },
  userContact: {
    fontSize: 16,
    color: "rgba(255,255,255,0.99)",
    marginTop: 10,
    marginBottom: 10,
  },
  BackIcon: {
    width: width,
    backgroundColor: "rgba(10,10,10,0.90)",
  },
  icons: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 32,
    marginLeft: 7,
  },
  userMail: {
    padding: 0,
    color: "rgba(255,255,255,0.9)",
    fontSize: 12.5,
    textAlign: "justify",
  },
  optionContainer: {
    width: width,
    height: 380,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "40%",
    height: 0,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "gray",
    shadowOpacity: 0.8,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  carts: {
    fontSize: 38,
  },
  SingleOption: {
    width: "70%",
    borderBottomWidth: 1,
    borderColor: "gray",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 40,
  },
  modalContainer: {
    width: width,
    height: height,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(20,20,20,0.7)",
  },
  modalempty: {
    width: width / 1.3,
    alignItems: "center",
    height: 150,
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  modalHeader: {
    width: "95%",
    //color: "rgba(255,255,255,0.98)",
    color: "rgba(0,0,0,0.98)",
    fontSize: 18,
    fontWeight: "700",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingTop: 3,
    paddingBottom: 3,
  },
  modalmessage: {
    width: "98%",
    fontSize: 19.6,
    color: "rgba(0,0,0,0.98)",
    textAlign: "center",
  },
  modalDismiss: {
    width: "45%",
    alignItems: "center",
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  dismisstxt: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "rgb(35,152,255)",
  },
  dissmissbtns: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Profile;
