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
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Widgets from "../widgets/Widgets";
import { IntakeContext } from "../contexts/Intake";
import { CartContext } from "../contexts/Getcart";
import { MobileContext } from "../contexts/MobileContext";
import { LaptopContext } from "../contexts/LaptopContext";
import { WmacContext } from "../contexts/WmachineContext";

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

  const [width, setWidth] = useState(Dimensions.get("window").width);

  const [sideBarList, setSideBarList] = useState([
    "All Categories",
    "My Account",
    "My Cart",
    "My Orders",
    "Report Problem",
  ]);

  const [showRecommand, setShowRecommand] = useState(false);

  const [sData, setSdata] = useState([]);

  const [showSM, setShowSM] = useState(false);

  const [foundSM, setFoundSM] = useState(0);

  const [foundLP, setFoundLP] = useState(false);

  const [foundWM, setFoundWM] = useState(false);

  //let foundWM = false;

  const [showLP, setShowLP] = useState(false);

  const [showWm, setShowWm] = useState(false);

  const [ldata, setLdata] = useState([]);

  const [wmdata, setWmData] = useState([]);

  useEffect(() => {
    //console.log(search);
    //setShowRecommand(true);
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
    } else {
      setShowRecommand(false);
    }
  }, [search]);

  useEffect(() => {
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
  }, []);

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
        //console.log(value + index);
        //setSearch();
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
        //setSearch();
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
    if (foundLP === false) {
      setIntake(search);
      navigation.navigate("empty");
    }
    //   if (
    //     String(value.Sname).includes(search) == true ||
    //     String(value.Sname).toLowerCase().includes(search) === true ||
    //     String(value.Sname).toUpperCase().includes(search) === true ||
    //     String(value.Sname).includes(
    //       String(search)
    //         .toLowerCase()
    //         .split(" ")
    //         .map((i, j) => i.charAt(0).toUpperCase() + i.slice(1))
    //         .join(" ")
    //     ) === true
    //   ) {
    //     setIntake("Mobiles," + search);
    //     navigation.navigate("Lists");
    //     setFoundSM(true);
    //     //console.log(value + index);
    //     //setSearch();
    //   } else if (foundSM == false) {
    //     setIntake(search);
    //     navigation.navigate("empty");
    //   }
    // });
    //setSearch();
  };

  useEffect(() => {
    setSmData([]);
    setLpData([]);
    setWdata([]);
    setSearch("");
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
      name: "Washing Machine",
    },
    {
      name: "Tablets",
    },
  ];

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
            onPress={() => console.log("pressed")}
            //onSubmitEditing={()=>console.log(search+'search')}
            onSubmitEditing={() => SearchThis()}
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
                  } else if (para.name === "Washing Machine") {
                    setIntake("Wmachine");
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
          backgroundColor: "rgba(50,50,50,0.6)",
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
                width: "50%",
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
                }}
              >
                Username
              </Text>
              <MaterialIcon
                name="build"
                color="rgb(250,250,250)"
                style={{ fontSize: 16 }}
              />
            </View>
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
          height: 100,
          backgroundColor: "rgba(50,50,50,0.02)",
          alignItems: "center",
          //marginTop: -400,
          //top: 0,
          position: "absolute",
          top: 100,
          //bottom: Dimensions.get("window").height - 200,
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
        </View>
      </View>
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
});

export default Home;
