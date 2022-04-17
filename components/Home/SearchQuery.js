import React from "react";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  BackHandler,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { IntakeContext } from "../contexts/Intake";
import { MobileContext } from "../contexts/MobileContext";
import { LaptopContext } from "../contexts/LaptopContext";
import { FridgeContext } from "../contexts/FridgeContext";
import { WmacContext } from "../contexts/WmachineContext";
import { TabletContext } from "../contexts/TabletContext";
import { Tvcontext } from "../contexts/TvContext";
import { PathContext } from "../contexts/CheckPath";

const SearchQuery = (props) => {
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  const [intake, setIntake] = useContext(IntakeContext);

  const [keyBoardShown, setKeyBoardShown] = useState();

  const [smData, setSmData] = useContext(MobileContext);

  const [lpData, setLpData] = useContext(LaptopContext);

  const [wdata, setWdata] = useContext(WmacContext);

  const [fridgeData, setFridgeData] = useContext(FridgeContext);

  const [tabletData, setTabletData] = useContext(TabletContext);

  const [tvData, setTvData] = useContext(Tvcontext);

  const [path, setPath] = useContext(PathContext);

  const [search, setSearch] = useState("");

  const [showRecommand, setShowRecommand] = useState(false);

  const [sData, setSdata] = useState([]);

  const [showSM, setShowSM] = useState(false);

  const [foundLP, setFoundLP] = useState();

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

  useLayoutEffect(() => {
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
    let isMounted = true;
    fetch(`http://192.168.43.29:4000/api/main/data/sm`)
      .then((res) => res.json())
      .then((result) => {
        isMounted ? setSdata(result) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/lp`)
      .then((res) => res.json())
      .then((result) => {
        isMounted ? setLdata(result) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/wm`)
      .then((res) => res.json())
      .then((result) => {
        isMounted ? setWmData(result) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/Rf`)
      .then((res) => res.json())
      .then((result) => {
        isMounted ? setRfdata(result) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/Tv`)
      .then((res) => res.json())
      .then((result) => {
        isMounted ? setTvsData(result) : null;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`http://192.168.43.29:4000/api/main/data/Tb`)
      .then((res) => res.json())
      .then((result) => {
        isMounted ? setTbsData(result) : null;
      })
      .catch((err) => {
        console.log(err);
      });

    Keyboard.addListener("keyboardDidShow", () => {
      setKeyBoardShown(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyBoardShown(false);
    });
    BackHandler.addEventListener("hardwareBackPress", () => {
      setIntake(path);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    setSmData([]);
    setLpData([]);
    setFridgeData([]);
    setWdata([]);
    setTvData([]);
    setTabletData([]);
  }, [isFocused]);

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

  return (
    <SafeAreaView
      style={{
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        //backgroundColor: "rgba(255,255,255,1)",
        alignItems: "center",
        backgroundColor:
          keyBoardShown === true ? "rgba(0,0,0,0.66)" : "rgb(255,255,255)",
      }}
    >
      <TextInput
        style={styles.textinputs}
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        placeholderTextColor={"black"}
        autoFocus={true}
        onSubmitEditing={() => SearchThis()}
      />
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 60,
          alignItems: "center",
          justifyContent: "center",
          //display: keyBoardShown === true ? "none" : "flex",
        }}
      >
        <Image
          source={{
            uri: "https://i.ibb.co/x6GfSQp/undraw-the-search-s0xf.png",
          }}
          style={{
            width: 280,
            height: 280,
            resizeMode: "contain",
            display: keyBoardShown === true ? "none" : "flex",
          }}
        />
      </View>
      <View
        style={{
          width: Dimensions.get("window").width,
          height: 100,
          backgroundColor: "rgba(10,10,10,0.02)",
          alignItems: "center",
          //marginTop: -400,
          marginTop: -30,
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
            width: "90%",
            //height: 30,
            //marginTop: -30,
            backgroundColor: "rgb(250,250,250)",
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: "rgba(0,0,0,0.9)",
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
                margin: 3,
                fontSize: 16,
                display: showSM ? "flex" : "none",
                height: showSM ? "auto" : 0,
              }}
            >
              {showSM === true ? search + " in Mobiles" : null}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            accessible={true}
            onPress={() => {
              setIntake("Laptops," + search);
              navigation.navigate("Lists");
            }}
          >
            <Text
              style={{
                margin: 3,
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
                margin: 3,
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
                margin: 3,
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textinputs: {
    width: Dimensions.get("window").width - 10,
    height: 50,
    color: "rgba(20,20,20,0.9)",
    backgroundColor: "rgba(255,255,255,0.95)",
    marginTop: 5,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    fontSize: 15,
    borderColor: "rgba(0,0,0,0.9)",
  },
});

export default SearchQuery;
