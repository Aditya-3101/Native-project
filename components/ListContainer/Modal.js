import React from "react";
import "intl";
import "intl/locale-data/jsonp/en";
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

  const navigation = useNavigation();

  return (
    <View>
      {data.map((para, index) => {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              setSelected(para.ProductId + para.ProductType);
              navigation.navigate("Detail", { paths: "normal" });
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
                />
              </View>
              <View style={styles.dataCont}>
                <Text
                  style={{
                    fontSize: para.Sname
                      ? 17
                      : para.LPname !== undefined
                      ? para.LPname.replace(/\s+/g, "").length < 25
                        ? 16
                        : 14
                      : para.Tbname !== undefined
                      ? 12.5
                      : 14,
                    textAlign:
                      index % 2 === 0
                        ? "left"
                        : para.LPname !== undefined
                        ? "justify"
                        : para.Tvname !== undefined
                        ? "justify"
                        : para.Tbname !== undefined
                        ? "justify"
                        : "right",
                    width: "100%",
                    fontWeight: "bold",
                    paddingBottom: 1,
                    marginBottom: 1,
                    textTransform: "uppercase",
                  }}
                >
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
                  {parseInt(
                    para.Sprice
                      ? para.Sprice
                      : para.LPprice
                      ? para.LPprice
                      : para.Wprice
                      ? para.Wprice
                      : para.Rfprice
                      ? para.Rfprice
                      : para.Tvprice
                      ? para.Tvprice
                      : para.Tbprice
                      ? para.Tbprice
                      : null
                  )
                    .toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      // minimumFractionDigits: 2,
                      // maximumFractionDigits: 1,
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
                      {para.Sosver
                        ? para.Sosver
                        : para.LPprobr
                        ? para.LPprobr
                        : para.Wcolor
                        ? para.Wcolor
                        : para.Rfcolor
                        ? para.Rfcolor
                        : para.Tvhdmi
                        ? para.Tvhdmi + " x HDMI"
                        : para.TbOs
                        ? para.TbOs
                        : null}
                    </Text>
                    <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                      {para.Sram
                        ? para.Sram + "GB"
                        : para.LPram
                        ? para.LPram + "GB"
                        : para.Sbrand
                        ? para.Sbrand
                        : null}
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
                        : para.LPstorage !== undefined
                        ? para.LPstorage < 50
                          ? para.LPstorage + "TB"
                          : para.LPstorage + "GB"
                        : para.WavgCapacity
                        ? para.WavgCapacity + "Kg"
                        : para.Rfstorage
                        ? para.Rfstorage + "L"
                        : para.TvdisplaySize
                        ? para.TvdisplaySize + "Inch"
                        : para.TbdisplaySize
                        ? para.TbdisplaySize + "inch"
                        : null}
                    </Text>
                    <Text style={{ backgroundColor: "#e9ecef", padding: 1 }}>
                      {String(para.Sprocessor).includes("Snapdragon")
                        ? String(para.Sprocessor).replace("Snapdragon", "SD")
                        : ""}
                      {String(para.Sprocessor).includes("Bionic chip")
                        ? String(para.Sprocessor).replace("Bionic chip", "")
                        : ""}
                      {para.LPos ? para.LPos : null}
                      {para.WRPM !== undefined ? para.WRPM + "RPM" : null}
                      {para.Rfcool ? para.Rfcool : null}
                      {para.TvrfRate ? para.TvrfRate : null}
                      {para.Tbstorage ? para.Tbstorage + "GB" : null}
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
