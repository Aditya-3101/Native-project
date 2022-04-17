import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts/Getcart";
import { useNavigation } from "@react-navigation/native";
import { DetailContext } from "../contexts/DetailContext";

const Carts = () => {
  const navigation = useNavigation();

  const [items, setItems] = useContext(CartContext);

  const [selected, setSelected] = useContext(DetailContext);

  const [data, setData] = useState([]);

  //console.log(items.length);
  //console.log(items);

  useEffect(() => {
    // console.log(items);
    items.forEach((element) => {
      element.forEach((params) => {
        setData((prev) => [...prev, params]);
      });
    });
  }, []);

  useEffect(() => {
    //console.log(items);
  }, [items]);

  return (
    <View>
      <StatusBar backgroundColor={"rgba(0,0,0,0.9)"} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialIcon
            name="arrow-back-ios"
            style={styles.backArrow}
            onPress={() => navigation.navigate("Home")}
          />
          <Text style={styles.headerText}>Home</Text>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {data.length == 0 ? (
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
          {data.length !== 0 ? (
            <View style={styles.lists}>
              <Text style={styles.cartsHeader}>Cart</Text>
              {data.map((para, index) => {
                return (
                  <View style={styles.modals} key={index}>
                    <TouchableOpacity
                      style={styles.listModal}
                      onPress={() => {
                        setSelected(para.ProductId + para.ProductType);
                        navigation.navigate("Detail", { paths: "viaCart" });
                      }}
                    >
                      <View style={styles.listsDataContainer}>
                        <Text style={styles.productName}>
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
                        <Text style={styles.productPrice}>
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
                        <Text style={styles.hurry}>Hurry Up!!!</Text>
                      </View>
                      <View style={styles.listimg}>
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
                          style={styles.priimg}
                        />
                      </View>
                    </TouchableOpacity>
                    <View style={styles.btns}>
                      <TouchableOpacity
                        style={styles.priBtns}
                        onPress={() => {
                          setData(
                            data.filter((params) => {
                              return params.ProductId != para.ProductId;
                            })
                          );
                          //code to remove selected items from context usestate array.
                          setItems((prev) =>
                            prev.filter((params, i) => {
                              console.log(i + " i " + "index " + index);
                              if (i === index - 1) {
                                return prev.splice(i, 1);
                              } else {
                                if (i === index) {
                                  return null;
                                } else {
                                  return params;
                                }
                              }
                            })
                          );
                        }}
                      >
                        <MaterialIcon name="delete" style={styles.deleteicon} />
                        <Text style={styles.priBtnText}>Remove</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.secBtns}
                        onPress={() => navigation.navigate("checkout")}
                      >
                        <Text style={styles.secBtnText}>Proceed</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
              <Text style={styles.itemLengths}>
                Total Items in Cart ({items.length})
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default Carts;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    //position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: 60,
    backgroundColor: "rgba(0,0,0,0.9)",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  backArrow: { fontSize: 22, color: "rgba(255,255,255,0.9)" },
  headerText: {
    color: "rgba(255,255,255,0.99)",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  EmptyContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 60,
    backgroundColor: "rgba(255,255,255,1)",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  emptyImg: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  emptyText: {
    fontWeight: "700",
    color: "rgba(0,0,0,0.7)",
    fontSize: 20,
  },
  lists: {
    position: "relative",
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
  },
  cartsHeader: {
    fontSize: 22,
    width: "95%",
    fontWeight: "700",
  },
  modals: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  listModal: {
    width: "90%",
    backgroundColor: "rgba(255,255,255,1)",
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
  },
  listimg: {
    width: "40%",
    //height: 200,
    resizeMode: "contain",
    alignItems: "center",
  },
  btns: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,1)",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 1,
    paddingRight: 4,
  },
  priBtns: {
    width: "50%",
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteicon: {
    fontSize: 24,
    color: "rgba(0,0,0,0.7)",
  },
  secBtns: { width: "50%", backgroundColor: "rgba(0,0,0,1)", borderRadius: 35 },
  priBtnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },
  secBtnText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "700",
    color: "rgba(255,255,255,1)",
    marginTop: 10,
    marginBottom: 10,
  },
  listsDataContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  priimg: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  productName: {
    width: "70%",
    fontSize: 17,
    fontWeight: "bold",
    //borderWidth: 1,
    //borderColor: "black",
    color: "rgba(0,0,0,0.95)",
  },
  productPrice: {
    width: "70%",
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(0,0,0,0.85)",
  },
  hurry: {
    width: "70%",
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(0,0,0,0.70)",
  },
  itemLengths: {
    color: "rgba(0,0,0,0.8)",
    width: "100%",
    textAlign: "center",
    height: 100,
    marginTop: 10,
    marginBottom: 10,
    //textAlignVertical: "center",
  },
});
