import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../contexts/ProfileContext";
import { DetailContext } from "../contexts/DetailContext";
import { requestForegroundPermissionsAsync } from "expo-location";

const { width, height } = Dimensions.get("window");

const Order = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useContext(ProfileContext);

  const [selected, setSelected] = useContext(DetailContext);

  const { userName, userAdress, Pnumber } = profile[0];

  const [data, setData] = useState([]);

  const [product, setProduct] = useState([]);

  const [item, setItem] = useState([]);

  const [unique, setunique] = useState([]);

  useLayoutEffect(() => {
    let mounted = true;
    fetch(`http://192.168.43.29:4000/api/main/orders/get?number=${Pnumber}`)
      .then((Res) => Res.json())
      .then((res) => {
        //console.log(res);
        mounted ? setData(res) : null;
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const Restore = () => {
    fetch(`http://192.168.43.29:4000/api/main/orders/get?number=${Pnumber}`)
      .then((Res) => Res.json())
      .then((res) => {
        //console.log(res);
        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteOption = (params) => {
    console.log(params);
    fetch(`http://192.168.43.29:4000/api/main/orders/remove?id=${params}`)
      .then((Res) => Res.json())
      .then((result) => {
        Restore();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={"rgb(255,255,255)"}
        barStyle={"dark-content"}
        hidden={true}
      />
      <ScrollView>
        <View style={styles.header}>
          <MaterialIcon
            name="arrow-back-ios"
            style={styles.backArrow}
            onPress={() => navigation.navigate("Home")}
          />
          <Text style={styles.ordersHeader}>My orders</Text>
          <View style={styles.emptyCorner}></View>
        </View>
        {data.length == 0 ? (
          <View style={styles.orderPage}>
            <Image
              source={require("../images/undraw_empty_cart_co35.png")}
              style={styles.noorderimg}
            />
            <Text style={styles.emptymsg}>
              cart is empty!!{" "}
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.linktxt}>order somthing</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        ) : (
          <View style={styles.dataContainer}>
            {data.map((para, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelected(para.orderProduct + para.OrderProductType);
                    navigation.navigate("Detail", { paths: "normal" });
                  }}
                >
                  <View
                    style={{
                      width: "96%",
                      backgroundColor: "rgb(255,255,255)",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginBottom: para.ordersStatus === "Delivered" ? 8 : 0,
                    }}
                  >
                    <View style={styles.orderCard}>
                      <Text style={styles.styleTxt}>
                        {" "}
                        {para.Sname
                          ? para.Sname
                          : para.LPname
                          ? para.LPname
                          : para.Wname
                          ? para.Wname
                          : para.RfName
                          ? para.RfName
                          : para.Tvname
                          ? para.Tvname
                          : para.Tbname
                          ? para.Tbname
                          : null}
                      </Text>
                      <Text>
                        {para.Sprice
                          ? parseInt(para.Sprice)
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .replace(".00", "")
                          : para.LPprice
                          ? parseInt(para.LPprice)
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .replace(".00", "")
                          : para.Wprice
                          ? parseInt(para.Wprice)
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .replace(".00", "")
                          : para.Rfprice
                          ? parseInt(para.Rfprice)
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .replace(".00", "")
                          : para.Tvprice
                          ? parseInt(para.Tvprice)
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .replace(".00", "")
                          : para.Tbprice
                          ? parseInt(para.Tbprice)
                              .toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                              .replace(".00", "")
                          : null}
                      </Text>
                      <View style={styles.ordercode}>
                        <MaterialIcon
                          name="fiber-manual-record"
                          style={{
                            fontSize: 14,
                            color:
                              para.ordersStatus === "Delivered"
                                ? "rgb(75,181,67)"
                                : para.ordersStatus === "Processing"
                                ? "rgb(50,185,255)"
                                : "red",
                          }}
                        />
                        <Text
                          style={{
                            width: "90%",
                          }}
                        >
                          {para.ordersStatus === "Delivered"
                            ? para.ordersStatus +
                              " on " +
                              String(para.shippingDate).slice(0, 10)
                            : para.ordersStatus}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 12, color: "gray" }}>
                        OD {"0000" + para.orderID}
                      </Text>
                    </View>
                    <View style={styles.orderImg}>
                      <Image
                        source={{
                          uri: para.Simg
                            ? para.Simg
                            : para.LPpriimg
                            ? para.LPpriimg
                            : para.Wpriimg
                            ? para.Wpriimg
                            : para.Rfpriimg
                            ? para.Rfpriimg
                            : para.Tvpriimg
                            ? para.Tvpriimg
                            : para.Tbpriimg
                            ? para.Tbpriimg
                            : null,
                        }}
                        style={styles.imgdim}
                      />
                    </View>
                  </View>
                  {para.ordersStatus === "Processing" ? (
                    <View style={styles.btncontainer}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          Alert.alert(
                            "Hold on!",
                            "Are you sure you want to cancel?☹️",
                            [
                              {
                                text: "Cancel",
                                onPress: () => null,
                                style: "cancel",
                              },
                              {
                                text: "YES",
                                onPress: () => deleteOption(para.orderProduct),
                              },
                            ]
                          );
                        }}
                      >
                        <View style={styles.delOption}>
                          <MaterialIcon name="delete" style={styles.delicon} />
                          <Text>Cancel</Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelected(
                            para.orderProduct + para.OrderProductType
                          );
                          navigation.navigate("Detail", { paths: "normal" });
                        }}
                      >
                        <View style={styles.proceedOn}>
                          <Text>Proceed</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  orderPage: {
    width: width,
    height: height - 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255,255,255)",
  },
  noorderimg: {
    width: 200,
    height: 200,
  },
  header: {
    width: width,
    height: 50,
    justifyContent: "space-around",
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backArrow: {
    width: "25%",
    fontSize: 28,
    color: "rgba(0,0,0,0.9)",
    alignItems: "center",
  },
  ordersHeader: {
    color: "rgba(30,122,255,0.98) ",
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: 16,
    letterSpacing: 1,
  },
  emptyCorner: {
    width: "25%",
  },
  emptymsg: {
    textTransform: "capitalize",
    fontSize: 15,
  },
  linktxt: {
    color: "rgba(30,122,255,0.98)",
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  singleCard: {
    width: "96%",
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cards: {
    width: "100%",
  },
  orderCard: {
    width: "70%",
    justifyContent: "space-evenly",
    paddingLeft: "1%",
  },
  orderImg: {
    width: "27%",
  },
  imgdim: {
    width: 85,
    height: 85,
    resizeMode: "contain",
    marginBottom: 10,
    marginTop: 10,
  },
  styleTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ordercode: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  delicon: {
    fontSize: 22,
    color: "rgba(20,20,20,0.9)",
    margin: 3.5,
  },
  btncontainer: {
    flexDirection: "row",
    width: "96%",
  },
  delOption: {
    width: "50%",
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 2,
    marginBottom: 8,
    borderBottomLeftRadius: 15,
    borderRightColor: "black",
    borderRightWidth: 0.1,
    borderTopColor: "rgb(0,0,0)",
    borderTopWidth: 0.2,
  },
  proceedOn: {
    width: "50%",
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 2,
    marginBottom: 8,
    borderBottomRightRadius: 15,
    borderLeftColor: "black",
    borderLeftWidth: 0.1,
    borderTopColor: "rgb(0,0,0)",
    borderTopWidth: 0.2,
  },
});
