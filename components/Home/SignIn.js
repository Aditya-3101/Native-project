import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  Alert,
  Modal,
  Pressable,
  StatusBar,
  PermissionsAndroid,
  BackHandler,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useState, useLayoutEffect, useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const LogIn = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [name, setName] = useState("");

  const [pass, setPass] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [userModal, setuserModal] = useState(false);

  const [invalidInput, setInvalidInput] = useState(false);

  const [profile, setProfile] = useContext(ProfileContext);

  const checkAcessibility = async () => {
    try {
      //AsyncStorage.getItem("username");
      AsyncStorage.getItem("Phnumber").then((value) => {
        if (value !== null) {
          fetch(
            `http://192.168.43.29:4000/api/main/users/validate/name?name=${value}`
          )
            .then((Res) => Res.json())
            .then((Result) => {
              addLocal();
              setProfile(Result);
              navigation.navigate("Home");
            })
            .catch((err) => {
              console.log(err);
            });
          //navigation.navigate("Home");
        }
      });
    } catch (err) {
      Alert(err);
    }
  };

  const addLocal = async () => {
    await AsyncStorage.setItem("Phnumber", name);
    await AsyncStorage.setItem("password", pass);
  };

  const checkUser = () => {
    const re =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
    if (name.length !== 0 && pass.length !== 0) {
      if (/^[a-zA-Z ]+$/.test(name) === false && re.test(pass)) {
        fetch(
          `http://192.168.43.29:4000/api/main/users/validate/user?name=${name}&pass=${pass}`
        )
          .then((Res) => Res.json())
          .then((Result) => {
            addLocal();
            setProfile(Result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("wrong credentials");
        setInvalidInput(true);
      }
    } else {
      console.log("invalid");
      setModalVisible(true);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "NativFy",
          message: "NativeFy needs access to your files.",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }
      );
      const ReadGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "NativeFy",
          message: "NativeFy needs access to update your files.",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
        }
      );
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        ReadGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        //checkAcessibility();
      } else {
        BackHandler.exitApp();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    requestPermission();
    checkAcessibility();
  }, []);

  useEffect(() => {
    if (profile.length !== 0) {
      navigation.navigate("Home");
    } else {
      setPass("");
      setName("");
      setuserModal(true);
    }
  }, [profile]);

  useEffect(() => {
    setName("");
    setPass("");
    setModalVisible(false);
    setuserModal(false);
  }, [isFocused]);

  return (
    <ScrollView pagingEnabled={true}>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <SafeAreaView style={styles.First}>
        <View style={styles.header}>
          <Text style={styles.loginTxt}>Login</Text>
        </View>
        <View style={styles.loginCredentials}>
          <View style={styles.LogoContainer}>
            <Image
              source={{
                uri: "https://i.ibb.co/cFczSVW/Screenshot-3-edited-removebg-preview-2x.png",
              }}
              style={styles.logo}
            />
          </View>
          <View style={styles.inputs}>
            <TextInput
              value={name}
              style={styles.nameInput}
              onChangeText={setName}
              placeholder="Phone Number"
              keyboardType={"phone-pad"}
            />
            <TextInput
              value={pass}
              style={styles.nameInput}
              onChangeText={setPass}
              secureTextEntry={true}
              placeholder="Password"
            />
          </View>
          <View style={styles.loginBtn}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "transparent" : "rgba(0,0,0,0.98)",
                },
                styles.btn,
              ]}
              onPress={() => checkUser()}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    {
                      color: pressed
                        ? "rgba(0,0,0,0.98)"
                        : "    rgba(255,255,255,0.99)",
                    },
                    styles.loginBtnText,
                  ]}
                >
                  Login
                </Text>
              )}
            </Pressable>
          </View>
          <View style={styles.otherOption}>
            <Text style={{ color: "rgba(20,20,20,0.5)", fontWeight: "700" }}>
              New to NativeFy?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={{ fontSize: 16, color: "rgb(35,152,255)" }}>
                Create An Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {setModalVisible ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalempty}>
                <Text style={styles.modalHeader}>Login</Text>
                <Text style={styles.modalmessage}>
                  Both Textfields Are Empty!
                </Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
        {setuserModal ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={userModal}
            onRequestClose={() => setuserModal(!userModal)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalempty}>
                <Text style={styles.modalHeader}>Login</Text>
                <Text style={styles.modalmessage}>No User Found!</Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setuserModal(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
        {setInvalidInput ? (
          <Modal
            animationType="fade"
            transparent={true}
            visible={invalidInput}
            onRequestClose={() => setInvalidInput(!invalidInput)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalempty}>
                <Text style={styles.modalHeader}>Login</Text>
                <Text style={styles.modalmessagetiny}>
                  Name Should Contain Only Characters & Password Should Contain
                  Symbols.
                </Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setInvalidInput(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  First: {
    width: width,
    height: height,
    alignItems: "center",
    //justifyContent: "space-between",
    backgroundColor: "white",
  },
  header: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    height: 70,
  },
  loginTxt: {
    fontSize: 29,
    fontWeight: "700",
    width: "90%",
  },
  loginCredentials: {
    width: width,
    height: height - 80,
    alignItems: "center",
    //justifyContent: "space-evenly",
  },
  LogoContainer: {
    width: "70%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 190,
    height: 190,
    resizeMode: "contain",
  },
  inputs: {
    width: "70%",
    marginTop: 40,
    marginBottom: 40,
  },
  nameInput: {
    width: "100%",
    height: 49,
    fontSize: 17,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  loginBtn: {
    width: "70%",
    paddingBottom: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  btn: {
    width: "100%",
    borderRadius: 4,
    textAlign: "center",
    alignItems: "center",
  },
  loginBtnText: {
    fontSize: 19,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  otherOption: {
    marginTop: 30,
    width: "70%",
    alignItems: "center",
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
  },
  modalmessagetiny: {
    width: "98%",
    fontSize: 15,
    color: "rgba(0,0,0,0.98)",
  },
  modalDismiss: {
    width: "90%",
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
});

export default LogIn;
