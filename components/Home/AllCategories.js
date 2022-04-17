import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { IntakeContext } from "../contexts/Intake";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { MobileContext } from "../contexts/MobileContext";
import { LaptopContext } from "../contexts/LaptopContext";
import { WmacContext } from "../contexts/WmachineContext";
import { FridgeContext } from "../contexts/FridgeContext";
import { Tvcontext } from "../contexts/TvContext";
import { TabletContext } from "../contexts/TabletContext";

const All = () => {
  const { width, height } = Dimensions.get("window");

  const [smData, setSmData] = useContext(MobileContext);

  const [lpData, setLpData] = useContext(LaptopContext);

  const [wdata, setWdata] = useContext(WmacContext);

  const [fridgeData, setFridgeData] = useContext(FridgeContext);

  const [tvData, setTvData] = useContext(Tvcontext);

  const [tabletData, setTabletData] = useContext(TabletContext);

  const isFocused = useIsFocused();

  const Navigation = useNavigation();

  const [intake, setIntake] = useContext(IntakeContext);

  const imgsWithText = [
    {
      img: "https://bit.ly/3NAV1mh",
      text: "Mobiles",
    },
    {
      img: "https://bit.ly/3JTLDb7",
      text: "Laptops",
    },
    {
      img: "https://bit.ly/3NDT7RV",
      text: "Washing Machines",
    },
    {
      img: "https://i.ibb.co/5hQp1pB/rr20t172ys8-hl-3-samsung-original-imafnxmbz4zhp6ah.jpg",
      text: "Refrigerators",
    },
    {
      img: "https://i.ibb.co/tPn9cty/sony-kd-55x9300d-original-imaemzh7y27athw3.jpg",
      text: "Televisions",
    },
    {
      img: "https://i.ibb.co/zJvXDTp/mk7m3hn-a-apple-original-imag6ygf8zsvzpdg.jpg",
      text: "Tablets",
    },
  ];

  const navigateTo = (name) => {
    if (name === "Mobiles") {
      setIntake("mobiles");
      Navigation.navigate("Lists");
    } else if (name === "Laptops") {
      setIntake("Laptops");
      Navigation.navigate("Lists");
    } else if (name === "Washing Machines") {
      setIntake("Wmachine");
      Navigation.navigate("Lists");
    } else if (name === "Refrigerators") {
      setIntake("Fridge");
      Navigation.navigate("Lists");
    } else if (name === "Televisions") {
      setIntake("Tvs");
      Navigation.navigate("Lists");
    } else if (name === "Tablets") {
      setIntake("Tablets");
      Navigation.navigate("Lists");
    }
  };

  useEffect(() => {
    setSmData([]);
    setLpData([]);
    setWdata([]);
    setFridgeData([]);
    setTvData([]);
    setTabletData([]);
  }, [isFocused]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.backBar}>
          <MaterialIcon
            name="arrow-back-ios"
            style={styles.icons}
            onPress={() => Navigation.navigate("Home")}
          />
          <Text style={styles.homeTxt}>Home</Text>
        </View>
        <View style={styles.AllBlock}>
          {imgsWithText.map((data, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigateTo(data.text)}
              >
                <View key={index} style={styles.innerCard}>
                  <Image source={{ uri: data.img }} style={styles.cardImg} />
                  <Text style={styles.dataText}>{data.text}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backBar: {
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(255,255,255,0.99)",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  icons: { color: "rgba(0,0,0,0.9)", fontSize: 34, marginLeft: 7 },
  homeTxt: {
    fontSize: 19,
    fontWeight: "500",
    marginLeft: -7,
  },
  AllBlock: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 60,
    backgroundColor: "rgba(255,255,255,0.99)",
    flexDirection: "row",
    flexWrap: "wrap",
    //alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  innerCard: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(52,52,52,0.01)",
    justifyContent: "center",
    textAlign: "center",
    shadowColor: "gray",
    shadowOpacity: 0.8,
    elevation: 7,
  },
  cardImg: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  dataText: {
    fontSize: 15,
    fontWeight: "700",
  },
});

export default All;
