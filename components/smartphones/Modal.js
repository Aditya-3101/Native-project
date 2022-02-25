import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { MobileContext } from "../contexts/MobileContext";

const Modal = (props) => {
  //const [data, setData] = useContext(MobileContext);
  const data = [...props.data];

  return (
    <View>
      {data.map((para, index) => {
        return (
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
            key={index}
          >
            <View>
              <Image
                style={styles.imgViewer}
                source={{
                  uri: para.Simg,
                }}
              />
            </View>
            <View style={styles.dataCont}>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: index % 2 === 0 ? "left" : "right",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                {para.Sname}
              </Text>
              <Text
                style={{
                  width: "100%",
                  textAlign: index % 2 === 0 ? "left" : "right",
                  color: "#495057",
                  fontSize: 13,
                  fontWeight: "400",
                  marginBottom: 5,
                }}
              >
                {parseInt(para.Sprice)
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
                    {para.Sosver}
                  </Text>
                  <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                    {para.Sram + "GB"}
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
                    {para.Sstorage + "GB"}
                  </Text>
                  <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                    {String(para.Sprocessor).includes("Snapdragon")
                      ? String(para.Sprocessor).replace("Snapdragon", "SD")
                      : ""}
                    {String(para.Sprocessor).includes("Bionic chip")
                      ? String(para.Sprocessor).replace("Bionic chip", "")
                      : ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
    width: Dimensions.get("window").width / 2.3,
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
