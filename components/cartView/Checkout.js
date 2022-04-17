import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Modal,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { CartContext } from "../contexts/Getcart";
import { ProfileContext } from "../contexts/ProfileContext";
import { DetailContext } from "../contexts/DetailContext";
import { createIconSetFromFontello } from "react-native-vector-icons";

const { width, height } = Dimensions.get("window");

const primaryColor = "rgba(0,0,0,0.90)";

const subheader = "rgba(0,0,0,0.68)";

const lightGray = "rgba(20,20,20,0.6)";

const verlightGray = "rgba(20,20,20,0.5)";

const imgsofoptions = [
  {
    type: "COD",
    name: "https://i.ibb.co/LgYYVVY/Screenshot-7-edited.jpg",
  },
  {
    type: "mastercard",
    name: "https://i.ibb.co/M7R894q/u-https-mma-prnewswire-com-media-927696-Mastercard-Logo.jpg",
  },
  {
    type: "visa",
    name: "https://i.ibb.co/wz9hTy5/visa-logo-png-transparent.png",
  },
  {
    type: "e-wallet",
    name: "https://i.ibb.co/gm0c8DX/vecteezy-e-wallet-logo-design-vector-design-template.jpg",
  },
];

const Checkout = () => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [items, setItems] = useContext(CartContext);

  const [profile, setProfile] = useContext(ProfileContext);

  const [selected, setSelected] = useContext(DetailContext);

  const { userName, userAdress, Pnumber } = profile[0];

  const [data, setData] = useState([]);

  const [customAdress, setCustomAdress] = useState(userAdress);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [holderName, setHolderName] = useState(userName);

  const [cardnumber, setCardNumber] = useState();

  const [cardexpiry, setCardExpiry] = useState("");

  const [cardcvv, setCardcvv] = useState();

  const [showindex, setShowindex] = useState();

  const [walletNumber, serWalletNumber] = useState();

  const [totalPrice, setTotalPrice] = useState(0);

  const [border, setBorder] = useState(false);

  const [dataStack, setDataStack] = useState(0);

  const [updateStack, setUpdateStack] = useState(0);

  const [pass, setPass] = useState(false);

  useEffect(() => {
    items.forEach((element) => {
      element.forEach((params) => {
        setData((prev) => [...prev, params]);
      });
    });
  }, []);

  useLayoutEffect(() => {
    setTotalPrice(0);
    setPass(false);
  }, [isFocused]);

  useEffect(() => {
    setDataStack(data.length);
    setUpdateStack(data.length);
    if (dataStack > updateStack) {
      setTotalPrice(0);
      updatePrice();
    } else {
      setTotalPrice(0);
      updatePrice();
    }
  }, [data]);

  const updatePrice = () => {
    data.forEach((element) => {
      setTotalPrice((prev) => prev + Number(element.totPrice));
    });
  };

  const updateNum = (num) => {
    setCardNumber(
      String(num)
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
    );
  };

  const updateDate = (dates) => {
    if (String(dates).indexOf(".") >= 0 || String(dates).length > 5) {
      return;
    }
    if (String(dates).length == 2 && cardexpiry.length == 1) {
      dates += "/";
    }
    setCardExpiry(dates);
  };

  const sendItem = () => {
    //setPass(true);
    if (
      showindex === 2 ||
      showindex === 3 ||
      showindex === 1 ||
      showindex === 0
    ) {
      if (showindex === 1 || showindex === 2) {
        if (
          holderName.length > 4 &&
          cardnumber.length > 9 &&
          cardexpiry.length > 2 &&
          cardcvv.length > 2
        ) {
          data.forEach((element) => {
            fetch(`http://192.168.43.29:4000/api/main/orders/add`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: userName,
                Pnumber: Pnumber,
                productid: element.ProductId,
                producttype: element.ProductType,
                price: element.totPrice,
                trans:
                  showindex === 1
                    ? "mastercard"
                    : showindex === 2
                    ? "visa"
                    : "null",
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                setPass(true);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      } else if (showindex === 3) {
        if (walletNumber.length > 8) {
          data.forEach((element) => {
            fetch(`http://192.168.43.29:4000/api/main/orders/add`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: userName,
                Pnumber: Pnumber,
                productid: element.ProductId,
                producttype: element.ProductType,
                price: element.totPrice,
                trans: "e-wallet",
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                setPass(true);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      } else if (showindex === 0) {
        data.forEach((element) => {
          fetch(`http://192.168.43.29:4000/api/main/orders/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: userName,
              Pnumber: Pnumber,
              productid: element.ProductId,
              producttype: element.ProductType,
              price: element.totPrice,
              trans: "COD",
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setPass(true);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    }
  };

  useEffect(() => {
    if (border === false) {
      setShowindex();
    }
  }, [border]);

  return (
    <SafeAreaView style={styles.Home}>
      <ScrollView>
        <View style={styles.headerWithName}>
          <MaterialIcon name="arrow-back-ios" style={styles.revert} />
          <Text style={styles.headerName}>Payment</Text>
          <View style={styles.nulldiv}></View>
        </View>
        {data.length === 0 ? (
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
        <View style={styles.datas}>
          <View style={styles.allData}>
            <View style={styles.showPrice}>
              <Text style={styles.subtext}>Total</Text>
              <Text style={styles.subPrice}>
                {parseInt(totalPrice)
                  .toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                  .replace(".00", "")}
              </Text>
            </View>
            <View style={styles.getType}>
              <Text style={styles.paymentMethod}>Select payment type</Text>
              <View style={styles.selectType}>
                <ScrollView
                  horizontal={true}
                  //onScroll={changeActivate}
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                >
                  {imgsofoptions.map((img, k) => {
                    return (
                      <View
                        key={k}
                        style={{
                          width: width,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TouchableWithoutFeedback
                          onPress={() => {
                            setShowindex(k);
                            setBorder(!border);
                            setPaymentMethod(img.type);
                          }}
                        >
                          <Image
                            source={{ uri: img.name }}
                            style={{
                              width: 260,
                              height: 135,
                              resizeMode: "contain",
                              marginLeft: "auto",
                              marginRight: "auto",
                              borderWidth:
                                k === showindex ? (border ? 2 : 1) : 1,
                              borderRadius: 15,
                              borderColor:
                                k === showindex
                                  ? border
                                    ? "rgb(35,152,255)"
                                    : "rgba(20,20,20,0.4)"
                                  : "rgba(20,20,20,0.4)",
                              backgroundColor: "rgb(256,256,256)",
                            }}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            {paymentMethod === "mastercard" ? (
              showindex === 1 ? (
                <View style={styles.cardinfo}>
                  <Text style={styles.cardname}>Debit/Credit card info</Text>
                  <View style={styles.carddraw}>
                    <View style={styles.cardholdername}>
                      <Text style={styles.nameOnCard}>Name</Text>
                      <TextInput
                        value={holderName}
                        onChangeText={setHolderName}
                        style={styles.cardholdernameinput}
                      />
                    </View>
                    <View style={styles.cardholdername}>
                      <Text style={styles.nameOnCard}>Card number</Text>
                      <TextInput
                        value={cardnumber}
                        onChangeText={(digit) => updateNum(digit)}
                        style={styles.cardholdernumber}
                        keyboardType="numeric"
                        placeholder="xxxx xxxx xxxx xxxx"
                        placeholderTextColor="gray"
                        maxLength={19}
                      />
                    </View>
                    <View style={styles.cardholdercvv}>
                      <View style={styles.cardexpiry}>
                        <Text style={styles.nameOnCard}>Expiry Date</Text>
                        <TextInput
                          value={cardexpiry}
                          onChangeText={(dates) => updateDate(dates)}
                          style={styles.cardholdernameinput}
                          placeholder="00/00"
                          placeholderTextColor="gray"
                        />
                      </View>
                      <View style={styles.divider}></View>
                      <View style={styles.cardexpiry}>
                        <Text style={styles.nameOnCard}>CVV</Text>
                        <TextInput
                          value={cardcvv}
                          onChangeText={setCardcvv}
                          style={styles.cardholdernameinput}
                          maxLength={4}
                          placeholder="000"
                          placeholderTextColor="gray"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ) : null
            ) : paymentMethod === "visa" ? (
              showindex === 2 ? (
                <View style={styles.cardinfo}>
                  <Text style={styles.cardname}>Debit/Credit card info</Text>
                  <View style={styles.carddraw}>
                    <View style={styles.cardholdername}>
                      <Text style={styles.nameOnCard}>Name</Text>
                      <TextInput
                        value={holderName}
                        onChangeText={setHolderName}
                        style={styles.cardholdernameinput}
                      />
                    </View>
                    <View style={styles.cardholdername}>
                      <Text style={styles.nameOnCard}>Card number</Text>
                      <TextInput
                        value={cardnumber}
                        onChangeText={(digit) => updateNum(digit)}
                        style={styles.cardholdernumber}
                        keyboardType="numeric"
                        placeholder="xxxx xxxx xxxx xxxx"
                        placeholderTextColor="gray"
                        maxLength={19}
                      />
                    </View>
                    <View style={styles.cardholdercvv}>
                      <View style={styles.cardexpiry}>
                        <Text style={styles.nameOnCard}>Expiry Date</Text>
                        <TextInput
                          value={cardexpiry}
                          onChangeText={(dates) => updateDate(dates)}
                          style={styles.cardholdernameinput}
                          placeholder="00/00"
                          placeholderTextColor="gray"
                        />
                      </View>
                      <View style={styles.divider}></View>
                      <View style={styles.cardexpiry}>
                        <Text style={styles.nameOnCard}>CVV</Text>
                        <TextInput
                          value={cardcvv}
                          onChangeText={setCardcvv}
                          style={styles.cardholdernameinput}
                          maxLength={4}
                          placeholder="000"
                          placeholderTextColor="gray"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              ) : null
            ) : paymentMethod === "e-wallet" ? (
              showindex === 3 ? (
                <View style={styles.walletQuery}>
                  <TextInput
                    value={walletNumber}
                    onChangeText={serWalletNumber}
                    keyboardType="number-pad"
                    style={styles.numberinput}
                    placeholder="Enter your number"
                  />
                  <TouchableWithoutFeedback>
                    <Text style={styles.linktxt}>Link</Text>
                  </TouchableWithoutFeedback>
                </View>
              ) : null
            ) : null}
            <View style={styles.orders}>
              <Text style={styles.myorderheader}>My Orders</Text>
              {data.map((para, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      setSelected(para.ProductId + para.ProductType);
                      navigation.navigate("Detail", { paths: "viaCart" });
                    }}
                  >
                    <View style={styles.orderCard}>
                      <View style={styles.orderdata}>
                        <Text style={styles.itemname}>
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
                        <Text style={styles.itemPrice}>
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
                        <Pressable
                          style={({ pressed }) => [
                            {
                              backgroundColor: pressed
                                ? "transparent"
                                : "rgb(255,255,255)",
                            },
                            styles.itemremove,
                          ]}
                          onPress={() => {
                            setUpdateStack(data.length - 1);
                            setData(
                              data.filter((params) => {
                                return params.ProductId != para.ProductId;
                              })
                            );
                            //code to remove selected items from context usestate array.
                            setItems((prev) =>
                              prev.filter((params, i) => {
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
                          {({ pressed }) => (
                            <>
                              <MaterialIcon
                                name="delete"
                                style={[
                                  { color: pressed ? "transparent" : "black" },
                                  styles.itemremoveicon,
                                ]}
                              />
                              <Text
                                style={[
                                  { color: pressed ? "transparent" : "black" },
                                  styles.itemremoveText,
                                ]}
                              >
                                Remove
                              </Text>
                            </>
                          )}
                        </Pressable>
                      </View>
                      <View style={styles.itemimg}>
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
                          style={styles.orderitemimg}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
            <View style={styles.miniProfile}>
              <Text style={styles.profileheader}>Profile</Text>
              <View style={styles.profileDetails}>
                <View style={styles.namefield}>
                  <Text style={styles.nametxt}>Name</Text>
                  <Text style={styles.username}>{userName}</Text>
                </View>
                <View style={styles.namefield}>
                  <Text style={styles.nametxt}>Phone Number</Text>
                  <Text style={styles.username}>{Pnumber}</Text>
                </View>
                <View style={styles.namefield}>
                  <Text style={styles.nametxt}>Address</Text>
                  <TextInput
                    value={customAdress}
                    onChangeText={setCustomAdress}
                    style={styles.username}
                    placeholder="Enter shipping address"
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "transparent" : "rgb(20,20,20)",
                  },
                  styles.paybtn,
                ]}
                onPress={() => sendItem()}
              >
                {({ pressed }) => (
                  <Text
                    style={[
                      {
                        color: pressed ? "rgb(20,20,20)" : "rgb(255,255,255)",
                      },
                      styles.paytxt,
                    ]}
                  >
                    Pay now
                  </Text>
                )}
              </Pressable>
              <View style={styles.assure}>
                <MaterialIcon name="lock" style={styles.locks} />
                <Text style={styles.assuretxt}>100% Secure Payment</Text>
              </View>
            </View>
          </View>
        </View>
        {pass ? (
          <Modal
            visible={pass}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setPass(!pass)}
          >
            <View style={styles.showmodalContainer}>
              <View style={styles.bigInnerModal}>
                <Text style={styles.modalSignUpTxt}>Success</Text>
                <Image
                  source={{
                    uri: "https://i.ibb.co/CKR73QP/undraw-Successful-purchase-re-mpig-edited.jpg",
                  }}
                  style={styles.successImg}
                />
                <Text style={styles.modalmessagetxt}>
                  Yayy!!! Purchase made successfully.
                </Text>
                <Pressable
                  style={styles.modalDismiss}
                  onPress={() => setPass(false)}
                >
                  <Text style={styles.dismisstxt}>Dismiss</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Home: {
    width: width,
    height: height,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  headerWithName: {
    width: width,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
  revert: {
    width: "15%",
    fontSize: 34,
    alignItems: "center",
    textAlign: "center",
    color: primaryColor,
  },
  headerName: {
    width: "70%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  nulldiv: {
    width: "15%",
  },
  datas: {
    width: width,
    flex: 10,
    alignItems: "center",
  },
  allData: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  showPrice: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  subtext: {
    width: "50%",
    fontSize: 16,
    fontWeight: "700",
    color: lightGray,
  },
  subPrice: {
    width: "50%",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 16,
  },
  getType: {
    width: width,
    alignItems: "center",
  },
  paymentMethod: {
    width: "90%",
    fontWeight: "700",
    color: lightGray,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  selectType: {
    width: "100%",
    //height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  typeimg: {
    position: "relative",
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    alignItems: "center",
    textAlign: "left",
  },
  codhead: {
    width: "100%",
    zIndex: 99,
    borderWidth: 1,
    height: 25,
    textAlignVertical: "center",
    borderColor: "yellow",
  },
  codtype: {
    marginTop: -25,
    width: 300,
    height: 100,
    resizeMode: "contain",
  },
  cardinfo: {
    width: "90%",
    alignItems: "center",
  },
  cardname: {
    width: "100%",
    color: lightGray,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },
  carddraw: {
    width: "98%",
    height: 200,
    shadowColor: "gray",
    shadowOpacity: 0.8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
  },
  cardholdername: {
    width: "95%",
    height: "33.33%",
    borderBottomColor: "gray",
    borderBottomWidth: 0.2,
    justifyContent: "center",
  },
  cardholdercvv: {
    width: "95%",
    height: "33.33%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cardholdernameinput: {
    width: "100%",
    fontSize: 14.5,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  cardholdernumber: {
    width: "100%",
    fontSize: 14.5,
    fontWeight: "700",
  },
  cardexpiry: {
    width: "48%",
    height: "100%",
    justifyContent: "space-evenly",
  },
  divider: {
    width: 0.7,
    height: "40%",
    backgroundColor: "rgba(20,20,20,0.5)",
  },
  walletQuery: {
    width: "90%",
    alignItems: "center",
    //justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "rgb(255,255,255)",
    marginTop: 15,
    marginBottom: 15,
  },
  numberinput: {
    width: "70%",
    fontSize: 15.5,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingLeft: 5,
    paddingBottom: 2,
    paddingTop: 2,
    color: "rgb(0,0,0)",
  },
  linktxt: {
    width: "30%",
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "rgb(0,0,0)",
    color: "rgb(255,255,255)",
  },
  nameOnCard: {
    color: verlightGray,
    textTransform: "uppercase",
  },
  orders: {
    width: "90%",
  },
  myorderheader: {
    fontSize: 16,
    color: lightGray,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 8,
  },
  orderCard: {
    width: "100%",
    minHeight: 130,
    maxHeight: 140,
    flexDirection: "row",
    shadowColor: "gray",
    shadowOpacity: 0.9,
    elevation: 7,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
  orderdata: {
    width: "65%",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgb(255,255,255)",
  },
  itemname: {
    width: "80%",
    fontSize: 17,
    marginTop: 5,
    marginBottom: 5,
  },
  itemPrice: {
    width: "80%",
    fontSize: 15,
    fontWeight: "bold",
  },
  itemimg: {
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255,255,255)",
  },
  orderitemimg: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  itemremove: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: verlightGray,
    borderTopWidth: 0.4,
  },
  itemremoveicon: {
    fontSize: 19,
  },
  itemremoveText: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  miniProfile: {
    width: "90%",
    alignItems: "center",
  },
  profileheader: {
    width: "100%",
    fontSize: 16,
    fontWeight: "700",
    color: lightGray,
    marginTop: 10,
    marginBottom: 10,
  },
  profileDetails: {
    width: "100%",
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
    shadowColor: lightGray,
    shadowOpacity: 1,
    elevation: 5,
  },
  namefield: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nametxt: {
    width: "40%",
    marginTop: 8,
    marginBottom: 8,
    fontSize: 15,
    paddingLeft: 4,
    color: verlightGray,
  },
  username: {
    width: "60%",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  paybtn: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  paytxt: {
    fontSize: 22,
    letterSpacing: 0.2,
    marginTop: 5,
    marginBottom: 5,
  },
  assure: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  locks: {
    color: "rgb(145, 201, 137)",
    fontSize: 20,
  },
  assuretxt: {
    fontSize: 15,
    color: "rgb(40,40,40)",
  },
  showmodalContainer: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  bigInnerModal: {
    width: width / 1.3,
    height: 290,
    //borderRadius: 5,
    alignItems: "center",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 5,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  modalSignUpTxt: {
    position: "relative",
    width: "95%",
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(0,0,0,0.98)",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingTop: 3,
    paddingBottom: 3,
  },
  modalmessagetxt: {
    fontSize: 16,
  },
  modalDismiss: {
    width: "90%",
    alignItems: "center",
    borderTopColor: "gray",
    borderTopWidth: 1,
  },
  dismisstxt: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "rgb(35,152,255)",
  },
  successImg: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
});

export default Checkout;
