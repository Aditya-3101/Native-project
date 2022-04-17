import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Picker,
  LogBox,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ProfileContext } from "../contexts/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const SignUp = () => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [profile, setProfile] = useContext(ProfileContext);

  const [name, setname] = useState("");

  const [phnum, setPhNum] = useState();

  const [age, setAge] = useState();

  const [mail, setMail] = useState("");

  const [selectedValue, setSelectedValue] = useState("Gender");

  const [showModal, setShowModal] = useState(false);

  const [existingUser, setExistingUser] = useState(false);

  const [empyfields, setEmptyFields] = useState(false);

  const [pass, setPass] = useState(false);

  const [flag, setFlag] = useState(0);

  const [psw, setPsw] = useState("");

  const [readd, setReadd] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    setShowModal(false);
  }, []);

  useEffect(() => {
    setEmptyFields(false);
  }, [isFocused]);

  useEffect(() => {
    if (pass === true) {
      //Adduser();
      //navigation.navigate("Home");
      fetch(
        `http://192.168.43.29:4000/api/main/users/validate?name=${phnum}&pass=${psw}`
      )
        .then((res) => res.json())
        .then((result) => {
          setProfile(result);
          Adduser();
          navigation.navigate("Home");
        });
    }
  }, [pass]);

  const Adduser = async () => {
    try {
      //await AsyncStorage.setItem("username", name);
      await AsyncStorage.setItem("password", psw);
      await AsyncStorage.setItem("Phnumber", phnum);
    } catch (err) {
      Alert(err);
    }
  };

  const checkuser = () => {
    if (name.length !== 0 && phnum.length !== 0) {
      fetch(`http://192.168.43.29:4000/api/main/users/checkuser?no=${phnum}`)
        .then((res) => res.json())
        .then((result) => {
          setFlag((prev) => prev + 1);
          setData(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setEmptyFields(true);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      flag > 0 ? register() : null;
      setExistingUser(false);
    } else {
      console.log(data.length);
      setExistingUser(true);
    }
  }, [data]);

  const register = () => {
    const re =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/;
    if (
      name.length > 3 &&
      phnum.length > 9 &&
      age.length > 0 &&
      mail.length > 7 &&
      selectedValue !== "Gender" &&
      psw.length >= 8 &&
      readd.length > 5
    ) {
      //console.log(/^[a-zA-Z]+$/.test(name));
      if (
        /^[a-zA-Z ]+$/.test(name) === true &&
        String(mail).includes("@") === true &&
        re.test(psw) == true
      ) {
        console.log("true case");
        try {
          fetch("http://192.168.43.29:4000/api/main/users/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              age: age,
              number: phnum,
              mail: mail,
              psw: psw,
              gen: selectedValue,
              add: readd,
            }),
          })
            .then((res) => res.json())
            .then((Result) => {
              setPass(true);
            })
            .catch((err) => console.log(err));
        } catch (err) {
          ToastAndroid.showWithGravityAndOffset(
            err,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }
      } else {
        console.log("bss");
        setShowModal(true);
        ToastAndroid.showWithGravityAndOffset(
          "Invalid Credentials",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    } else {
      //console.log("not true");
      //setShowModal(true);
      setEmptyFields(true);
    }
  };

  return (
    <ScrollView>
      <StatusBar hidden />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.signContainer}
      >
        <View style={styles.header}>
          <Text style={styles.loginTxt}>SignUp</Text>
        </View>
        <View style={styles.nameNo}>
          <TextInput
            value={name}
            onChangeText={setname}
            placeholder="Name"
            style={styles.names}
          />
          <TextInput
            value={phnum}
            onChangeText={setPhNum}
            placeholder="Phone Number (+91)"
            style={styles.names}
            keyboardType={"phone-pad"}
          />
        </View>
        <View style={styles.ageNo}>
          <View style={styles.mail}>
            <TextInput
              value={age}
              onChangeText={setAge}
              placeholder="Age"
              style={styles.ages}
              keyboardType={"numeric"}
            />
            <TextInput
              value={mail}
              onChangeText={setMail}
              placeholder="E-Mail"
              style={styles.mails}
              keyboardType={"email-address"}
            />
          </View>
        </View>
        <View style={styles.gens}>
          <View style={styles.gensDob}>
            <Picker
              selectedValue={selectedValue}
              style={styles.select}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.item label="Gender" value="NA" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <View style={styles.pass}>
            <TextInput
              value={psw}
              onChangeText={setPsw}
              placeholder="Password(must contain symbols & numbers)"
              style={styles.psword}
              secureTextEntry={true}
              maxLength={10}
            />
            <TextInput
              value={readd}
              onChangeText={setReadd}
              placeholder="Address"
              style={styles.psword}
            />
          </View>
        </View>
        <View style={styles.signupBtns}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "transparent" : "rgba(0,0,0,0.98)",
              },
              styles.signBtn,
            ]}
            onPress={() => checkuser()}
          >
            {({ pressed }) => (
              <Text
                style={[{ color: pressed ? "black" : "cyan" }, styles.signtxt]}
              >
                Sign Up
              </Text>
            )}
          </Pressable>
        </View>
        <View style={styles.loginBtns}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "black" : "transparent)" },
              styles.logBtn,
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            {({ pressed }) => (
              <Text
                style={[
                  { color: pressed ? "white" : "rgba(0,0,0,0.98)" },
                  styles.logintxt,
                ]}
              >
                Login
              </Text>
            )}
          </Pressable>
        </View>
        {showModal ? (
          <Modal
            visible={showModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowModal(!showModal)}
          >
            <View style={styles.showmodalContainer}>
              <View style={styles.bigInnerModal}>
                <Text style={styles.modalSignUpTxt}>Signup</Text>
                <Text style={styles.modalmessagetxt}>
                  Invalid Credentials!!!
                </Text>
                <Text style={styles.modalmessagetxt}>
                  Kindly check your input
                </Text>
                <Text style={styles.modalmessagetxt}>
                  - Password should contain Alphabetic letters,small
                  letters,numbers and symbols.
                </Text>
                <Text style={styles.modalmessagetxt}>
                  - Password length should be more than 8
                </Text>
                <Text style={styles.modalmessagetxt}>
                  - Email field should contain "@'' symbol
                </Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
        {existingUser ? (
          <Modal
            visible={existingUser}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setExistingUser(!existingUser)}
          >
            <View style={styles.showmodalContainer}>
              <View style={styles.innerModal}>
                <Text style={styles.modalSignUpTxt}>Signup</Text>
                <Text style={styles.modalmessagetxt}>
                  {phnum} is already linked with NativeFy.
                </Text>
                <Text style={styles.modalmessagetxt}>
                  Kindly Login to your Account.
                </Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setExistingUser(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
        {empyfields ? (
          <Modal
            visible={empyfields}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setEmptyFields(!empyfields)}
          >
            <View style={styles.showmodalContainer}>
              <View style={styles.innerModal}>
                <Text style={styles.modalSignUpTxt}>Signup</Text>
                <Text style={styles.modalmessagetxt}>
                  Kindly enter data properly.
                </Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setEmptyFields(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  signContainer: {
    width: width,
    height: height,
  },
  header: {
    marginTop: 10,
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
  nameNo: {
    width: width,
    height: 180,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  ageNo: {
    width: width,
    height: 80,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  names: {
    width: "70%",
    height: 40,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 5,
  },
  mail: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ages: {
    width: "25%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
  },
  mails: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 5,
  },
  gens: {
    width: width,
    height: 190,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  gensDob: {
    width: "70%",
  },
  pass: {
    width: "70%",
    height: 120,
    justifyContent: "space-evenly",
  },
  select: {
    width: "46%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    borderColor: "gray",
  },
  psword: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 5,
    marginBottom: 4,
  },
  signupBtns: {
    width: width,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtns: {
    width: width,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signBtn: {
    width: "70%",
    height: 45,
    borderRadius: 5,
    //backgroundColor: "rgba(0,0,0,0.99)",
    alignItems: "center",
    justifyContent: "center",
  },
  logBtn: {
    width: "70%",
    height: 45,
    borderRadius: 5,
    //backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  signtxt: {
    //color: "rgba(255,255,255,0.99)",
    fontSize: 16,
    //color: "cyan",
  },
  logintxt: {
    fontSize: 16,
    //color: "rgba(0,0,0,0.98)",
  },
  showmodalContainer: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  innerModal: {
    width: width / 1.3,
    height: 160,
    //borderRadius: 5,
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 5,
    justifyContent: "space-between",
  },
  bigInnerModal: {
    width: width / 1.3,
    height: 290,
    //borderRadius: 5,
    alignItems: "flex-start",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 5,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  modalSignUpTxt: {
    position: "relative",
    width: "95%",
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0,0,0,0.98)",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingTop: 3,
    paddingBottom: 3,
  },
  modalmessagetxt: {
    fontSize: 16,
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
