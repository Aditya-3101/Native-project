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
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { DetailContext } from "../contexts/DetailContext";
import { CartContext } from "../contexts/Getcart";
import { IntakeContext } from "../contexts/Intake";
import {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { useNavigation } from "@react-navigation/native";
import ListView from "../ListContainer/ListView";

const Main = (props) => {
  const navigation = useNavigation();

  const ref = useRef();

  const [selected, setSelected] = useContext(DetailContext);

  const [fullSizeImg, setFullSizeImg] = useState(false);

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

  const [tbFeatures, setTbFeatures] = useState([
    "Display",
    "Camera",
    "Processor",
  ]);

  const Description = [
    "General",
    "Display Features",
    "Os & Processor Features",
    "Camera Features",
    "Storage & Battery Details",
    "Connectivity Features",
  ];

  const tbDescription = [
    "General",
    "Display Features",
    "Camera Details",
    "Os & Processor Features",
    "Storage & Battery Details",
    "Extra Details",
  ];

  const tbGeneral = [
    "Name",
    "Brand",
    "RAM",
    "Storage",
    "Color",
    "Wifi Only?",
    "Wifi+4G",
    "Screen Size",
    "Product Type",
  ];

  const tbDisplayFeatures = ["Display Size", "Display Type", "Resolution"];

  const tbCameraFeatures = [
    "Rear Camera",
    "Front Camera",
    "Primary Camera Features",
    "Video Recording Features",
  ];

  const tbOsFea = ["Operating System", "Processor", "Operating System Version"];

  const tbStorageFea = [
    "Internal Storage",
    "Expandable Storage",
    "Battery Capacity",
  ];

  const tbExtra = [
    "Wifi Version",
    "Bluetooth Version",
    "USB Compability",
    "Supported Video Formats",
    "Supported Audio Formats",
    "Supported Networks",
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

  const wDescription = ["General", "Convenience Features", "Dimensions"];

  const RfDescription = [
    "General",
    "Compartment Features",
    "Power Features",
    "Dimensions",
  ];

  const TvDescription = [
    "General",
    "Video Features",
    "Audio Features",
    "Extra Features",
    "Connectivity Features",
    "Dimensions",
  ];

  const RfGeneral = [
    "Brand",
    "Name",
    "Color",
    "Defrosting Type",
    "Compressor Type",
    "Capacity",
  ];

  const TvGeneral = ["Brand", "Name", "Model", "Color", "Display Type"];

  const TvVideoFea = [
    "Display Size",
    "Display Type",
    "Display Resolution",
    "Refresh Rate",
    "Aspect Ratio",
    "Supported Video Formats",
  ];

  const TvaudioFea = ["No of Speakers", "Speaker Output"];

  const TvextraFea = [
    "Processor",
    "RAM",
    "Operating System",
    "Supported Applications",
  ];

  const Tvcon = ["HDMI Ports", "USB Ports"];

  const Tvdim = ["Screen Size", "Weight"];

  const Rfcomp = [
    "No of Doors",
    "No of Shelves",
    "Is Eggtray Available?",
    "Is Interior Lighting Available?",
  ];

  const Rfenergy = ["Energy Rating", "Stabilizer Required"];

  const RfDimensions = ["Width", "Height", "Weight"];

  const wGeneral = [
    "Brand",
    "Name",
    "Functionality",
    "Energy Rating",
    "Washing Capacity",
    "Maximum Spin Speed",
    "Color",
    "In-built Heater",
  ];

  const wConvenience = ["Digital Display"];

  const wDimensions = ["Width", "Height", "Weight"];

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
    "System User Interface",
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

  const [tbdetail, setTbdetail] = useState("Display");

  const [anotherDetail, setAnotherDetail] = useState("Battery");

  const [allPhotos, setAllPhotos] = useState([]);

  const [photosLinks, setPhotosLinks] = useState([]);

  const [active, setActive] = useState(0);

  const inputType = String(selected).replace(/[^a-zA-Z ]/g, "");

  const [checkPath, setCheckPath] = useState();

  const inputid = String(selected).replace(/[^0-9]/g, "");

  useEffect(() => {
    if (props.route.params.paths == "viaCart") {
      setText(true);
    } else if (props.route.params.paths == "normal") {
      setText(false);
    }
  }, [props.route.params.paths]);

  useEffect(() => {
    if (items.length == 0) {
      setText(false); //to invert the state of text when length of items is zero
    }
  }, [items]);

  useEffect(() => {
    allPhotos.map((img) => {
      //setPhotosLinks(img.SmPhotos);
      setPhotosLinks(String(img.SmPhotos).split("|||"));
    });
  }, [allPhotos]);

  useLayoutEffect(() => {
    let isMounted = true;
    if (inputType === "Mobile") {
      fetch(`http://192.168.43.29:4000/api/main/smartphones/get?id=${inputid}`)
        .then((res) => res.json())
        .then((result) => {
          isMounted ? setData(result) : null;
          setLoading(false);
          setIntake("mobiles");
        })
        .catch((error) => {
          console.log(error);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Laptops") {
      fetch(`http://192.168.43.29:4000/api/main/laptops/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Laptops");
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/laptops/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Refrigerator") {
      fetch(
        `http://192.168.43.29:4000/api/main/Refrigerators/get?id=${inputid}`
      )
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Refrigerator");
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/Refrigerators/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Tv") {
      fetch(`http://192.168.43.29:4000/api/main/televisions/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Tv");
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/televisions/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Tablet") {
      fetch(`http://192.168.43.29:4000/api/main/tablets/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Tablets");
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/tablets/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useLayoutEffect(() => {
    let isMounted = true;
    if (inputType === "Mobile") {
      fetch(`http://192.168.43.29:4000/api/main/smartphones/get?id=${inputid}`)
        .then((res) => res.json())
        .then((result) => {
          isMounted ? setData(result) : null;
          setLoading(false);
          setIntake("mobiles");
        })
        .catch((error) => {
          console.log(error);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Laptops") {
      fetch(`http://192.168.43.29:4000/api/main/laptops/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Laptops");
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(
        `http://192.168.43.29:4000/api/main/laptops/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Washing Machine") {
      fetch(`http://192.168.43.29:4000/api/main/wmachines/get?id=${inputid}`)
        .then((res) => res.json())
        .then((result) => {
          isMounted ? setData(result) : null;
          setLoading(false);
          setIntake("Wmachine");
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(
        `http://192.168.43.29:4000/api/main/wmachines/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Refrigerators") {
      fetch(
        `http://192.168.43.29:4000/api/main/Refrigerators/get?id=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          isMounted ? setData(result) : null;
          setLoading(false);
          setIntake("Refrigerator");
        })
        .catch((err) => {
          console.log(err);
        });

      fetch(
        `http://192.168.43.29:4000/api/main/Refrigerators/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Tv") {
      fetch(`http://192.168.43.29:4000/api/main/televisions/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Tv");
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/televisions/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (inputType === "Tablet") {
      fetch(`http://192.168.43.29:4000/api/main/tablets/get?id=${inputid}`)
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setData(Result) : null;
          setLoading(false);
          setIntake("Tablets");
        })
        .catch((err) => {
          console.log(err);
        });
      fetch(
        `http://192.168.43.29:4000/api/main/tablets/allPhotos?get=${inputid}`
      )
        .then((res) => res.json())
        .then((result) => {
          setAllPhotos(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [selected]);

  const Addthis = () => {
    setItems((prev) => [...prev, data]);
    setText(true);
  };

  const changeActivate = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

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
        <ScrollView
          ref={ref}
          scrollEnabled={fullSizeImg === true ? false : true}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"rgba(0,0,0,0.92)"} hidden={true} />
            <View style={styles.nav}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
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
                  onPress={() => navigation.navigate("carts")}
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
                    <View
                      style={{
                        width: Dimensions.get("window").width,
                        minHeight:
                          fullSizeImg == true
                            ? Dimensions.get("window").height - 65
                            : 255,
                        maxHeight:
                          fullSizeImg == true
                            ? Dimensions.get("window").height - 65
                            : 320,
                        paddingTop: 5,
                        paddingBottom: 5,
                        backgroundColor: "rgb(256,256,256)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ScrollView
                        horizontal={true}
                        onScroll={changeActivate}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                      >
                        {photosLinks.map((photo, k) => {
                          return (
                            <View
                              key={k}
                              style={{
                                width: Dimensions.get("window").width,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <TouchableWithoutFeedback
                                onPress={() => setFullSizeImg(!fullSizeImg)}
                              >
                                <Image
                                  source={{ uri: photo }}
                                  style={{
                                    width: fullSizeImg == true ? 350 : 255,
                                    height: fullSizeImg == true ? 350 : 255,
                                    resizeMode: "contain",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: 10,
                                    marginBottom: 10,
                                  }}
                                />
                              </TouchableWithoutFeedback>
                            </View>
                          );
                        })}
                      </ScrollView>
                      <View style={{ flexDirection: "row" }}>
                        {photosLinks.map((count, k) => {
                          return (
                            <View
                              key={k}
                              style={{
                                width: 30,
                                height: 2,
                                marginTop: 9,
                                marginBottom: 5,
                                backgroundColor:
                                  k === active
                                    ? "rgba(0,0,0,0.95)"
                                    : "rgba(0,0,0,0.15)",
                              }}
                            ></View>
                          );
                        })}
                      </View>
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
                            : para.Wname
                            ? `(${para.Wcolor}/${para.WRPM}RPM)`
                            : para.RfName
                            ? `(${para.Rfcolor}/${para.Rfcool}/${
                                para.Rfstorage + "L"
                              })`
                            : para.Tvname
                            ? `(${para.Tvcolor}/${para.TvdisplayType}/${
                                para.TvdisplaySize + "Inch"
                              })`
                            : para.Tbname
                            ? `(${para.Tbcolor}/${para.Tbstorage + "GB"}/${
                                para.TbdisplaySize + "inch"
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
                      </View>
                      <View style={styles.modalContainer}>
                        <View style={styles.modalIconContainer}>
                          <MaterialIcon
                            name={
                              para.SpriCamera
                                ? "photo-camera"
                                : para.LPdisplaySize
                                ? "personal-video"
                                : para.WRPM
                                ? "speed"
                                : para.Rfstorage
                                ? "storage"
                                : para.TvdisplayRes
                                ? "aspect-ratio"
                                : para.TbdisplayRes
                                ? "aspect-ratio"
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
                              : para.WRPM
                              ? para.WRPM + "RPM"
                              : para.Rfstorage
                              ? para.Rfstorage + "L"
                              : para.TvdisplayRes
                              ? para.TvdisplayRes
                              : para.TbdisplayRes
                              ? para.TbdisplayRes + "P"
                              : null}
                          </Text>
                        </View>
                        <View style={styles.modalIconContainer}>
                          <MaterialIcon
                            name={
                              para.Sstorage
                                ? "storage"
                                : para.LPstorage
                                ? "storage"
                                : para.WmRatings
                                ? "bolt"
                                : para.RfenergyStar
                                ? "bolt"
                                : para.TvdisplayType
                                ? "hd"
                                : para.Tbstorage
                                ? "storage"
                                : null
                            }
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
                              : para.WmRatings
                              ? para.WmRatings + " Energy Rating"
                              : para.RfenergyStar
                              ? para.RfenergyStar + " Energy Rating"
                              : para.TvdisplayType
                              ? para.TvdisplayType
                              : para.Tbstorage
                              ? para.Tbstorage + "GB"
                              : null}
                          </Text>
                        </View>
                        <View style={styles.modalIconContainer}>
                          <MaterialIcon
                            name={
                              para.Sprocessor
                                ? "memory"
                                : para.LPprocess
                                ? "memory"
                                : para.Wmtype
                                ? "functions"
                                : para.Rfcool
                                ? "ac-unit"
                                : para.Tvusb
                                ? "usb"
                                : para.TbProcessor
                                ? "memory"
                                : null
                            }
                            color="rgb(50,50,50)"
                            style={styles.modalIcon}
                          />
                          <Text style={styles.icontext}>
                            {para.Sprocessor
                              ? para.Sprocessor
                              : para.LPprocess
                              ? para.LPprocess
                              : para.Wmtype
                              ? para.Wmtype
                              : para.Rfcool
                              ? para.Rfcool
                              : para.Tvusb
                              ? para.Tvusb + " x USB"
                              : para.TbProcessor
                              ? para.TbProcessor
                              : null}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                          style={styles.btns}
                          onPress={() => {
                            if (text === false) {
                              Addthis();
                              ToastAndroid.showWithGravityAndOffset(
                                "Item added to cart",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                              );
                            } else {
                              navigation.navigate("carts");
                            }
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
                        <TouchableOpacity
                          style={styles.btnsB}
                          onPress={() => {
                            Addthis();
                            navigation.navigate("checkout");
                          }}
                        >
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
                            display: para.Wname
                              ? "none"
                              : para.RfName
                              ? "none"
                              : "flex",
                          }}
                        >
                          Details
                        </Text>
                        <View
                          style={{
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
                            display: para.Wname
                              ? "none"
                              : para.RfName
                              ? "none"
                              : "flex",
                          }}
                        ></View>
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
                                    "null"
                                  )}
                                </Text>
                              </View>
                            ) : null}
                            {para.LPname
                              ? lpFeatures
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
                                  .slice(0, 3)
                              : null}

                            {para.LPname ? (
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
                            ) : null}
                            {para.Tbname
                              ? tbFeatures
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
                                              tbdetail === params
                                                ? "white"
                                                : "black",
                                          }}
                                          onPress={() => {
                                            setTbdetail(params);
                                          }}
                                        >
                                          <Text
                                            style={{
                                              fontSize: 15,
                                              color:
                                                tbdetail === params
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

                            {para.Tbname ? (
                              <View style={styles.modalData}>
                                <Text
                                  style={{
                                    textAlign: "center",
                                  }}
                                >
                                  {tbdetail === "Display" ? (
                                    <View style={styles.caming}>
                                      {para.TbDisimg ? (
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
                                            uri: para.TbDisimg,
                                          }}
                                        />
                                      ) : (
                                        <MaterialIcon
                                          name="fit-screen"
                                          color="rgba(0,0,0,0.8)"
                                          style={{ fontSize: 160 }}
                                        />
                                      )}
                                      <Text style={styles.camingtext}>
                                        {para.TbdisplaySize + "inch\n"}
                                        {para.TbdisplayRes + "P"}
                                      </Text>
                                    </View>
                                  ) : tbdetail === "Processor" ? (
                                    <View style={styles.caming}>
                                      {para.Tbprocimg ? (
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
                                            uri: para.Tbprocimg,
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
                                        {para.TbProcessor}
                                      </Text>
                                    </View>
                                  ) : tbdetail === "Camera" ? (
                                    <View style={styles.caming}>
                                      {para.Tbcamimg ? (
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
                                            uri: para.Tbcamimg,
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
                                        {para.TbpriCam + "MP/"}
                                        {para.TbsecCam
                                          ? para.TbsecCam + "MP\n"
                                          : null}
                                        {para.TbpriCamFea
                                          ? para.TbpriCamFea
                                          : null}
                                      </Text>
                                    </View>
                                  ) : (
                                    "No Data available"
                                  )}
                                </Text>
                              </View>
                            ) : null}
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
                                    : para.FirstTvcardImge
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
                              {para.FirstTvcardImge ? (
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
                                    source={{ uri: para.FirstTvcardImage }}
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
                                      {para.FirstTvcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.FirstTvcardtext}
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
                              {para.SeconfTvcardImage ? (
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
                                    source={{ uri: para.SeconfTvcardImage }}
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
                                      {para.SeconfTvcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.SeconfTvcardtext}
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
                              {para.ThirdTvcardImage ? (
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
                                    source={{ uri: para.ThirdTvcardImage }}
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
                                      {para.ThirdTvcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.ThirdTvcardtext}
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
                              {para.FourthTvcardImage ? (
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
                                    source={{ uri: para.FourthTvcardImage }}
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
                                      {para.FourthTvcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.FourthTvcardtext}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          ) : null}
                          {intake === "Tv" ? (
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
                                  display: para.FirstTVcardImge
                                    ? "flex"
                                    : "none",
                                }}
                              >
                                HighLights
                              </Text>
                              {para.FirstTVcardImge ? (
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
                                    source={{ uri: para.FirstTVcardImge }}
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
                                      {para.FirstTVcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.FirstTVcardText}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                              {para.SecondTVcardImage ? (
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
                                    source={{ uri: para.SecondTVcardImage }}
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
                                      {para.SeconfTVcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.SecondTVcardText}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                              {para.ThirdTVcardImage ? (
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
                                    source={{ uri: para.ThirdTVcardImage }}
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
                                      {para.ThirdTVcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.ThirdTVcardText}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                              {para.FourthTVcardImage ? (
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
                                    source={{ uri: para.FourthTVcardImage }}
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
                                      {para.FourthTVcardheader}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 11.8,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        color: "rgba(0,0,0,0.89)",
                                      }}
                                    >
                                      {para.FourthTVcardText}
                                    </Text>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          ) : null}
                          <View
                            style={{
                              width: Dimensions.get("window").width / 3.5,
                              height: 2,
                              marginTop: 5,
                              marginBottom: 15,
                              backgroundColor: "rgba(0,0,0,0.8)",
                              display: para.Wname ? "none" : "flex",
                            }}
                          ></View>
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
                                            {params == "Os & Processor Features"
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
                                                          "System User Interface"
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
                                                            ? para.LPspeakers !==
                                                              undefined
                                                              ? para.LPspeakers
                                                                  .length > 2
                                                                ? "Yes"
                                                                : "NA"
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
                                                            ? para.LP_storage !==
                                                              undefined
                                                              ? para.LP_storage.includes(
                                                                  "SSD"
                                                                )
                                                                ? "Yes"
                                                                : "NA"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "SSD Capacity"
                                                            ? para.LP_storage !==
                                                              undefined
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
                                                              : "NA"
                                                            : null}
                                                          {gens == "HDD"
                                                            ? para.LP_storage !==
                                                              undefined
                                                              ? para.LP_storage.includes(
                                                                  "HDD"
                                                                )
                                                                ? "Yes"
                                                                : "NA"
                                                              : null
                                                            : null}
                                                          {gens ==
                                                          "HDD Capacity"
                                                            ? para.LP_storage !==
                                                              undefined
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
                                                              : null
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
                                                            ? para.LPKeyboardType !==
                                                              undefined
                                                              ? para.LPKeyboardType.includes(
                                                                  "Backlit" ||
                                                                    "backlit"
                                                                )
                                                                ? "Yes"
                                                                : "NA"
                                                              : null
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
                                {intake === "Wmachine"
                                  ? wDescription.map((params, indice) => {
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
                                              ? wGeneral.map(
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
                                                          {gens == "Brand"
                                                            ? para.Sbrand
                                                            : null}
                                                          {gens == "Name"
                                                            ? para.Wname
                                                            : null}
                                                          {gens ==
                                                          "Functionality"
                                                            ? para.Wmtype
                                                            : null}
                                                          {gens ==
                                                          "Energy Rating"
                                                            ? para.WmRatings +
                                                              "/5"
                                                            : null}
                                                          {gens ==
                                                          "Washing Capacity"
                                                            ? para.WavgCapacity +
                                                              "Kg"
                                                            : null}
                                                          {gens ==
                                                          "Maximum Spin Speed"
                                                            ? para.WRPM + "RPM"
                                                            : null}
                                                          {gens == "Color"
                                                            ? para.Wcolor
                                                            : null}
                                                          {gens ===
                                                          "In-built Heater"
                                                            ? para.Wheat
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Convenience Features"
                                              ? wConvenience.map(
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
                                                          {gens ===
                                                          "Digital Display"
                                                            ? para.Wdigi
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Dimensions"
                                              ? wDimensions.map(
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
                                                          {gens == "Width"
                                                            ? para.Wwidth + "cm"
                                                            : null}
                                                          {gens == "Height"
                                                            ? para.Wheight +
                                                              "cm"
                                                            : null}
                                                          {gens == "Weight"
                                                            ? para.Wweight +
                                                              "Kg"
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
                                {intake === "Refrigerator"
                                  ? RfDescription.map((params, indice) => {
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
                                              ? RfGeneral.map(
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
                                                          {gens == "Brand"
                                                            ? para.Sbrand
                                                            : null}
                                                          {gens == "Name"
                                                            ? para.RfName
                                                            : null}
                                                          {gens == "Color"
                                                            ? para.Rfcolor
                                                            : null}
                                                          {gens ==
                                                          "Defrosting Type"
                                                            ? para.Rfcool
                                                            : null}
                                                          {gens == "Capacity"
                                                            ? para.Rfstorage +
                                                              "L"
                                                            : null}
                                                          {gens ==
                                                          "Compressor Type"
                                                            ? para.Rfcomp
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Compartment Features"
                                              ? Rfcomp.map((gens, subgens) => {
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
                                                        {gens === "No of Doors"
                                                          ? para.Rfdoor
                                                          : null}
                                                        {gens ===
                                                        "No of Shelves"
                                                          ? para.RfnoOfShelves
                                                          : null}
                                                        {gens ===
                                                        "Is Eggtray Available?"
                                                          ? para.Rfavailtray
                                                          : null}
                                                        {gens ===
                                                        "Is Interior Lighting Available?"
                                                          ? para.RfinteriorLightings
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                              : null}
                                            {params == "Power Features"
                                              ? Rfenergy.map(
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
                                                          "Energy Rating"
                                                            ? para.RfenergyStar
                                                            : null}
                                                          {gens ==
                                                          "Stabilizer Required"
                                                            ? para.Rfstab
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Dimensions"
                                              ? RfDimensions.map(
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
                                                          {gens == "Width"
                                                            ? para.Rfwidth +
                                                              "cm"
                                                            : null}
                                                          {gens == "Height"
                                                            ? para.Rfheight +
                                                              "cm"
                                                            : null}
                                                          {gens == "Weight"
                                                            ? para.Rfweight +
                                                              "Kg"
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
                                {intake === "Tv"
                                  ? TvDescription.map((params, indice) => {
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
                                              ? TvGeneral.map(
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
                                                          {gens == "Brand"
                                                            ? para.Sbrand
                                                            : null}
                                                          {gens == "Name"
                                                            ? para.Tvname
                                                            : null}
                                                          {gens == "Color"
                                                            ? para.Tvcolor
                                                            : null}
                                                          {gens == "Model"
                                                            ? para.TvModel
                                                            : null}
                                                          {gens ==
                                                          "Display Type"
                                                            ? para.TvdisplayType
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Video Features"
                                              ? TvVideoFea.map(
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
                                                          {gens ===
                                                          "Display Size"
                                                            ? para.TvdisplaySize +
                                                              "Inch"
                                                            : null}
                                                          {gens ===
                                                          "Display Type"
                                                            ? para.TvdisplayType
                                                            : null}
                                                          {gens ===
                                                          "Display Resolution"
                                                            ? para.TvdisplayRes
                                                            : null}
                                                          {gens ===
                                                          "Refresh Rate"
                                                            ? para.TvrfRate
                                                            : null}
                                                          {gens ===
                                                          "Aspect Ratio"
                                                            ? para.TvaspectRatio
                                                            : null}
                                                          {gens ===
                                                          "Supported Video Formats"
                                                            ? para.TvsuppVideo
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Audio Features"
                                              ? TvaudioFea.map(
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
                                                          "No of Speakers"
                                                            ? para.Tvspeakers
                                                            : null}
                                                          {gens ==
                                                          "Speaker Output"
                                                            ? para.Tvaudio
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Extra Features"
                                              ? TvextraFea.map(
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
                                                            ? para.Tvproc
                                                            : null}
                                                          {gens == "RAM"
                                                            ? para.Tvram + "GB"
                                                            : null}
                                                          {gens ==
                                                          "Operating System"
                                                            ? para.Tv_os
                                                            : null}
                                                          {gens ===
                                                          "Supported Applications"
                                                            ? para.Tv_suppAPp
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Connectivity Features"
                                              ? Tvcon.map((gens, subgens) => {
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
                                                        {gens == "HDMI Ports"
                                                          ? para.Tvhdmi
                                                          : null}
                                                        {gens == "USB Ports"
                                                          ? para.Tvusb
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                              : null}
                                            {params == "Dimensions"
                                              ? Tvdim.map((gens, subgens) => {
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
                                                        {gens == "Screen Size"
                                                          ? para.TvdisplaySize +
                                                            "Inch"
                                                          : null}
                                                        {gens == "Weight"
                                                          ? para.Tvweight + "Kg"
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                              : null}
                                          </View>
                                        </View>
                                      );
                                    })
                                  : null}
                                {intake === "Tablets"
                                  ? tbDescription.map((params, indice) => {
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
                                              ? tbGeneral.map(
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
                                                          {gens == "Name"
                                                            ? para.TbRealName
                                                            : null}
                                                          {gens == "Color"
                                                            ? para.Tbcolor
                                                            : null}
                                                          {gens == "RAM"
                                                            ? para.Tbram
                                                              ? para.Tbram
                                                              : "NA"
                                                            : null}
                                                          {gens == "Storage"
                                                            ? para.Tbstorage +
                                                              "GB"
                                                            : null}
                                                          {gens ==
                                                          "Product Type"
                                                            ? para.ProductType
                                                            : null}
                                                          {gens == "Brand"
                                                            ? para.Sbrand
                                                            : null}
                                                          {gens ===
                                                          "Screen Size"
                                                            ? para.TbdisplaySize +
                                                              "inch"
                                                            : null}
                                                          {gens === "Wifi Only?"
                                                            ? para.TbwifiOnly
                                                            : null}
                                                          {gens === "Wifi+4G"
                                                            ? para.TbwifiSim
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Display Features"
                                              ? tbDisplayFeatures.map(
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
                                                            ? para.TbdisplaySize +
                                                              "inch"
                                                            : null}
                                                          {gens == "Resolution"
                                                            ? para.TbdisplayRes
                                                            : null}
                                                          {gens ==
                                                          "Display Type"
                                                            ? para.TbdisplayType
                                                            : null}
                                                        </Text>
                                                      </View>
                                                    );
                                                  }
                                                )
                                              : null}
                                            {params == "Os & Processor Features"
                                              ? tbOsFea.map((gens, subgens) => {
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
                                                        {gens == "Processor"
                                                          ? para.TbProcessor
                                                          : null}
                                                        {gens ==
                                                        "Operating System"
                                                          ? para.TbOs
                                                          : null}
                                                        {gens ==
                                                        "Operating System Version"
                                                          ? para.TbOsver
                                                          : null}
                                                        {gens ==
                                                        "System User Interface"
                                                          ? para.S_system_ui
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
                                              : null}
                                            {params == "Camera Details"
                                              ? tbCameraFeatures.map(
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
                                                          {gens == "Rear Camera"
                                                            ? para.TbpriCam +
                                                              "MP"
                                                            : null}
                                                          {gens ==
                                                          "Front Camera"
                                                            ? para.TbsecCam +
                                                              "MP"
                                                            : null}
                                                          {gens ==
                                                          "Primary Camera Features"
                                                            ? para.TbpriCamFea
                                                              ? para.TbpriCamFea
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Video Recording Features"
                                                            ? para.TbvideoRec
                                                              ? para.TbvideoRec
                                                              : "NA"
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
                                              ? tbStorageFea.map(
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
                                                            ? para.Tbstorage >
                                                              1000
                                                              ? String(
                                                                  para.Tbstorage
                                                                ).charAt(0) +
                                                                "TB"
                                                              : para.Tbstorage +
                                                                "GB"
                                                            : null}
                                                          {gens ==
                                                          "Expandable Storage"
                                                            ? para.TbexpanStorage
                                                              ? para.TbexpanStorage >
                                                                1000
                                                                ? String(
                                                                    para.TbexpanStorage
                                                                  ).charAt(0) +
                                                                  "TB"
                                                                : para.TbexpanStorage +
                                                                  "GB"
                                                              : "NA"
                                                            : null}
                                                          {gens ==
                                                          "Battery Capacity"
                                                            ? para.Tbbattery
                                                              ? para.Tbbattery +
                                                                "mAh"
                                                              : "NA"
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
                                            {params == "Extra Details"
                                              ? tbExtra.map((gens, subgens) => {
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
                                                        {gens == "Wifi Version"
                                                          ? para.TbwifiVer
                                                          : null}
                                                        {gens ==
                                                        "Bluetooth Version"
                                                          ? para.TbBlutoothVer
                                                          : null}
                                                        {gens ==
                                                        "USB Compability"
                                                          ? para.TbusbType
                                                          : null}
                                                        {gens == "Wifi Support"
                                                          ? String(
                                                              para.Swifi_ver
                                                            ).length > 1
                                                            ? "Yes"
                                                            : "NA"
                                                          : null}
                                                        {gens ==
                                                        "Supported Video Formats"
                                                          ? para.TbVideoForm
                                                          : null}
                                                        {gens ==
                                                        "Supported Audio Formats"
                                                          ? para.TbaudioForm
                                                          : null}
                                                        {gens ==
                                                        "Supported Networks"
                                                          ? para.TbsuppNw
                                                            ? para.TbsuppNw
                                                            : "Not Available"
                                                          : null}
                                                      </Text>
                                                    </View>
                                                  );
                                                })
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
