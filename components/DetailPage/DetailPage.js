import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  BackHandler,
  ToastAndroid,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { DetailContext } from "../contexts/DetailContext";
import { CartContext } from "../contexts/Getcart";
import { IntakeContext } from "../contexts/Intake";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import ListView from "../ListContainer/ListView";

const Main = () => {
  const navigation = useNavigation();

  const ref = useRef();

  const [selected, setSelected] = useContext(DetailContext);

  const [items, setItems] = useContext(CartContext);

  const [intake, setIntake] = useContext(IntakeContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState(false);

  const [features, setFeatures] = useState([
    "Camera",
    "Processor",
    "Display",
    "Battery",
    "Video",
  ]);

  const [lpFeatures, setLpFeatures] = useState(["Display", "Processor", "RAM"]);

  const Description = [
    "General",
    "Display Features",
    "Os & Processor features",
    "Camera Features",
    "Storage & Battery Details",
    "Connectivity Features",
  ];

  const lpDescription = [
    "General",
    "Display & Audio Features",
    "Processor & Memory Features",
    "Operating System",
    "Port & Slot Features",
    "Connectivity Features",
    "Additional Features",
  ];

  const Lpdisplay = [
    "Screen Size",
    "Resolution",
    "Screen Type",
    "Speakers",
    "Speakers Properties",
    "Microphone",
  ];

  const LPproandMemory = [
    "RAM",
    "RAM Type",
    "Expandable RAM",
    "SSD",
    "SSD Capacity",
    "HDD",
    "HDD Capacity",
    "Processor",
    "Processor Variant",
    "Graphic Processor",
    "No of Cores",
    "Clock Speed",
    "Dedicated Graphic Memory",
    "Dedicated Graphic Memory Capacity",
    "Cache",
  ];

  const LPaddFea = [
    "TouchScreen",
    "Webcam",
    "FingerPrint Sensor",
    "Disk Drive",
    "RGB KeyBoard",
    "KeyBoard Type",
    "Backlit KeyBoard",
  ];

  const LPports = ["USB Port", "HDMI Port", "Multimedia Port"];

  const Lpos = ["Operating System", "Operating System Architecture"];

  const LPconnect = ["Wireless LAN", "Bluetooth", "Ethernet"];

  const GeneralSubheader = [
    "RAM",
    "color",
    "Model No",
    "Model Name",
    "Product Type",
    "Brand",
  ];

  const displaySubHeader = ["Display Size", "Resolution", "Display Type"];

  const osHeader = [
    "Processor",
    "Operating System",
    "Operating System Version",
    "System Operating System",
  ];

  const camHeader = [
    "Primary Camera",
    "Primary Camera Features",
    "Secondary Camera",
    "Secondary Camera Features",
    "Video Resolution",
  ];

  const storageandBattery = [
    "Internal Storage",
    "Expandable Storage",
    "Battery Capacity",
    "Battery Details",
  ];

  const connectivityHeaders = [
    "Network Type",
    "Bluetooth Support",
    "Bluetooth Version",
    "Wifi Support",
    "Wifi Version",
    "Audio Jack Support",
    "Audio Jack",
  ];

  const [detail, setDetail] = useState("Camera");

  const [lpdetail, setLpDetail] = useState("Display");

  const [anotherDetail, setAnotherDetail] = useState("Battery");

  const inputType = String(selected).replace(/[^a-zA-Z ]/g, "");

  //console.log(inputType);

  const inputid = String(selected).replace(/[^0-9]/g, "");

  //console.log(inputid);

  const Addthis = (data) => {
    setItems((prev) => [...prev, data]);
    setText(true);
  };

  useEffect(() => {
    if (inputType === "Mobile") {
      fetch(`http://192.168.43.29:4000/api/main/smartphones/get?id=${inputid}`)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setLoading(false);
          setIntake("mobiles");
          //console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (inputType === "Laptops") {
      fetch(`http://192.168.43.29:4000/api/main/laptops/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          setData(Result);
          setLoading(false);
          setIntake("Laptops");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <View style={styles.overView}>
      {loading === true ? (
        <View style={styles.outerLoading}>
          <View style={styles.isLoading}>
            <Image
              source={{
                uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.gifer.com%2F1fpC.gif&f=1&nofb=1",
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={{ color: "rgb(255,255,255)" }}>Loading...</Text>
          </View>
        </View>
      ) : (
        <ScrollView ref={ref}>
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"rgba(0,0,0,0.92)"} />
            <View style={styles.nav}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  //borderColor: "red",
                  //borderWidth: 1,
                }}
              >
                <MaterialIcon
                  name="arrow-back-ios"
                  color="rgba(0,0,0,0.8)"
                  style={styles.leftIcon}
                  onPress={() => {
                    navigation.navigate("Lists");
                  }}
                />
                <Text style={styles.intakeTexts}>{intake}</Text>
              </View>
              <View style={styles.cartUpdate}>
                <MaterialIcon
                  name="local-mall"
                  color="rgba(0,0,0,0.7)"
                  style={styles.leftIcon}
                />
                <Text
                  style={{
                    backgroundColor: "white",
                    width: 19,
                    textAlign: "center",
                    borderRadius: 50,
                    color: "black",
                    marginLeft: "auto",
                    marginBottom: -5,
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  {items.length}
                </Text>
              </View>
            </View>
            <View
              style={{ backgroundColor: "rgb(255,255,255)", width: "100%" }}
            >
              {data.map((para, index) => {
                return (
                  <View key={index}>
                    <View style={styles.imgContainer}>
                      <Image
                        source={{
                          uri: para.Simg
                            ? para.Simg
                            : para.LPpriimg
                            ? para.LPpriimg
                            : null,
                        }}
                        style={styles.priimg}
                      />
                    </View>
                    <View
                      style={{
                        width: Dimensions.get("window").width / 1.4,
                        height: 1,
                        backgroundColor: "rgba(20,20,20,0.8)",
                        marginLeft: "auto",
                        marginRight: "auto",
                        borderRadius: 35,
                      }}
                    ></View>
                    <View style={styles.DataContainer}>
                      <View style={styles.NameContainer}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginRight: "auto",
                            marginLeft: "auto",
                            //textTransform: "capitalize",
                          }}
                        >
                          {para.Sname
                            ? para.Sname
                            : para.LPname
                            ? para.LPname
                            : null}
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            textAlignVertical: "center",
                            textAlign: "auto",
                            //textTransform: "lowercase",
                            letterSpacing: 0.1,
                            textTransform: "uppercase",
                            marginTop: 3,
                            marginBottom: 5,
                          }}
                        >
                          {para.Sname
                            ? `(${para.Scolor},${para.Sram + "GB"},${
                                para.Sprocessor
                              })`
                            : para.LPname
                            ? `(${para.LPram}GB / ${para.LPos} / ${
                                (para.LPstorage > 0) & (para.LPstorage < 10)
                                  ? para.LPstorage + "TB"
                                  : para.LPstorage + "GB"
                              })`
                            : null}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            backgroundColor: "rgb(8,8,8)",
                            color: "rgb(250,250,250)",
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 12,
                            paddingRight: 12,
                            borderRadius: 35,
                          }}
                        >
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
                            : null}
                        </Text>
                      </View>
                      <View style={styles.modalContainer}>
                        <View style={styles.modalIconContainer}>
                          <MaterialIcon
                            name={
                              para.SpriCamera
                                ? "photo-camera"
                                : para.LPdisplaySize
                                ? "personal-video"
                                : null
                            }
                            color="rgb(50,50,50)"
                            style={styles.modalIcon}
                          />
                          <Text style={styles.icontext}>
                            {para.SpriCamera
                              ? para.SpriCamera
                              : para.LPdisplaySize
                              ? para.LPdisplaySize + " inch"
                              : null}
                          </Text>
                        </View>
                        <View style={styles.modalIconContainer}>
                          <MaterialIcon
                            name="storage"
                            color="rgb(50,50,50)"
                            style={styles.modalIcon}
                          />
                          <Text style={styles.icontext}>
                            {para.Sstorage
                              ? para.Sstorage + "GB"
                              : para.LPstorage
                              ? (para.LPstorage > 0) & (para.LPstorage < 10)
                                ? para.LPstorage + "TB"
                                : para.LPstorage + "GB"
                              : null}
                          </Text>
                        </View>
                        <View style={styles.modalIconContainer}>
                          <MaterialIcon
                            name="memory"
                            color="rgb(50,50,50)"
                            style={styles.modalIcon}
                          />
                          <Text style={styles.icontext}>
                            {para.Sprocessor
                              ? para.Sprocessor
                              : para.LPprocess
                              ? para.LPprocess
                              : null}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                          style={styles.btns}
                          onPress={() => {
                            Addthis();
                            ToastAndroid.showWithGravityAndOffset(
                              "Item added to cart",
                              ToastAndroid.SHORT,
                              ToastAndroid.BOTTOM,
                              25,
                              50
                            );
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "rgb(0,0,0)",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            {text ? "Go to cart" : "Add to cart"}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnsB}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              color: "rgb(255,255,255)",
                            }}
                          >
                            Buy now
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.divider}></View>
                      <View style={styles.Productdesc}>
                        <Text
                          style={{
                            textAlign: "center",
                            textTransform: "uppercase",
                            fontSize: 19,
                            fontWeight: "bold",
                            color: "rgba(0,0,0,0.9)",
                          }}
                        >
                          Details
                        </Text>
                        <View style={styles.minidivider}></View>
                        <View style={styles.headerContainer}>
                          <View style={styles.productheader}>
                            {para.Sname
                              ? features
                                  .map((params, indice) => {
                                    return (
                                      <View key={indice} style={styles.modals}>
                                        <TouchableOpacity
                                          style={{
                                            //width:
                                            //Dimensions.get("window").width / 3.5,
                                            width: "100%",
                                            position: "absolute",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderColor: "rgb(30,30,30)",
                                            padding: 4,
                                            borderRadius: 35,
                                            textAlign: "center",
                                            textAlignVertical: "center",
                                            backgroundColor: "Black",
                                            backgroundColor:
                                              detail === params
                                                ? "white"
                                                : "black",
                                          }}
                                          onPress={() => {
                                            setDetail(params);
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 15,
                                              color:
                                                detail === params
                                                  ? "black"
                                                  : "white",
                                            }}
                                          >
                                            {params}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  })
                                  .slice(0, 3)
                              : null}
                            {para.Sname ? (
                              <View style={styles.modalData}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {detail === "Camera" ? (
                                    <View style={styles.caming}>
                                      <Image
                                        style={{
                                          //minWidth: 180,
                                          //maxWidth: 210,
                                          width: "100%",
                                          //Dimensions.get("window").width / 1.6,
                                          minHeight: 190,
                                          maxHeight: 220,
                                          resizeMode: "contain",
                                        }}
                                        source={{
                                          uri: para.SpriCameraImgs,
                                        }}
                                      />
                                      <Text style={styles.camingtext}>
                                        {para.SpriCamera_fea}
                                      </Text>
                                    </View>
                                  ) : detail === "Processor" ? (
                                    <View style={styles.caming}>
                                      <Image
                                        style={{
                                          //minWidth: 180,
                                          //maxWidth: 210,
                                          width: "100%",
                                          //Dimensions.get("window").width / 1.6,
                                          minHeight: 195,
                                          maxHeight: 220,
                                          resizeMode: "cover",
                                        }}
                                        source={{
                                          uri: para.SpriProcessorImgs,
                                        }}
                                      />
                                      <Text style={styles.camingtext}>
                                        {para.Sprocessor}
                                      </Text>
                                    </View>
                                  ) : detail === "Display" ? (
                                    <View style={styles.caming}>
                                      <Image
                                        style={{
                                          //minWidth: 180,
                                          //maxWidth: 210,
                                          width: "100%",
                                          //Dimensions.get("window").width / 1.6,
                                          minHeight: 220,
                                          maxHeight: 240,
                                          //borderWidth: 1,
                                          //borderColor: "red",
                                          resizeMode: "contain",
                                        }}
                                        source={{
                                          uri: para.SdisplayImgs,
                                        }}
                                      />
                                      <Text style={styles.camingtext}>
                                        {para.S_display_res + "\n"}
                                        {para.S_display_type}
                                      </Text>
                                    </View>
                                  ) : (
                                    "null"
                                  )}
                                </Text>
                              </View>
                            ) : null}
                            {para.Sname
                              ? features
                                  .map((params, indice) => {
                                    return (
                                      <View key={indice} style={styles.modals}>
                                        <TouchableOpacity
                                          style={{
                                            //width:
                                            //Dimensions.get("window").width / 3.5,
                                            width: "100%",
                                            position: "absolute",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderColor: "rgb(30,30,30)",
                                            padding: 4,
                                            borderRadius: 35,
                                            textAlign: "center",
                                            textAlignVertical: "center",
                                            backgroundColor: "Black",
                                            backgroundColor:
                                              anotherDetail === params
                                                ? "white"
                                                : "black",
                                          }}
                                          onPress={() => {
                                            //setDetail(params);
                                            setAnotherDetail(params);
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 15,
                                              color:
                                                anotherDetail === params
                                                  ? "black"
                                                  : "white",
                                            }}
                                          >
                                            {params}
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    );
                                  })
                                  .slice(3, 6)
                              : null}
                            {para.Sname ? (
                              <View style={styles.modalData}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {anotherDetail === "Battery" ? (
                                    <View style={styles.caming}>
                                      {para.Svideo ? (
                                        <Image
                                          style={{
                                            //minWidth: 180,
                                            //maxWidth: 210,
                                            width: "99%",
                                            //Dimensions.get("window").width / 1.6,
                                            minHeight: 190,
                                            maxHeight: 220,
                                            resizeMode: "contain",
                                          }}
                                          source={{
                                            uri: para.Svideo,
                                          }}
                                        />
                                      ) : (
                                        <MaterialIcon
                                          name="battery-charging-full"
                                          color="rgba(0,0,0,0.8)"
                                          style={{ fontSize: 160 }}
                                        />
                                      )}
                                      <Text style={styles.camingtext}>
                                        {para.SBattery + "mAh\n"}
                                        {para.SBattery_info}
                                      </Text>
                                    </View>
                                  ) : anotherDetail === "Video" ? (
                                    <View style={styles.caming}>
                                      {para.SvideoCam ? (
                                        <Image
                                          style={{
                                            //minWidth: 180,
                                            //maxWidth: 210,
                                            width: "100%",
                                            //Dimensions.get("window").width / 1.6,
                                            minHeight: 195,
                                            maxHeight: 220,
                                            resizeMode: "contain",
                                          }}
                                          source={{
                                            uri: para.SvideoCam,
                                          }}
                                        />
                                      ) : (
                                        <MaterialIcon
                                          name="videocam"
                                          color="rgba(0,0,0,0.8)"
                                          style={{ fontSize: 160 }}
                                        />
                                      )}
                                      <Text style={styles.camingtext}>
                                        {para.Svideo_rec}
                                      </Text>
                                    </View>
                                  ) : (
                                    "No Data available"
                                  )}
                                </Text>
                              </View>
                            ) : null}
                            {lpFeatures
                              .map((params, indice) => {
                                return (
                                  <View key={indice} style={styles.modals}>
                                    <TouchableOpacity
                                      style={{
                                        //width:
                                        //Dimensions.get("window").width / 3.5,
                                        width: "100%",
                                        position: "absolute",
                                        alignItems: "center",
                                        borderWidth: 1,
                                        borderColor: "rgb(30,30,30)",
                                        padding: 4,
                                        borderRadius: 35,
                                        textAlign: "center",
                                        textAlignVertical: "center",
                                        backgroundColor: "Black",
                                        backgroundColor:
                                          lpdetail === params
                                            ? "white"
                                            : "black",
                                      }}
                                      onPress={() => {
                                        setLpDetail(params);
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 15,
                                          color:
                                            lpdetail === params
                                              ? "black"
                                              : "white",
                                        }}
                                      >
                                        {params}
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                );
                              })
                              .slice(0, 3)}

                            <View style={styles.modalData}>
                              <Text
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                {lpdetail === "Display" ? (
                                  <View style={styles.caming}>
                                    <Image
                                      style={{
                                        //minWidth: 180,
                                        //maxWidth: 210,
                                        width: "100%",
                                        //Dimensions.get("window").width / 1.6,
                                        minHeight: 190,
                                        maxHeight: 220,
                                        resizeMode: "contain",
                                      }}
                                      source={{
                                        uri: para.LPdisplayImgs,
                                      }}
                                    />
                                    <Text style={styles.camingtext}>
                                      {para.LPdisplaySize +
                                        "inch\n" +
                                        para.LPdisplayType}
                                    </Text>
                                  </View>
                                ) : lpdetail === "Processor" ? (
                                  <View style={styles.caming}>
                                    <Image
                                      style={{
                                        //minWidth: 180,
                                        //maxWidth: 210,
                                        width: "100%",
                                        //Dimensions.get("window").width / 1.6,
                                        minHeight: 195,
                                        maxHeight: 220,
                                        resizeMode: "cover",
                                      }}
                                      source={{
                                        uri: para.LPprocessorImgs,
                                      }}
                                    />
                                    <Text style={styles.camingtext}>
                                      {para.LPprocess}
                                    </Text>
                                  </View>
                                ) : lpdetail === "RAM" ? (
                                  <View style={styles.caming}>
                                    <Image
                                      style={{
                                        //minWidth: 180,
                                        //maxWidth: 210,
                                        width: "100%",
                                        //Dimensions.get("window").width / 1.6,
                                        minHeight: 220,
                                        maxHeight: 240,
                                        //borderWidth: 1,
                                        //borderColor: "red",
                                        resizeMode: "contain",
                                      }}
                                      source={{
                                        uri: para.LPramImgs,
                                      }}
                                    />
                                    <Text style={styles.camingtext}>
                                      {para.LPram +
                                        "GB " +
                                        para.LPramType +
                                        "\nExpandable : " +
                                        para.LPexram +
                                        "GB"}
                                    </Text>
                                  </View>
                                ) : (
                                  "null"
                                )}
                              </Text>
                            </View>
                          </View>
                          {intake === "Laptops" ? (
                            <View
                              style={{
                                width: Dimensions.get("window").width,
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: "rgba(0,0,0,0.90)",
                                  fontSize: 20,
                                  width: "95%",
                                  fontWeight: "600",
                                  display: para.LPHighlightImgs
                                    ? "flex"
                                    : "none",
                                }}
                              >
                                HighLights
                              </Text>
                              {para.LPHighlightImgs ? (
                                <View
                                  style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    marginTop: 7,
                                    marginBottom: 7,
                                  }}
                                >
                                  <Image
                                    source={{ uri: para.LPHighlightImgs }}
                                    style={{
                                      width: "44%",
                                      //width: 140,
                                      height: 100,
                                      resizeMode: "cover",
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: "50%",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "black",
                                        fontSize: 15,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {para.LPHighlightheader1}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.LPHighlighttext1}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                              {para.LPHighlightImgs2 ? (
                                <View
                                  style={{
                                    width: "100%",
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    marginTop: 5,
                                    marginBottom: 7,
                                  }}
                                >
                                  <Image
                                    source={{ uri: para.LPHighlightImgs2 }}
                                    style={{
                                      width: "44%",
                                      //width: 140,
                                      height: 100,
                                      resizeMode: "cover",
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: "50%",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "black",
                                        fontSize: 15,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {para.LPHighlightheader2}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.LPHighlighttexts2}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                              {para.LPHighlightImgs3 ? (
                                <View
                                  style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    marginTop: 5,
                                    marginBottom: 7,
                                  }}
                                >
                                  <Image
                                    source={{ uri: para.LPHighlightImgs3 }}
                                    style={{
                                      width: "44%",
                                      //width: 140,
                                      height: 100,
                                      resizeMode: "cover",
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: "50%",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "black",
                                        fontSize: 15,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {para.LPHighlightheader3}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.LPHighlighttexts3}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                              {para.LPHighlightImgs4 ? (
                                <View
                                  style={{
                                    width: "100%",
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    marginTop: 5,
                                    marginBottom: 7,
                                  }}
                                >
                                  <Image
                                    source={{ uri: para.LPHighlightImgs4 }}
                                    style={{
                                      width: "44%",
                                      //width: 140,
                                      height: 100,
                                      resizeMode: "cover",
                                    }}
                                  />
                                  <View
                                    style={{
                                      width: "50%",
                                      alignItems: "flex-start",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "black",
                                        fontSize: 15,
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {para.LPHighlightheader4}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.LPHighlighttexts4}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          ) : null}
                          <View style={styles.smallDivi}></View>
                          <View style={styles.listContainer}>
                            <Text
                              style={{
                                width: "95%",
                                color: "rgba(0,0,0,0.90)",
                                fontSize: 20,
                                fontWeight: "600",
                              }}
                            >
                              Description
                            </Text>
                            <View
                              style={{
                                width: Dimensions.get("window").width,
                                alignItems: "center",
                              }}
                            >
                              <View
                                style={{
                                  width: Dimensions.get("window").width / 1.15,
                                }}
                              >
                                {intake === "mobiles"
                                  ? Description.map((params, indice) => {
                                      return (
                                        <View
                                          key={indice}
                                          style={styles.dataModal}
                                        >
                                          <Text style={styles.params}>
                                            {params}
                                          </Text>
                                          <View>
                                            {params == "General"
                                              ? GeneralSubheader.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens == "RAM"
                                                            ? para.Sram + "GB"
                                                            : null}
                                                          {gens == "color"
                                                            ? para.Scolor
                                                            : null}
                                                          {gens == "Model No"
                                                            ? para.S_model_no
                                                            : null}
                                                          {gens == "Model Name"
                                                            ? para.Sname
                                                            : null}
                                                          {gens ==
                                                          "Product Type"
                                                            ? para.ProductType
                                                            : null}
                                                          {gens == "Brand"
                                                            ? para.Sbrand
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Display Features"
                                              ? displaySubHeader.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens ==
                                                          "Display Size"
                                                            ? para.S_display_size
                                                            : null}
                                                          {gens == "Resolution"
                                                            ? para.S_display_res
                                                            : null}
                                                          {gens ==
                                                          "Display Type"
                                                            ? para.S_display_type
                                                            : null}
                                                          {gens ==
                                                          "Product Type"
                                                            ? para.ProductType
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Os & Processor features"
                                              ? osHeader.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens == "Processor"
                                                            ? para.Sprocessor
                                                            : null}
                                                          {gens ==
                                                          "Operating System"
                                                            ? para.Sos
                                                            : null}
                                                          {gens ==
                                                          "Operating System Version"
                                                            ? para.Sosver
                                                            : null}
                                                          {gens ==
                                                          "System Operating System"
                                                            ? para.S_system_ui
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Camera Features"
                                              ? camHeader.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens ==
                                                          "Primary Camera"
                                                            ? para.SpriCamera
                                                            : null}
                                                          {gens ==
                                                          "Primary Camera Features"
                                                            ? para.SpriCamera_fea
                                                            : null}
                                                          {gens ==
                                                          "Secondary Camera"
                                                            ? para.SsecCamera
                                                            : null}
                                                          {gens ==
                                                          "Secondary Camera Features"
                                                            ? para.SsecCamera_fea
                                                            : null}
                                                          {gens ==
                                                          "Video Resolution"
                                                            ? para.Svideo_rec
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params ==
                                            "Storage & Battery Details"
                                              ? storageandBattery.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens ==
                                                          "Internal Storage"
                                                            ? para.Sstorage >
                                                              1000
                                                              ? String(
                                                                  para.Sstorage
                                                                ).charAt(0) +
                                                                "TB"
                                                              : para.Sstorage +
                                                                "GB"
                                                            : null}
                                                          {gens ==
                                                          "Expandable Storage"
                                                            ? para.SexpandMemory
                                                              ? para.SexpandMemory >
                                                                1000
                                                                ? String(
                                                                    para.SexpandMemory
                                                                  ).charAt(0) +
                                                                  "TB"
                                                                : para.SexpandMemory +
                                                                  "GB"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Battery Capacity"
                                                            ? para.SBattery +
                                                              "mAh"
                                                            : null}
                                                          {gens ==
                                                          "Battery Details"
                                                            ? para.SBattery_info
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Connectivity Features"
                                              ? connectivityHeaders.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens ==
                                                          "Network Type"
                                                            ? para.S_internet_conn
                                                            : null}
                                                          {gens ==
                                                          "Bluetooth Support"
                                                            ? String(
                                                                para.S_bluetooh
                                                              ).length > 0
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Bluetooth Version"
                                                            ? para.S_bluetooh
                                                            : null}
                                                          {gens ==
                                                          "Wifi Support"
                                                            ? String(
                                                                para.Swifi_ver
                                                              ).length > 1
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Wifi Version"
                                                            ? para.Swifi_ver
                                                            : null}
                                                          {gens ==
                                                          "Audio Jack Support"
                                                            ? /\d/.test(
                                                                para.S_audioJack
                                                              )
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens == "Audio Jack"
                                                            ? para.S_audioJack
                                                              ? para.S_audioJack
                                                              : "NA"
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </View>
                                        </View>
                                      );
                                    })
                                  : null}
                                {intake === "Laptops"
                                  ? lpDescription.map((params, indice) => {
                                      return (
                                        <View
                                          key={indice}
                                          style={styles.dataModal}
                                        >
                                          <Text style={styles.params}>
                                            {params}
                                          </Text>
                                          <View>
                                            {params == "General"
                                              ? GeneralSubheader.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens == "RAM"
                                                            ? para.LPram + "GB"
                                                            : null}
                                                          {gens == "color"
                                                            ? para.LPcolor
                                                            : null}
                                                          {gens == "Model No"
                                                            ? para.LPmodel
                                                            : null}
                                                          {gens == "Model Name"
                                                            ? para.LPname
                                                            : null}
                                                          {gens ==
                                                          "Product Type"
                                                            ? para.ProductType
                                                            : null}
                                                          {gens == "Brand"
                                                            ? para.Sbrand
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params ==
                                            "Display & Audio Features"
                                              ? Lpdisplay.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens == "Screen Size"
                                                            ? para.LPdisplaySize +
                                                              "inch"
                                                            : null}
                                                          {gens == "Resolution"
                                                            ? para.LPdisplayResolution
                                                            : null}
                                                          {gens == "Screen Type"
                                                            ? para.LPdisplayType
                                                            : null}
                                                          {gens == "Speakers"
                                                            ? para.LPspeakers
                                                                .length > 2
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Speakers Properties"
                                                            ? para.LPspeakers
                                                            : null}
                                                          {gens == "Microphone"
                                                            ? para.LPinternalMic
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params ==
                                            "Processor & Memory Features"
                                              ? LPproandMemory.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens == "RAM"
                                                            ? para.LPram + "GB"
                                                            : null}
                                                          {gens == "RAM Type"
                                                            ? para.LPramType
                                                            : null}
                                                          {gens ==
                                                          "Expandable RAM"
                                                            ? para.LPexram +
                                                              "GB"
                                                            : null}
                                                          {gens == "SSD"
                                                            ? para.LP_storage.includes(
                                                                "SSD"
                                                              )
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "SSD Capacity"
                                                            ? para.LP_storage.includes(
                                                                "SSD"
                                                              ) === true
                                                              ? (para.LPstorage >
                                                                  0) &
                                                                (para.LPstorage <
                                                                  10)
                                                                ? para.LPstorage +
                                                                  "TB"
                                                                : para.LPstorage +
                                                                  "GB"
                                                              : "NA"
                                                            : null}
                                                          {gens == "HDD"
                                                            ? para.LP_storage.includes(
                                                                "HDD"
                                                              )
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "HDD Capacity"
                                                            ? para.LP_storage.includes(
                                                                "HDD"
                                                              ) === true
                                                              ? (para.LPstorage >
                                                                  0) &
                                                                (para.LPstorage <
                                                                  10)
                                                                ? para.LPstorage +
                                                                  "TB"
                                                                : para.LPstorage +
                                                                  "GB"
                                                              : "NA"
                                                            : null}
                                                          {gens === "Processor"
                                                            ? para.LPprocess
                                                            : null}
                                                          {gens ===
                                                          "Processor Variant"
                                                            ? para.LPprover
                                                            : null}
                                                          {gens ===
                                                          "Graphic Processor"
                                                            ? para.LPgpro
                                                            : null}
                                                          {gens ===
                                                          "No of Cores"
                                                            ? para.LPnoc
                                                            : null}
                                                          {gens ===
                                                          "Clock Speed"
                                                            ? para.LPprofre
                                                            : null}
                                                          {gens ===
                                                          "Dedicated Graphic Memory"
                                                            ? /\d/.test(
                                                                para.LPGraphicMemory
                                                              ) === false
                                                              ? "NA"
                                                              : "Yes"
                                                            : null}
                                                          {gens ===
                                                          "Dedicated Graphic Memory Capacity"
                                                            ? para.LPGraphicMemory +
                                                              "GB"
                                                            : null}
                                                          {gens === "Cache"
                                                            ? para.LPcache
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Operating System"
                                              ? Lpos.map((gens, subgens) => {
                                                  return (
                                                    <View
                                                      key={subgens}
                                                      style={{
                                                        width: "100%",
                                                        flexDirection: "row",
                                                      }}
                                                    >
                                                      <Text
                                                        style={styles.lines}
                                                      >
                                                        {gens}
                                                      </Text>
                                                      <Text
                                                        style={styles.linesdata}
                                                      >
                                                        {gens ==
                                                        "Operating System"
                                                          ? para.LPosver
                                                          : null}
                                                        {gens ==
                                                        "Operating System Architecture"
                                                          ? para.LPosDesc
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                              : null}
                                            {params == "Port & Slot Features"
                                              ? LPports.map((gens, subgens) => {
                                                  return (
                                                    <View
                                                      key={subgens}
                                                      style={{
                                                        width: "100%",
                                                        flexDirection: "row",
                                                      }}
                                                    >
                                                      <Text
                                                        style={styles.lines}
                                                      >
                                                        {gens}
                                                      </Text>
                                                      <Text
                                                        style={styles.linesdata}
                                                      >
                                                        {gens === "USB Port"
                                                          ? para.LPUSBports
                                                            ? para.LPUSBports
                                                            : "NA"
                                                          : null}
                                                        {gens == "HDMI Port"
                                                          ? para.LPHDMIPort
                                                            ? para.LPHDMIPort
                                                            : "NA"
                                                          : null}
                                                        {gens ==
                                                        "Multimedia Port"
                                                          ? para.LPMultimediaPorts
                                                            ? para.LPMultimediaPorts
                                                            : "NA"
                                                          : null}
                                                        {gens ==
                                                        "Battery Details"
                                                          ? para.SBattery_info
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                              : null}
                                            {params == "Connectivity Features"
                                              ? LPconnect.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens ==
                                                          "Wireless LAN"
                                                            ? para.LPLan
                                                              ? para.LPLan
                                                              : "NA"
                                                            : null}
                                                          {gens == "Bluetooth"
                                                            ? para.LPbluetooth
                                                              ? para.LPbluetooth
                                                              : "NA"
                                                            : null}
                                                          {gens == "Ethernet"
                                                            ? para.LPEthernet
                                                              ? para.LPEthernet
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Wifi Support"
                                                            ? String(
                                                                para.Swifi_ver
                                                              ).length > 1
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Wifi Version"
                                                            ? para.Swifi_ver
                                                            : null}
                                                          {gens ==
                                                          "Audio Jack Support"
                                                            ? /\d/.test(
                                                                para.S_audioJack
                                                              )
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens == "Audio Jack"
                                                            ? para.S_audioJack
                                                              ? para.S_audioJack
                                                              : "NA"
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Additional Features"
                                              ? LPaddFea.map(
                                                  (gens, subgens) => {
                                                    return (
                                                      <View
                                                        key={subgens}
                                                        style={{
                                                          width: "100%",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        <Text
                                                          style={styles.lines}
                                                        >
                                                          {gens}
                                                        </Text>
                                                        <Text
                                                          style={
                                                            styles.linesdata
                                                          }
                                                        >
                                                          {gens == "TouchScreen"
                                                            ? para.LPdistouch
                                                              ? para.LPdistouch
                                                              : "NA"
                                                            : null}
                                                          {gens == "Webcam"
                                                            ? para.LPcamres
                                                              ? para.LPcamres
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "FingerPrint Sensor"
                                                            ? para.LPfingerPrintSensor
                                                              ? para.LPfingerPrintSensor
                                                              : "NA"
                                                            : null}
                                                          {gens == "Disk Drive"
                                                            ? para.LPdiskDrive
                                                              ? para.LPdiskDrive
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "RGB KeyBoard"
                                                            ? String(
                                                                para.LPKeyboardType
                                                              ).includes("RGB")
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "KeyBoard Type"
                                                            ? para.LPKeyboardType
                                                              ? para.LPKeyboardType
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Backlit KeyBoard"
                                                            ? para.LPKeyboardType.includes(
                                                                "Backlit" ||
                                                                  "backlit"
                                                              )
                                                              ? "Yes"
                                                              : "NA"
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                          </View>
                                        </View>
                                      );
                                    })
                                  : null}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.backTop}
                      onPress={() =>
                        ref.current.scrollTo({ x: 0, y: 0, animated: true })
                      }
                    >
                      <MaterialIcon
                        name="arrow-upward"
                        color="red"
                        style={styles.upward}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
              <View
                style={{
                  width: Dimensions.get("window").width,
                  backgroundColor: "rgba(0,0,0,0.85)",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 100,
                }}
              >
                <Text style={{ color: "white" }}>
                  Created By Aditya Dhayfule
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overView: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  outerLoading: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(250,250,250)",
  },
  isLoading: {
    width: 120,
    height: 120,
    backgroundColor: "rgb(10,10,10)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  container: {
    width: Dimensions.get("window").width,
    position: "relative",
  },
  nav: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 65,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(20,20,20,0.6)",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.92)",
  },
  leftIcon: {
    fontSize: 32,
    color: "rgb(255,255,255)",
    marginLeft: "auto",
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    justifyContent: "center",
  },
  intakeTexts: {
    marginLeft: -15,
    padding: 10,
    paddingTop: 0,
    paddingLeft: 0,
    color: "white",
    textTransform: "capitalize",
    fontSize: 16,
    //borderColor: "white",
    //borderWidth: 1,
  },
  cartUpdate: {
    width: 50,
    position: "absolute",
    right: 0,
    top: 0,
    //borderWidth: 1,
    padding: 1,
    flexDirection: "column-reverse",
    justifyContent: "space-around",
    alignItems: "center",
  },
  priimg: {
    width: 255,
    height: 255,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 10,
  },
  imgContainer: {
    width: Dimensions.get("window").width,
    minHeight: 230,
    maxHeight: 285,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "rgb(256,256,256)",
    alignItems: "center",
  },
  DataContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    backgroundColor: "rgb(256,256,256)",
  },
  NameContainer: {
    backgroundColor: "rgb(256,256,256)",
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
    //flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  modalIcon: {
    fontSize: 24,
    //borderWidth: 1,
    //borderRadius: 4,
    color: "rgba(0,0,0,0.7)",
    alignItems: "center",
    margin: 2,
  },
  modalContainer: {
    marginTop: 14,
    marginBottom: 12,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalIconContainer: {
    width: Dimensions.get("window").width / 4.1,
    borderWidth: 1,
    borderColor: "rgba(50,50,50,0.6)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 5,
  },
  icontext: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "rgba(70,70,70,0.80)",
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 4,
    paddingLeft: 2,
    paddingRight: 2,
  },
  ButtonContainer: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  btns: {
    backgroundColor: "rgb(255,255,255)",
    width: Dimensions.get("window").width / 2.2,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 35,
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnsB: {
    backgroundColor: "rgb(0,0,0)",
    width: Dimensions.get("window").width / 2.2,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 35,
    paddingBottom: 10,
    paddingTop: 10,
  },
  divider: {
    width: Dimensions.get("window").width / 2,
    height: 1,
    backgroundColor: "rgba(30,30,30,0.8)",
    marginTop: 18,
    marginBottom: 10,
  },
  minidivider: {
    position: "absolute",
    width: Dimensions.get("window").width / 3,
    //borderWidth: 1,
    //borderColor: "red",
    alignSelf: "center",
    height: 1,
    backgroundColor: "rgba(30,30,30,0.8)",
    top: 40,
    bottom: 40,
    right: "auto",
    left: "auto",
  },
  Productdesc: {
    width: Dimensions.get("window").width,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    position: "relative",
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  productheader: {
    position: "relative",
    width: Dimensions.get("window").width,
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  nameBtn: {
    width: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(30,30,30)",
    padding: 2,
    borderRadius: 35,
    textAlign: "center",
    textAlignVertical: "center",
  },
  modals: {
    width: Dimensions.get("window").width / 3.5,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modalData: {
    width: Dimensions.get("window").width,
    minHeight: 240,
    maxHeight: 320,
    marginBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 5,
    //borderWidth: 1,
    //borderColor: "rgba(50,50,50,0.8)",
    borderRadius: 4,
    textAlign: "center",
  },
  caming: {
    position: "relative",
    width: Dimensions.get("window").width / 1.35,
    //maxWidth: Dimensions.get("window").width / 1.4,
    height: "95%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    textAlign: "center",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 8,
    //borderWidth: 1,
    //borderColor: "red",
  },
  camingtext: {
    //position: "absolute",
    backgroundColor: "rgba(10,10,10,0.95)",
    width: "100%",
    minHeight: 10,
    maxHeight: 90,
    flexWrap: "wrap",
    textAlign: "center",
    color: "rgb(255,255,255)",
    paddingLeft: 3,
    paddingRight: 3,
    //paddingTop: 6,
    paddingTop: 3,
    paddingBottom: 6,
    textAlignVertical: "center",
    borderRadius: 4,
    //textTransform: "capitalize",
  },
  smallDivi: {
    width: Dimensions.get("window").width / 3.5,
    height: 2,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  listContainer: {
    width: Dimensions.get("window").width,
    position: "relative",
    //height: 150,
    alignItems: "center",
  },
  lists: {
    width: Dimensions.get("window").width,
  },
  infoContainer: {
    //position: "relative",
    width: Dimensions.get("window").width,
    //height: Dimensions.get("window").height / 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "space-evenly",
  },
  subhead: {
    width: "70%",
    color: "rgba(0,0,0,0.78)",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  textContainer: {
    //position: "absolute",
    color: "black",
    width: "80%",
    //height: "100%",
    flexDirection: "column",
    borderColor: "red",
    borderWidth: 1,
    alignItems: "center",
    //justifyContent: "space-evenly",
  },
  finalList: {
    width: "100%",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    //justifyContent: "space-evenly",
  },
  texts: {
    textTransform: "capitalize",
    fontSize: 15,
    color: "rgba(0,0,0,0.6)",
    fontWeight: "bold",
    width: "40%",
    textAlign: "left",
    marginLeft: "auto",
    //marginRight: "auto",
  },
  dataTexts: {
    width: "40%",
    textAlign: "left",
    marginRight: "auto",
  },
  dataModal: {
    width: "100%",
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.5)",
  },
  lines: {
    color: "rgba(0,0,0,0.60)",
    fontWeight: "bold",
    width: "50%",
    textTransform: "capitalize",
    marginBottom: 2,
  },
  params: {
    fontSize: 17,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.9)",
    marginTop: 1,
    marginBottom: 4,
  },
  linesdata: {
    width: "50%",
    color: "rgba(0,0,0,0.8)",
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "left",
  },
  backTop: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    borderRadius: 50,
    marginLeft: Dimensions.get("window").width / 1.15,
    marginTop: 5,
    marginBottom: 8,
  },
  upward: {
    fontSize: 28,
    color: "rgb(0,0,0)",
  },
});

export default Main;
