import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { MobileContext } from "../contexts/MobileContext";
import { DetailContext } from "../contexts/DetailContext";
import { useNavigation } from "@react-navigation/native";

const Modal = (props) => {
  //const [data, setData] = useContext(MobileContext);

  const [selected, setSelected] = useContext(DetailContext);

  const data = [...props.data];

  //console.log(data);

  const navigation = useNavigation();

  console.log(
    "data reached to modal component" +
      new Date().toLocaleString().replace(",", "")
  );

  return (
    <View>
      {data.map((para, index) => {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              setSelected(para.ProductId + para.ProductType);
              navigation.navigate("Detail");
            }}
          >
            <View
              style={{
                position: "relative",
                display: "flex",
                flexDirection: index % 2 == 0 ? "row" : "row-reverse",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 10,
                marginBottom: 5,
                backgroundColor: "white",
                borderRadius: 5,
                padding: 10,
                paddingTop: 4,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              <View>
                <Image
                  style={styles.imgViewer}
                  source={{
                    uri: para.Simg ? para.Simg : para.LPpriimg,
                  }}
                />
              </View>
              <View style={styles.dataCont}>
                <Text
                  style={{
                    fontSize: para.Sname
                      ? 17
                      : para.LPname.replace(/\s+/g, "").length < 25
                      ? 17
                      : 15,
                    textAlign:
                      index % 2 === 0
                        ? "left"
                        : para.LPname
                        ? "justify"
                        : "right",
                    width: "100%",
                    fontWeight: "bold",
                    paddingBottom: 1,
                    marginBottom: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {para.Sname ? para.Sname : para.LPname}
                </Text>
                <Text
                  style={{
                    width: "100%",
                    textAlign: index % 2 === 0 ? "left" : "right",
                    color: "#495057",
                    fontSize: 13,
                    fontWeight: "700",
                    marginTop: 1,
                    marginBottom: 5,
                  }}
                >
                  {parseInt(para.Sprice ? para.Sprice : para.LPprice)
                    .toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      //minimumFractionDigits: 2,
                      //maximumFractionDigits: 2,
                    })
                    .replace(".00", "")}
                </Text>
                <View style={styles.minidiv}>
                  <View
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                      justifyContent: "space-between",
                      alignContent: "space-around",
                      width: "80%",
                      marginLeft: index % 2 === 0 ? "0%" : "20%",
                      marginRight: index % 2 === 0 ? "0%" : "20%",
                    }}
                  >
                    <Text
                      style={{
                        backgroundColor: "#e9ecef",
                        position: "relative",
                        padding: 1,
                      }}
                    >
                      {para.Sosver ? para.Sosver : para.LPprobr}
                    </Text>
                    <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                      {para.Sram ? para.Sram + "GB" : para.LPram + "GB"}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                      justifyContent: "space-between",
                      alignContent: "space-around",
                      width: "80%",
                      marginLeft: index % 2 === 0 ? "0%" : "20%",
                      marginRight: index % 2 === 0 ? "0%" : "20%",
                    }}
                  >
                    <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                      {para.Sstorage
                        ? para.Sstorage + "GB"
                        : para.LPstorage < 50
                        ? para.LPstorage + "TB"
                        : para.LPstorage + "GB"}
                    </Text>
                    <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                      {String(para.Sprocessor).includes("Snapdragon")
                        ? String(para.Sprocessor).replace("Snapdragon", "SD")
                        : ""}
                      {String(para.Sprocessor).includes("Bionic chip")
                        ? String(para.Sprocessor).replace("Bionic chip", "")
                        : ""}
                      {para.LPos}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  imgViewer: {
    resizeMode: "contain",
    width: 125,
    height: 125,
  },
  dataCont: {
    position: "relative",
    width: Dimensions.get("window").width / 2,
    height: 120,
    //backgroundColor: "cyan",
    //height: Dimensions.get("window").height / 5,
    position: "relative",
    alignContent: "space-around",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
  },
  modalText: {
    width: "100%",
    textAlign: "left",
    padding: 0,
    margin: 0,
  },
  modalTextName: {
    fontSize: 17,
    textAlign: "left",
    width: "100%",
    fontWeight: "900",
  },
  minidiv: {
    width: "100%",
    height: "50%",
    display: "flex",
    alignContent: "space-around",
    justifyContent: "space-between",
    alignContent: "space-between",
    position: "relative",
  },
  miniModal: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-around",
    width: "80%",
    marginLeft: "20%",
  },
});

export default Modal;
