import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { useState, useLayoutEffect, useContext } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ProfileContext } from "../contexts/ProfileContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Record = () => {
  const navigation = useNavigation();

  const [localData, setLocalData] = useState([]);

  const [profile, setProfile] = useContext(ProfileContext);

  const [loading, setLoading] = useState(true);

  const { userName, userAdress, Pnumber } = profile[0];

  useLayoutEffect(() => {
    fetch(`http://192.168.43.29:4000/api/main/orders/records?number=${Pnumber}`)
      .then((res) => res.json())
      .then((Result) => {
        setLoading(false);
        setLocalData(Result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    <View style={styles.loading}>
      <View style={styles.innerLoading}>
        <Image
          source={{
            uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.gifer.com%2F1fpC.gif&f=1&nofb=1",
          }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    </View>;
  }

  return (
    <SafeAreaView style={styles.recordsContainer}>
      <StatusBar backgroundColor={"rgb(255,255,255)"} barStyle="dark-content" />
      <ScrollView>
        <View style={styles.transparentHeader}>
          <MaterialIcon
            name="arrow-back-ios"
            style={styles.backArrow}
            onPress={() => navigation.navigate("Profile")}
          />
          <Text style={styles.recordsHeader}>Records</Text>
          <View style={{ width: "15%" }}></View>
        </View>
        {localData.length === 0 ? (
          <View style={styles.EmptyContainer}>
            <Image
              source={{
                uri: "https://i.ibb.co/6mpL7ft/undraw-void-3ggu.png",
              }}
              style={styles.emptyImg}
            />
            <Text style={styles.emptyText}>Nothing is Here</Text>
          </View>
        ) : null}
        {localData.length > 0 ? (
          <View style={styles.singleRecord}>
            {localData.map((para, index) => {
              return (
                <View
                  style={{
                    width: "90%",
                    height: 140,
                    flexDirection: index % 2 == 0 ? "row" : "row-reverse",
                    borderWidth: 0.7,
                    borderColor: "transparent",
                    shadowColor: "rgba(20,20,20,0.6)",
                    shadowOpacity: 0.7,
                    elevation: 3,
                  }}
                  key={index}
                >
                  <View style={styles.recordData}>
                    <Text style={styles.prName}>
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
                    <Text style={styles.prPrice}>
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
                    <Text style={styles.orStatus}>{para.ordersStatus}</Text>
                  </View>
                  <View style={styles.oriImg}>
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
                      style={styles.primg}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        ) : null}
        <View style={styles.emptyview}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    width: Dimensions.get("window").width,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(250,250,250)",
  },
  innerLoading: {
    width: 120,
    height: 120,
    backgroundColor: "rgb(10,10,10)",
    alignItems: "center",
    justifyContent: "center",
  },

  recordsContainer: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255,255,255)",
  },
  transparentHeader: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderBottomColor: "rgba(20,20,20,0.5)",
    borderBottomWidth: 0.5,
  },
  backArrow: {
    width: "15%",
    fontSize: 30,
    textAlign: "center",
  },
  recordsHeader: {
    width: "70%",
    fontWeight: "700",
    color: "rgb(0,0,0)",
    letterSpacing: 0.1,
    fontSize: 18,
    textAlign: "center",
  },
  singleRecord: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  recordData: {
    width: "55%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingLeft: 10,
  },
  prName: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    width: "90%",
  },
  prPrice: {
    width: "90%",
  },
  orStatus: {
    width: "90%",
    color: "green",
  },
  oriImg: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  primg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  EmptyContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  emptyImg: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    zIndex: 99,
  },
  emptyText: {
    fontWeight: "700",
    color: "rgba(0,0,0,0.7)",
    fontSize: 20,
  },
  emptyview: {
    width: "100%",
    height: 50,
  },
});
export default Record;
