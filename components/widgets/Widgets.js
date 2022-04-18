import React from "react";
import { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IntakeContext } from "../contexts/Intake";

const { width, height } = Dimensions.get("window");

const Widgets = () => {
  const navigation = useNavigation();

  const [intake, setIntake] = useContext(IntakeContext);
  return (
    <>
      <View>
        <View style={Styles.sm}>
          <View style={Styles.text_Container}>
            <Text style={{ color: "#e9ecef", fontSize: 17 }}>
              Get Brand new Oneplus 9
            </Text>
            <Text style={{ color: "#e9ecef", fontSize: 17, marginBottom: 10 }}>
              At an affordable Price
            </Text>
            <TouchableWithoutFeedback
              style={Styles.sm_Btn}
              onPress={() => {
                setIntake("mobiles");
                navigation.navigate("Lists");
              }}
            >
              <Text
                style={{
                  color: "rgb(255,255,255)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: 3,
                  padding: 7,
                }}
              >
                Click Here
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Image
              source={require("../images/oneplus-9.png")}
              style={Styles.sm_Image}
            />
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setIntake("Laptops");
            navigation.navigate("Lists");
          }}
        >
          <View style={Styles.lp}>
            <View>
              <Image
                source={require("../images/Asus_vivobook_pri.png")}
                style={Styles.lp_Image}
              />
            </View>
            <View style={Styles.lp_text_container}>
              <Text
                style={{ color: "#495057", fontSize: 15, textAlign: "center" }}
              >
                Get Your New Asus Vivobook
              </Text>
              <Text
                style={{ color: "#495057", fontSize: 15, textAlign: "center" }}
              >
                At an affordable Price
              </Text>
              <Text
                style={{
                  color: "#495057",
                  fontSize: 16,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                of Rs.36900!!
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={Styles.tb}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setIntake("Tablets," + "Apple");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.tb_btn}>Buy Now</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require("../images/Ipad_air_a14_edited.jpg")}
              style={Styles.tb_Image}
            />
          </View>
          <View style={Styles.tb_text_container}>
            <Text
              style={{
                color: "rgba(0,0,0,0.8)",
                fontSize: 19,
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 12,
                marginBottom: 14,
              }}
            >
              Upto 30% Of on iPads
            </Text>
          </View>
        </View>
        <View style={Styles.wash}>
          <View style={Styles.wheader}>
            <Text style={Styles.WheaderText}>Washing Machines</Text>
            <TouchableOpacity
              style={Styles.viewBtn}
              onPress={() => {
                setIntake("Wmachine");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.viewTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.wimg}
            source={{
              uri: "https://i.ibb.co/BnFR6zX/8-ww80t504dan-tl-samsung-original-imagfuksqew4afy3.jpg",
            }}
          />
          <Text
            style={{ fontSize: 17, textAlign: "center", fontWeight: "600" }}
          >
            Samsung 7kg AI Enabled Fully Automatic Washing Machine
          </Text>
          <Text style={Styles.Wprice}>Rs.32,000</Text>
          <TouchableOpacity
            style={Styles.Wbuy}
            onPress={() => {
              setIntake("Wmachine," + "Samsung");
              navigation.navigate("Lists");
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.wash}>
          <View style={Styles.wheader}>
            <Text style={Styles.WheaderText}>Smart Tv's</Text>
            <TouchableOpacity
              style={Styles.viewBtn}
              onPress={() => {
                setIntake("Tvs");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.viewTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.wimg}
            source={{
              uri: "https://i.ibb.co/k0tS3MY/samsung-sm-pri.png",
            }}
          />
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "600" }}
          >
            Samsung 43inch Ultra HD Smart Tv
          </Text>
          <Text style={Styles.Wprice}>Rs.42,500</Text>
          <TouchableOpacity
            style={Styles.Wbuy}
            onPress={() => {
              setIntake("Televisions," + "Samsung");
              navigation.navigate("Lists");
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.wash}>
          <View style={Styles.wheader}>
            <Text style={Styles.WheaderText}>Refrigerators</Text>
            <TouchableOpacity
              style={Styles.viewBtn}
              onPress={() => {
                setIntake("Fridge");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.viewTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.wimg}
            source={{
              uri: "https://i.ibb.co/ZzMRjKj/Samsung-sil-pri.png",
            }}
          />
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "600" }}
          >
            Samsung 230L Direct Cool
          </Text>
          <Text style={Styles.Wprice}>Rs.17,190</Text>
          <TouchableOpacity
            style={Styles.Wbuy}
            onPress={() => {
              setIntake("Fridges," + "Samsung");
              navigation.navigate("Lists");
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.wash}>
          <View style={Styles.wheader}>
            <Text style={Styles.WheaderText}>Tablets</Text>
            <TouchableOpacity
              style={Styles.viewBtn}
              onPress={() => {
                setIntake("Tablets");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.viewTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.wimg}
            source={{
              uri: "https://bit.ly/3K9Wm1w",
            }}
          />
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "600" }}
          >
            Nokia Tab T20 3GB RAM 32GB ROM 10.36 inch with Wi-Fi Only Tablet
          </Text>
          <Text style={Styles.Wprice}>Rs.15,500</Text>
          <TouchableOpacity
            style={Styles.Wbuy}
            onPress={() => {
              setIntake("Tablets," + "Nokia");
              navigation.navigate("Lists");
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.wash}>
          <View style={Styles.wheader}>
            <Text style={Styles.WheaderText}>Smartphones</Text>
            <TouchableOpacity
              style={Styles.viewBtn}
              onPress={() => {
                setIntake("mobiles");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.viewTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.wimg}
            source={{
              uri: "https://i.ibb.co/4MJFN7Q/61b-UBi7-U6-S-SL1500.jpg",
            }}
          />
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "600" }}
          >
            Oneplus Nord CE
          </Text>
          <Text style={Styles.Wprice}>Rs.22,999</Text>
          <TouchableOpacity
            style={Styles.Wbuy}
            onPress={() => {
              setIntake("Mobiles," + "Oneplus");
              navigation.navigate("Lists");
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.wash}>
          <View style={Styles.wheader}>
            <Text style={Styles.WheaderText}>Laptops</Text>
            <TouchableOpacity
              style={Styles.viewBtn}
              onPress={() => {
                setIntake("Laptops");
                navigation.navigate("Lists");
              }}
            >
              <Text style={Styles.viewTxt}>View All</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={Styles.wimg}
            source={{
              uri: "https://i.ibb.co/S644JSn/71-Wu-DXp-TAl-L-AC-UY327-FMwebp-QL65.webp",
            }}
          />
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "600" }}
          >
            Asus Vivobook x400 Ryzen 3rd Gen
          </Text>
          <Text style={Styles.Wprice}>Rs.39,500</Text>
          <TouchableOpacity
            style={Styles.Wbuy}
            onPress={() => {
              setIntake("Laptops," + "Asus");
              navigation.navigate("Lists");
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  sm: {
    width: Dimensions.get("window").width,
    //height: Dimensions.get("window").height / 5,
    backgroundColor: "#6c757d",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  sm_Image: {
    margin: 8,
    resizeMode: "contain",
    width: 110,
    height: 110,
  },
  text_Container: {
    display: "flex",
    alignContent: "space-around",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  sm_Btn: {
    textTransform: "capitalize",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    elevation: 3,
  },
  lp: {
    width: Dimensions.get("window").width,
    //height: Dimensions.get("window").height / 5,
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 5,
  },
  lp_text_container: {
    color: "#6c757d",
  },
  lp_Image: {
    resizeMode: "contain",
    width: 130,
    height: 130,
  },
  lp_Btn: {
    display: "flex",
  },
  tb: {
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    alignSelf: "center",
  },
  tb_text_container: {
    backgroundColor: "#dee2e6",
    width: Dimensions.get("window").width,
    textTransform: "capitalize",
  },
  tb_Image: {
    resizeMode: "contain",
    width: 150,
    height: 150,
    marginTop: 18,
    marginBottom: 15,
  },
  tb_btn: {
    backgroundColor: "#dee2e6",
    width: Dimensions.get("window").width / 3,
    textAlign: "center",
    fontWeight: "bold",
    margin: 4,
    padding: 8,
    fontSize: 16,
  },
  wash: {
    width: width - 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "gray",
    shadowOpacity: 0.7,
    elevation: 5,
    marginBottom: 10,
  },
  wheader: {
    position: "relative",
    width: width - 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  WheaderText: {
    position: "relative",
    fontSize: 22,
    fontWeight: "700",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 10,
    paddingTop: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  wimg: {
    marginTop: 15,
    marginBottom: 20,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  viewBtn: {
    width: "30%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.99)",
    borderRadius: 1,
    color: "white",
    marginRight: 5,
  },
  viewTxt: {
    color: "white",
  },
  Wprice: {
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(20,20,20,0.8)",
    margin: 2,
  },
  Wbuy: {
    backgroundColor: "rgba(0,0,0,0.99)",
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 7,
  },
});

export default Widgets;
