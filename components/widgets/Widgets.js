import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

//const navigate = useNavigation();

const Widgets = () => {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <View style={Styles.sm}>
          <View style={Styles.text_Container}>
            <Text style={{ color: "#e9ecef", fontSize: 17 }}>
              Get Brand new Oneplus 9
            </Text>
            <Text style={{ color: "#e9ecef", fontSize: 17, marginBottom: 10 }}>
              At an affordable Pric
            </Text>

            <Button
              title="click here"
              color="#343a40"
              style={Styles.sm_Btn}
              onPress={() => navigation.navigate("mobile")}
            />
          </View>
          <View>
            <Image
              source={require("../images/oneplus-9.png")}
              style={Styles.sm_Image}
            />
          </View>
        </View>
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
        <View style={Styles.tb}>
          <View>
            <TouchableOpacity>
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
                color: "#495057",
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
    height: 50,
    backgroundColor: "yellow",
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
});

export default Widgets;
