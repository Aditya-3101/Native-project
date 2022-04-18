import React from "react";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
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
  Keyboard,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Widgets from "../widgets/Widgets";
import { IntakeContext } from "../contexts/Intake";
import { CartContext } from "../contexts/Getcart";
import { MobileContext } from "../contexts/MobileContext";
import { LaptopContext } from "../contexts/LaptopContext";
import { FridgeContext } from "../contexts/FridgeContext";
import { WmacContext } from "../contexts/WmachineContext";
import { Tvcontext } from "../contexts/TvContext";
import { TabletContext } from "../contexts/TabletContext";
import { ProfileContext } from "../contexts/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [search, setSearch] = useState("");

  const [intake, setIntake] = useContext(IntakeContext);

  const [showSideBar, setShowSideBar] = useState(false);

  const [items, setItems] = useContext(CartContext);

  const [smData, setSmData] = useContext(MobileContext);

  const [lpData, setLpData] = useContext(LaptopContext);

  const [wdata, setWdata] = useContext(WmacContext);

  const [fridgeData, setFridgeData] = useContext(FridgeContext);

  const [tvData, setTvData] = useContext(Tvcontext);

  const [tabletData, setTabletData] = useContext(TabletContext);

  const [profile, setProfile] = useContext(ProfileContext);

  const { userName, Pnumber } = profile[0];

  const getIndex = String(userName).indexOf(" ");

  const [sideBarList, setSideBarList] = useState([
    "All Categories",
    "My Account",
    "My Cart",
    "My Orders",
    "Report Problem",
    "Logout",
  ]);

  const [showRecommand, setShowRecommand] = useState(false);

  const [sData, setSdata] = useState([]);

  const [showSM, setShowSM] = useState(false);

  const [foundSM, setFoundSM] = useState(0);

  const [foundLP, setFoundLP] = useState();

  const [foundWM, setFoundWM] = useState(false);

  //let foundWM = false;

  const [showLP, setShowLP] = useState(false);

  const [showWm, setShowWm] = useState(false);

  const [ldata, setLdata] = useState([]);

  const [wmdata, setWmData] = useState([]);

  const [Rfdata, setRfdata] = useState([]);

  const [Tvsdata, setTvsData] = useState([]);

  const [tbsData, setTbsData] = useState([]);

  const [showRf, setShowRf] = useState(false);

  const [showTv, setShowTv] = useState(false);

  const [showTb, setShowTb] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (search.length > 1) {
      if (sData.some((i) => i.Sname.includes(search))) {
        setShowSM(true);
        setShowRecommand(true);
      } else {
        setShowSM(false);
      }
      if (ldata.some((i) => i.LPname.includes(search))) {
        setShowLP(true);
        setShowRecommand(true);
      } else {
        setShowLP(false);
      }
      if (wmdata.some((i) => i.Wname.includes(search))) {
        setShowWm(true);
        setShowRecommand(true);
      } else {
        setShowWm(false);
      }
      if (Rfdata.some((i) => i.RfName.includes(search))) {
        setShowRf(true);
        setShowRecommand(true);
      } else {
        setShowRf(false);
      }
      if (Tvsdata.some((i) => i.Tvname.includes(search))) {
        setShowTv(true);
        setShowRecommand(true);
      } else {
        setShowTv(false);
      }
      if (tbsData.some((i) => i.TbRealName.includes(search))) {
        setShowTb(true);
        setShowRecommand(true);
      } else {
        setShowTb(false);
      }
    } else {
      setShowRecommand(false);
    }
  }, [search]);

  useLayoutEffect(() => {
    fetch(`http://192.168.43.29:4000/api/main/data/sm`)
      .then((res) => res.json())
      .then((result) => {
        setSdata(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/lp`)
      .then((res) => res.json())
      .then((result) => {
        setLdata(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/wm`)
      .then((res) => res.json())
      .then((result) => {
        setWmData(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/Rf`)
      .then((res) => res.json())
      .then((result) => {
        setRfdata(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/Tv`)
      .then((res) => res.json())
      .then((result) => {
        setTvsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/Tb`)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setTbsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = async () => {
    //console.log("logout pressed");
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  };

  const RedirectTo = (name) => {
    if (name === "All Categories") {
      navigation.navigate("allCategories");
    }
    if (name === "Logout") {
      setModalVisible(true);
    }
    if (name === "My Account") {
      navigation.navigate("Profile");
    }
    if (name === "My Cart") {
      navigation.navigate("carts");
    }
    if (name === "My Orders") {
      navigation.navigate("carts");
    }
    if (name === "Report Problem") {
      navigation.navigate("reports");
    }
  };

  const SearchThis = () => {
    sData.map((value, index) => {
      if (
        String(value.Sname).includes(search) == true ||
        String(value.Sname).toLowerCase().includes(search) === true ||
        String(value.Sname).toUpperCase().includes(search) === true ||
        String(value.Sname).includes(
          String(search)
            .toLowerCase()
            .split(" ")
            .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
            .join(" ")
        ) === true
      ) {
        setIntake("Mobiles," + search);
        navigation.navigate("Lists");
        setFoundLP(true);
      }
    });
    ldata.map((value, index) => {
      if (
        String(value.LPname).includes(search) === true ||
        String(value.LPname).toLowerCase().includes(search) === true ||
        String(value.LPname).toUpperCase().includes(search) === true ||
        String(value.LPname).includes(
          String(search)
            .toLowerCase()
            .split(" ")
            .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
            .join(" ")
        ) === true
      ) {
        setIntake("Laptops," + search);
        navigation.navigate("Lists");
        setFoundLP(true);
      }
    });
    wmdata.map((value, index) => {
      if (
        String(value.Wname).includes(search) === true ||
        String(value.Wname).toLowerCase().includes(search) === true ||
        String(value.Wname).toUpperCase().includes(search) === true ||
        String(value.Wname).includes(
          String(search)
            .toLowerCase()
            .split(" ")
            .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
            .join(" ")
        ) === true
      ) {
        setIntake("Wmachine," + search);
        setFoundLP(true);
        //foundWM = true;
        navigation.navigate("Lists");
        //setSearch();
      }
    });
    Rfdata.map((value, index) => {
      if (
        String(value.RfName).includes(search) === true ||
        String(value.RfName).toLowerCase().includes(search) === true ||
        String(value.RfName).toUpperCase().includes(search) === true ||
        String(value.RfName).includes(
          String(search)
            .toLowerCase()
            .split(" ")
            .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
            .join(" ")
        ) === true
      ) {
        setIntake("Fridges," + search);
        setFoundLP(true);
        //foundWM = true;
        navigation.navigate("Lists");
        //setSearch();
      }
    });
    Tvsdata.map((value, index) => {
      if (
        String(value.Tvname).includes(search) == true ||
        String(value.Tvname).toLowerCase().includes(search) === true ||
        String(value.Tvname).toUpperCase().includes(search) === true ||
        String(value.Tvname).includes(
          String(search)
            .toLowerCase()
            .split(" ")
            .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
            .join(" ")
        ) === true
      ) {
        setIntake("Televisions," + search);
        navigation.navigate("Lists");
        setFoundLP(true);
      }
    });
    tbsData.map((value, index) => {
      if (
        String(value.TbRealName).includes(search) == true ||
        String(value.TbRealName).toLowerCase().includes(search) === true ||
        String(value.TbRealName).toUpperCase().includes(search) === true ||
        String(value.TbRealName).includes(
          String(search)
            .toLowerCase()
            .split(" ")
            .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
            .join(" ")
        ) === true
      ) {
        setIntake("Tablets," + search);
        navigation.navigate("Lists");
        setFoundLP(true);
      } else {
        setFoundLP(false);
      }
    });
  };

  useEffect(() => {
    if (foundLP === false) {
      setIntake(search);
      navigation.navigate("empty");
    }
  }, [foundLP]);

  useEffect(() => {
    setSmData([]);
    setLpData([]);
    setWdata([]);
    setFridgeData([]);
    setTvData([]);
    setTabletData([]);
    setSearch("");
    setShowSideBar(false);
  }, [isFocused]);

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
      name: "Smart Tv",
    },
    {
      name: "Tablets",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={"rgb(20,20,20)"}
        barStyle="light-content"
        hidden={false}
      />
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.header}>NativeFy</Text>
          <MaterialIcon
            name="local-mall"
            color="white"
            fontsize={45}
            style={styles.cartIcon}
            onPress={() => navigation.navigate("carts")}
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
          <Icon
            name="bars"
            color="rgb(250,250,250)"
            style={styles.options}
            onPress={() => setShowSideBar(true)}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={setSearch}
            value={search}
            placeholder="Search"
            placeholderTextColor={"white"}
            onSubmitEditing={() => SearchThis()}
          />
          <Icon
            name="user-circle"
            color="rgb(250,250,250)"
            style={styles.cartIcon}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
        </View>
        <View style={styles.navbar}>
          {Data.map((para) => {
            return (
              <TouchableOpacity
                key={para.name}
                onPress={() => {
                  if (para.name === "Mobiles") {
                    setIntake("mobiles");
                    navigation.navigate("Lists");
                  } else if (para.name === "Laptops") {
                    setIntake("Laptops");
                    navigation.navigate("Lists");
                  } else if (para.name === "Smart Tv") {
                    setIntake("Tvs");
                    navigation.navigate("Lists");
                  } else if (para.name == "All") {
                    navigation.navigate("allCategories");
                  } else if (para.name === "Tablets") {
                    setIntake("Tablets");
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
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          backgroundColor: "rgba(50,50,50,0.4)",
          transform:
            showSideBar === true
              ? [{ translateX: 0 }]
              : [
                  {
                    translateX: -Dimensions.get("window").width,
                  },
                ],
        }}
      >
        <View
          style={{
            width: "66%",
            backgroundColor: "white",
            height: Dimensions.get("window").height,
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "relative",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.95)",
              alignItems: "flex-end",
            }}
          >
            <MaterialIcon
              name="clear"
              style={{
                color: "rgb(250,230,240)",
                fontSize: 28,
                //width: "100%",
                justifyContent: "flex-end",
                margin: 4,
              }}
              onPress={() => setShowSideBar(false)}
            />
          </View>

          <View
            style={{
              position: "relative",
              width: "100%",
              height: 150,
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.95)",
            }}
          >
            <Icon
              name="user-circle"
              color="rgb(250,250,250)"
              style={{ fontSize: 80 }}
            />
            <View
              style={{
                width: "45%",
                marginLeft: "9%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  //width: "50%",
                  textAlign: "center",
                }}
              >
                {String(userName).substring(0, getIndex)}
              </Text>
              <MaterialIcon
                name="build"
                color="rgb(250,250,250)"
                style={{ fontSize: 16 }}
                onPress={() => navigation.navigate("Profile")}
              />
            </View>
            <Text style={{ color: "rgb(255,255,255)", fontSize: 15 }}>
              {Pnumber}
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                justifyContent: "space-evenly",
                //height: Dimensions.get("window").height - 350,
              }}
            >
              {sideBarList.map((params, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                    onPress={() => RedirectTo(params)}
                  >
                    <MaterialIcon
                      name={
                        params === "All Categories"
                          ? "menu"
                          : params === "My Account"
                          ? "account-circle"
                          : params === "My Cart"
                          ? "local-mall"
                          : params === "My Orders"
                          ? "view-list"
                          : params === "Report Problem"
                          ? "report-problem"
                          : params === "Logout"
                          ? "logout"
                          : null
                      }
                      style={{
                        fontSize: 28,
                        color: "rgba(0,0,0,0.77)",
                        marginRight: 5,
                      }}
                    />
                    <Text
                      style={{ fontSize: 16, marginBottom: 12, marginTop: 12 }}
                    >
                      {params}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          width: Dimensions.get("window").width,
          //height:100
          backgroundColor: "rgba(50,50,50,0.02)",
          alignItems: "center",
          position: "absolute",
          top: 100,
          display: showRecommand ? "flex" : "none",
          zIndex: showRecommand ? 0 : -5,
        }}
      >
        <View
          style={{
            width: "70%",
            backgroundColor: "rgb(250,250,250)",
            borderRadius: 5,
            display: showRecommand ? "flex" : "none",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setIntake("Mobiles," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 2,
                fontSize: 16,
                display: showSM ? "flex" : "none",
                height: showSM ? "auto" : 0,
              }}
            >
              {showSM === true ? search + " in Mobiles" : null}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIntake("Laptops," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 2,
                fontSize: 16,
                display: showLP ? "flex" : "none",
                height: showLP ? "auto" : 0,
              }}
            >
              {showLP === true ? search + " in Laptops" : null}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIntake("Wmachine," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 2,
                fontSize: 16,
                display: showWm ? "flex" : "none",
                height: showWm ? "auto" : 0,
              }}
            >
              {showWm === true ? search + " in Washing Machines" : null}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIntake("Fridges," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 2,
                fontSize: 16,
                display: showRf ? "flex" : "none",
                height: showRf ? "auto" : 0,
              }}
            >
              {showRf === true ? search + " in Refrigerators" : null}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIntake("Televisions," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 2,
                fontSize: 16,
                display: showTv ? "flex" : "none",
                height: showTv ? "auto" : 0,
              }}
            >
              {showTv === true ? search + " in Tv's" : null}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIntake("Tablets," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 2,
                fontSize: 16,
                display: showTb ? "flex" : "none",
                height: showTb ? "auto" : 0,
              }}
            >
              {showTb === true ? search + " in Tablets" : null}
            </Text>
          </TouchableWithoutFeedback>
        </View>
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
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  main: {
    //height: Dimensions.get("window").height / 10,
    height: 50,
    justifyContent: "center",
    backgroundColor: "rgb(20,20,20)",
    borderBottomColor: "black",
    width: Dimensions.get("window").width,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    zIndex: 99,
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
    //height: Dimensions.get("window").height / 12,
    height: 50,
    backgroundColor: "rgb(20,20,20)",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    zIndex: 99,
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

export default Home;
