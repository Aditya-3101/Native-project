import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { MobileContext } from "../contexts/MobileContext";
import { SortPhonesContext } from "../contexts/SphonesContext";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "../smartphones/Modal";
import { useNavigation } from "@react-navigation/native";
import Header from "../Header";

const Mobiles = () => {
  const [smData, setSmData] = useContext(MobileContext);

  const [smbData, setSmbData] = useContext(SortPhonesContext);

  const [search, setSearch] = useState("");

  const [sortType, setSortType] = useState("");

  const [showCart, setShowCart] = useState(false);

  const [showFilters, setShowFilters] = useState(false);

  const [defaultNames, setDefaultNames] = useState("Brand");

  const [checked, setChecked] = useState(false);

  const [showRemover, setShowRemover] = useState(false);

  const [sortLowtoHigh, setSortLowtoHigh] = useState(false);

  const [getBrands, setGetBrands] = useState([]);

  const cpygetbrands = [];

  const [cpygetBrandslength, setCpyGetBrandsLength] = useState([]);

  const [cpygetRamslength, setCpyGetRamsLength] = useState([]);

  const [cpygetStoragelength, setCpyGetStorageLength] = useState([]);

  const [cpygetPricelength, setCpyGetPriceLength] = useState([]);

  const [getRam, setGetRam] = useState([]);

  const [getMultifilters, setGetMultifilters] = useState([]);

  const [getStorage, setGetStorage] = useState([]);

  const [getPrice, setGetPrice] = useState([]);

  const [showprice, setShowPrice] = useState(false);

  const [unClicked, setUnClicked] = useState(false);

  const storageoptions = [16, 32, 64, 128, 256];

  const [isloading, setLoading] = useState(true);

  const priceoptions = [10000, 20000, 40000, 80000, 100000];

  const navigation = useNavigation();

  const [pages, setpages] = useState(8);

  const sorter = (a, b) => {
    return a.Sprice - b.Sprice;
  };
  const sortByAge = (arr) => {
    arr.sort(sorter);
  };

  //sortByAge(smData);

  const dessorter = (a, b) => {
    return b.Sprice - a.Sprice;
  };
  const dessortByAge = (arr) => {
    arr.sort(dessorter);
  };

  //dessortByAge(smData);

  useEffect(() => {
    fetch("http://192.168.43.29:4000/api/main/smartphones")
      .then((res) => res.json())
      .then((result) => {
        setSmData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    fetch("http://192.168.43.29:4000/api/main/smartphones/sort/Brands")
      .then((res) => res.json())
      .then((result) => {
        setSmbData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Regain = () => {
    fetch("http://192.168.43.29:4000/api/main/smartphones")
      .then((res) => res.json())
      .then((result) => {
        setSmData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const brandName = [
    ...smbData
      .reduce((map, obj) => map.set(obj.Sbrand, obj), new Map())
      .values(),
  ];

  const getNames = (names) => {
    getBrands.push(`"${names}"`);
    console.log(names);
    getMultifilters.push(names);
    //smData.length = 0;
  };

  const getRAM = (names) => {
    getRam.push(`${names}`);
    getMultifilters.push(names);
    console.log(getMultifilters);
    //smData.length = 0;
  };

  const getStoragelist = (names) => {
    getStorage.push(names);
    getMultifilters.push(names);
  };

  const getPricelist = (names) => {
    getPrice.push(names);
    getMultifilters.push(names);
    console.log(names);
  };
  /*const brandName = smbData.map((para) => {
    return para.Sbrand;
  });*/

  const getKeys = (keys) => {
    console.log(keys + " line 136");
    return keys;
  };

  const applyThis = () => {
    if ((getMultifilters.length > 1) & (getRam.length > 0)) {
      const getnames = getMultifilters.join();
      console.log(getnames + " line 138");

      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/names/rams?names=${getMultifilters
          .join()
          .replace(/[^a-zA-Z]/g, "")}&rams=${getMultifilters
          .join()
          .replace(/[^0-9]/g, "")}`
      )
        .then((res) => res.json())
        .then((Result) => {
          setSmData(Result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (
      (getMultifilters.length > 1) &
      (getRam.length > 0) &
      (getStorage.length > 0)
    ) {
      const getnames = getMultifilters.join();
      console.log(getnames);

      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/names/ram/storage?name=${getMultifilters
          .join()
          .replace(/[^a-zA-Z]/g, "")}&ram=${getRam}&storage=${getStorage}`
      )
        .then((res) => res.json())
        .then((Result) => {
          setSmData(Result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if ((getBrands.length > 0) & (getRam.length == 0)) {
      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/names?brand=${getBrands.join()}`
      )
        .then((res) => res.json())
        .then((result) => {
          setSmData(result);
          console.log(smData.length);
          cpygetbrands.push(result);
          setCpyGetBrandsLength(getBrands);
          setGetBrands([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if ((getRam.length > 0) & (getBrands.length == 0)) {
      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/RAM?ram=${getRam.join()}`
      )
        .then((res) => res.json())
        .then((result) => {
          setSmData(result);
          console.log("RAM Section", result);
          setCpyGetRamsLength(getRam);
          setGetRam([]);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (
      (getStorage.length > 0) &
      (getRam.length === 0) &
      (getPrice.length === 0)
    ) {
      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/storage?storage=${getStorage.join()}`
      )
        .then((res) => res.json())
        .then((result) => {
          setSmData(result);
          setCpyGetStorageLength(getStorage);
          setGetStorage([]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      (getPrice.length > 0) &
      (getRam.length === 0) &
      (getStorage.length === 0) &
      (getBrands.length === 0)
    ) {
      fetch(
        `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/Price?price=${getPrice.join()}`
      )
        .then((res) => res.json())
        .then((Result) => {
          setSmData(Result);
          setCpyGetPriceLength(getPrice);
          setGetPrice([]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <ScrollView>
        <StatusBar hidden={false} backgroundColor={"rgba(0,0,0,0.9)"} />
        <View>
          <Header />
          <View style={styles.header}>
            <Icon
              name="arrow-left"
              color="white"
              fontsize={50}
              style={styles.backIcon}
              onPress={() => navigation.navigate("Home")}
            />
            <TextInput
              onChangeText={setSearch}
              value={search}
              placeholder="Search"
              style={styles.searchInput}
            />
            <Icon
              name="shopping-cart"
              color="white"
              fontSize={35}
              style={styles.cartIcon}
            />
          </View>
          <View style={styles.sortDrawer}>
            <TouchableOpacity
              onPress={() => {
                setShowCart(!showCart);
              }}
            >
              <View style={styles.sortIcon}>
                <Icon name="sort" color="#495057" style={styles.icons} />
                <Text style={{ fontSize: 18, fontWeight: "900" }}>Sort</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowFilters(!showFilters);
              }}
            >
              <View style={styles.sortRIcon}>
                <Icon name="filter" color="#495057" style={styles.icons} />
                <Text style={{ fontSize: 18 }}>Filter</Text>
                <View
                  style={{
                    color: "black",
                    //backgroundColor: "#4abf18",
                    backgroundColor: "black",
                    marginTop: -4,
                    marginLeft: 2,
                    width: 8,
                    height: 8,
                    fontSize: 17,
                    borderWidth: 1,
                    borderRadius: 50,
                    display:
                      cpygetBrandslength.length > 0
                        ? "flex"
                        : cpygetRamslength.length > 0
                        ? "flex"
                        : cpygetStoragelength.length > 0
                        ? "flex"
                        : cpygetPricelength.length > 0
                        ? "flex"
                        : "none",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              flexDirection: "row",
              height: 50,
              paddingLeft: 10,
              alignItems: "center",
              backgroundColor: "white",
              display: showCart ? "flex" : "none",
            }}
          >
            <Icon name="sort" color="gray" style={styles.filterIcon} />
            <Text style={styles.filtername}>Sort</Text>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              display: showCart ? "flex" : "none",
            }}
          >
            <View style={styles.firstSortDiv}>
              <TouchableOpacity
                onPress={() => {
                  smData.sort((a, b) => {
                    setShowCart(false);
                    setShowRemover(true);
                    setSortLowtoHigh(true);
                    setSortType("Price:Low to High");
                    return a.Sprice - b.Sprice;
                  });
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    //width: 100,
                    textAlign: "center",
                    padding: 5,
                    color: "white",
                    marginBottom: 6,
                  }}
                >
                  Price:Low to High
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  smData.sort((a, b) => {
                    setShowCart(false);
                    setSortType("");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    width: 120,
                    textAlign: "center",
                    padding: 5,
                    color: "white",
                  }}
                >
                  Relevance
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.secondSortDiv}>
              <TouchableOpacity
                onPress={() => {
                  smData.sort((a, b) => {
                    setShowCart(false);
                    setShowRemover(true);
                    setSortLowtoHigh(false);
                    setSortType("Price:High to Low");
                    return b.Sprice - a.Sprice;
                  });
                }}
              >
                <Text
                  style={{
                    backgroundColor: "gray",
                    //width: 100,
                    textAlign: "center",
                    padding: 5,
                    color: "white",
                    marginBottom: 6,
                  }}
                >
                  Price:High to Low
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{
                    backgroundColor: "gray",
                    width: 120,
                    textAlign: "center",
                    padding: 5,
                    color: "white",
                  }}
                >
                  Popularity
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              display: showRemover ? "flex" : "none",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "black",
                flexDirection: "row",
                width: Dimensions.get("window").width / 3,
                marginTop: 10,
                marginBottom: 10,
                padding: 8,
                display: sortLowtoHigh ? "flex" : "none",
              }}
              onPress={() => {
                smData.sort((a, b) => {
                  setSortType("Relevance");
                  setShowRemover(false);
                  return a.ProductId - b.ProductId;
                });
              }}
            >
              <Icon name="times" color="white" style={styles.closeIcon} />
              <Text style={{ color: "white" }}>
                {sortType === "Price:Low to High" ? "Low to High" : ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "black",
                flexDirection: "row",
                width: Dimensions.get("window").width / 3,
                marginTop: 10,
                marginBottom: 10,
                padding: 8,
                display: sortLowtoHigh ? "none" : "flex",
              }}
              onPress={() => {
                smData.sort((a, b) => {
                  setSortType("Relevance");
                  setShowRemover(false);
                  return a.ProductId - b.ProductId;
                });
              }}
            >
              <Icon name="times" color="white" style={styles.closeIcon} />
              <Text style={{ color: "white" }}>
                {sortType === "Price:High to Low" ? "High to Low" : ""}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              //display: showFilters == true ? "flex" : "none",
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: "red",
              display: "none",
            }}
          >
            {getBrands.map((parames, indices) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: "black",
                    flexDirection: "row",
                    width: Dimensions.get("window").width / 3,
                    marginTop: 10,
                    marginBottom: 10,
                    padding: 8,
                  }}
                  key={indices}
                >
                  <Icon name="times" color="white" style={styles.closeIcon} />
                  <Text style={{ color: "white" }}>{parames}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              minHeight: 70,
              maxHeight: 120,
              justifyContent: "space-evenly",
              //backgroundColor: "cyan",
              alignItems: "center",
              //display: cpygetBrandslength.length === 2 ? "flex" : "none",
              flexDirection: cpygetBrandslength.length > 3 ? "column" : "row",
              display: unClicked ? "flex" : "none",
            }}
          >
            {cpygetBrandslength.map((pars, index) => {
              console.log(cpygetBrandslength.length, " line 533");
              if (cpygetBrandslength.length === 2) {
                console.log("length is 2");
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                      display:
                        cpygetBrandslength.length === 2 ? "flex" : "none",
                      //display: unClicked === pars ? "none" : "flex",
                    }}
                    onPress={() => {
                      console.log("line 555 " + pars);
                      console.log(
                        cpygetBrandslength.join().replace(`${pars}`, "")
                      );
                      fetch(
                        `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                          .join()
                          .replace(pars, "")}`
                      )
                        .then((res) => res.json())
                        .then((Result) => {
                          //console.log(Result);
                          setSmData(Result);
                          //cpygetBrandslength.length - 1;
                          setCpyGetBrandsLength(
                            cpygetBrandslength.filter((e) => e !== pars)
                          ); // will return ['A', 'C']
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {/*String(pars.Sbrand ? pars.Sbrand : pars).replace(
                        /"/g,
                        ""
                      )}*/}
                      {pars.Sbrand
                        ? String(pars.Sbrand).replace(/"/g, "")
                        : String(pars).replace(/"/g, "")}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (cpygetBrandslength.length === 3) {
                console.log("length is 3");
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                      display:
                        cpygetBrandslength.length === 3 ? "flex" : "none",
                      //display: unClicked === pars ? "none" : "flex",
                    }}
                    onPress={() => {
                      console.log("line 555 ", pars);
                      //setUnClicked(pars);
                      console.log(
                        cpygetBrandslength.join().replace(`${pars}`, "")
                      );
                      fetch(
                        `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                          .join()
                          .replace(pars, "")}`
                      )
                        .then((res) => res.json())
                        .then((Result) => {
                          //console.log(Result);
                          setSmData(Result);
                          //cpygetBrandslength.length - 1;
                          setCpyGetBrandsLength(
                            cpygetBrandslength.filter((e) => e !== pars)
                          ); // will return ['A', 'C']
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {String(pars).replace(/"/g, "")}
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                      display:
                        cpygetBrandslength.length === 1 ? "flex" : "none",
                    }}
                    onPress={() => {
                      Regain();
                      cpygetBrandslength.length = 0;
                      setUnClicked(false);
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {String(pars.Sbrand ? pars.Sbrand : pars).replace(
                        /"/g,
                        ""
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
            {cpygetRamslength.map((pars, index) => {
              if (cpygetRamslength.length === 2) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                      //display:
                      //cpygetBrandslength.length === 2 ? "flex" : "none",
                      //display: unClicked === pars ? "none" : "flex",
                    }}
                    onPress={() => {
                      console.log("line 555 " + pars);
                      console.log(
                        cpygetRamslength.join().replace(`${pars}`, "")
                      );
                      fetch(
                        `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/RAM/sName/rNames?sName=${pars}&rName=${cpygetRamslength
                          .join()
                          .replace(pars, "")}`
                      )
                        .then((res) => res.json())
                        .then((Result) => {
                          //console.log(Result);
                          setSmData(Result);
                          //cpygetBrandslength.length - 1;
                          setCpyGetRamsLength(
                            cpygetRamslength.filter((e) => e !== pars)
                          ); // will return ['A', 'C']
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {/*String(pars.Sbrand ? pars.Sbrand : pars).replace(
                        /"/g,
                        ""
                      )}*/}
                      {pars.Sram
                        ? String(pars.Sram).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("GB")}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (cpygetRamslength.length === 3) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                    }}
                    onPress={() => {
                      console.log("line 555 " + pars);
                      console.log(
                        cpygetRamslength.join().replace(`${pars}`, "")
                      );
                      fetch(
                        `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/RAM/seName/reNames?seName=${pars}&reName=${cpygetRamslength
                          .join()
                          .replace(pars, "")}`
                      )
                        .then((res) => res.json())
                        .then((Result) => {
                          //console.log(Result);
                          setSmData(Result);
                          //cpygetBrandslength.length - 1;
                          setCpyGetRamsLength(
                            cpygetRamslength.filter((e) => e !== pars)
                          ); // will return ['A', 'C']
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {/*String(pars.Sbrand ? pars.Sbrand : pars).replace(
                            /"/g,
                            ""
                          )}*/}
                      {pars.Sram
                        ? String(pars.Sram).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("GB")}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (cpygetRamslength.length === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                      //display:
                      //cpygetBrandslength.length === 2 ? "flex" : "none",
                      //display: unClicked === pars ? "none" : "flex",
                    }}
                    onPress={() => {
                      Regain();
                      cpygetRamslength.length = 0;
                      setUnClicked(false);
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {pars.Sram
                        ? String(pars.Sram).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("GB")}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
            {cpygetStoragelength.map((pars, index) => {
              if (cpygetStoragelength.length === 2) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                    }}
                    onPress={() => {
                      console.log("line 555 " + pars);
                      console.log(
                        cpygetRamslength.join().replace(`${pars}`, "")
                      );
                      fetch(
                        `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength
                          .join()
                          .replace(pars, "")}`
                      )
                        .then((res) => res.json())
                        .then((Result) => {
                          setSmData(Result);
                          setCpyGetStorageLength(
                            cpygetStoragelength.filter((e) => e !== pars)
                          );
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {pars.Sstorage
                        ? String(pars.Sstorage).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("GB")}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (cpygetStoragelength.length === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                    }}
                    onPress={() => {
                      Regain();
                      cpygetStoragelength.length = 0;
                      setUnClicked(false);
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {pars.Sstorage
                        ? String(pars.Sstorage).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("GB")}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (cpygetStoragelength.length === 3) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",
                      width: 100,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                    }}
                    onPress={() => {
                      console.log("line 555 " + pars);
                      console.log(
                        cpygetStoragelength.join().replace(`${pars}`, "")
                      );
                      fetch(
                        `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/Storage/seName/reNames?seName=${pars}&reName=${cpygetStoragelength
                          .join()
                          .replace(pars, "")}`
                      )
                        .then((res) => res.json())
                        .then((Result) => {
                          setSmData(Result);
                          console.log(Result);
                          setCpyGetStorageLength(
                            cpygetStoragelength.filter((e) => e !== pars)
                          );
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <Icon
                      name="times"
                      color="white"
                      style={{
                        fontSize: 16,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {pars.Sstorage
                        ? String(pars.Sstorage).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("GB")}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
            {cpygetPricelength.length > 0 ? (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  width: 150,
                  height: 30,
                  backgroundColor: "rgb(0,0,0)",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  position: "relative",
                }}
                onPress={() => {
                  Regain();
                  cpygetPricelength.length = 0;
                  setUnClicked(false);
                }}
              >
                <Icon name="times" color="white" style={{ fontSize: 16 }} />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {cpygetPricelength.length > 1 ? (
                    `${parseInt(Math.min(...cpygetPricelength))
                      .toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })
                      .replace(".00", "")} - ${parseInt(
                      Math.max(...cpygetPricelength)
                    )
                      .toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })
                      .replace(".00", "")}`
                  ) : (
                    <Text>
                      {parseInt(cpygetPricelength)
                        .toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                        .replace(".00", "")}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <View
            style={{
              width: Dimensions.get("window").width,
              flexDirection: "row",
              height: 50,
              paddingLeft: 10,
              alignItems: "center",
              backgroundColor: "white",
              display: showFilters ? "flex" : "none",
            }}
          >
            <Icon name="filter" color="gray" style={styles.filterIcon} />
            <Text style={styles.filtername}>Filters</Text>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              minHeight: 400,
              maxHeight: 600,
              backgroundColor: "white",
              //backgroundColor: "red",
              display: showFilters ? "flex" : "none",
              justifyContent: "space-evenly",
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "rgb(8,8,8)",
            }}
          >
            <View style={styles.filterListContainer}>
              <TouchableOpacity
                style={styles.filterlistBtn}
                onPress={() => setDefaultNames("Brand")}
              >
                <Text style={styles.filterList}>Brand </Text>
                <View
                  style={{
                    color: "black",
                    backgroundColor: "#4abf18",
                    marginTop: -4,
                    width: 9,
                    height: 9,
                    fontSize: 17,
                    borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetBrandslength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterlistBtn}
                onPress={() => setDefaultNames("RAM")}
              >
                <Text style={styles.filterList}>RAM </Text>
                <View
                  style={{
                    color: "black",
                    backgroundColor: "#4abf18",
                    //backgroundColor: "black",
                    marginTop: -4,
                    //marginLeft: 2,
                    width: 8,
                    height: 8,
                    fontSize: 17,
                    borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetRamslength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterlistBtn}
                onPress={() => setDefaultNames("Storage")}
              >
                <Text style={styles.filterList}>Storage</Text>
                <View
                  style={{
                    color: "black",
                    backgroundColor: "#4abf18",
                    //backgroundColor: "black",
                    marginTop: -4,
                    //marginLeft: 2,
                    width: 8,
                    height: 8,
                    fontSize: 17,
                    borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetStoragelength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.filterlistBtn}
                onPress={() => {
                  setDefaultNames("Price"), setShowPrice(!showprice);
                }}
              >
                <Text style={styles.filterList}>Price</Text>
                <View
                  style={{
                    color: "black",
                    backgroundColor: "#4abf18",
                    //backgroundColor: "black",
                    marginTop: -4,
                    //marginLeft: 2,
                    width: 8,
                    height: 8,
                    fontSize: 17,
                    borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetPricelength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: Dimensions.get("window").width / 2,
                height: 400,
                justifyContent: "space-evenly",
                alignItems: "center",
                display: defaultNames === "Brand" ? "flex" : "none",
              }}
            >
              {brandName.map((paras, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    //style={styles.firstFilterDiv}
                    onPress={() => {
                      getNames(paras.Sbrand), console.log(getKeys(index));
                    }}
                    style={{
                      width: 100,
                      //marginTop: 150,
                      //marginBottom: 50,
                      backgroundColor: "gray",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      padding: 2,
                      paddingLeft: 8,
                      paddingRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        marginTop: 9,
                        marginBottom: 9,
                      }}
                    >
                      {paras.Sbrand}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "column",
                width: Dimensions.get("window").width / 2,
                height: 400,
                justifyContent: "space-evenly",
                alignItems: "center",
                display: defaultNames === "RAM" ? "flex" : "none",
              }}
            >
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("1")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  1GB
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("2")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  2GB
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("3")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  3GB
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("4")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  4GB
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("6")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  6GB
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("8")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  8GB
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.firstFilterDiv}
                onPress={() => getRAM("12")}
              >
                <Text
                  style={{
                    color: "white",
                    marginTop: 9,
                    marginBottom: 9,
                  }}
                >
                  12GB
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                width: Dimensions.get("window").width / 2,
                height: 400,
                justifyContent: "space-evenly",
                alignItems: "center",
                display: defaultNames === "Storage" ? "flex" : "none",
              }}
            >
              {storageoptions.map((params, indice) => {
                return (
                  <TouchableOpacity
                    key={indice}
                    style={styles.firstFilterDiv}
                    onPress={() => getStoragelist(params)}
                  >
                    <Text
                      style={{
                        color: "white",
                        marginTop: 9,
                        marginBottom: 9,
                      }}
                    >
                      {params + "GB"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: "column",
                width: Dimensions.get("window").width / 2,
                height: 400,
                justifyContent: "space-evenly",
                alignItems: "center",
                display: defaultNames === "Price" ? "flex" : "none",
              }}
            >
              {priceoptions.map((params, indice) => {
                return (
                  <TouchableOpacity
                    key={indice}
                    style={styles.firstFilterDiv}
                    onPress={() => getPricelist(params)}
                  >
                    <Text
                      style={{
                        color: "white",
                        marginTop: 9,
                        marginBottom: 9,
                      }}
                    >
                      {"< " +
                        parseInt(params)
                          .toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            //minimumFractionDigits: 2,
                            //maximumFractionDigits: 2,
                          })
                          .replace(".00", "")}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View
            style={{
              display: showFilters ? "flex" : "none",
              width: Dimensions.get("window").width,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ width: Dimensions.get("window").width / 2 }}></View>
            <View
              style={{
                width: Dimensions.get("window").width / 2,
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={styles.applyBtns}
                onPress={() => {
                  setUnClicked(!unClicked);
                  applyThis();
                  ToastAndroid.showWithGravityAndOffset(
                    "Filter Applied",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    paddingBottom: 5,
                    paddingTop: 5,
                    textAlign: "center",
                  }}
                >
                  Apply
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyBtns}
                onPress={() => {
                  setSortType("Relevance");
                  //setSmData(cpySmData);

                  setGetBrands([]),
                    setGetRam([]),
                    setGetStorage([]),
                    setGetMultifilters([]);
                  setGetPrice([]);
                  cpygetBrandslength.length = 0;
                  cpygetPricelength.length = 0;
                  cpygetRamslength.length = 0;
                  cpygetStoragelength.length = 0;
                  Regain();
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 17,
                    paddingBottom: 5,
                    paddingTop: 5,
                    textAlign: "center",
                  }}
                >
                  clear
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.main}>
            {isloading === false ? (
              <Modal data={smData.slice(0, pages)} />
            ) : (
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
              </View>
            )}
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              height: 100,
              backgroundColor: "rgb(255,255,255)",
              alignItems: "center",
              justifyContent: "center",
              display: pages <= smData.length ? "flex" : "none",
            }}
          >
            <TouchableOpacity
              style={styles.loadBtn}
              onPress={() => {
                setpages((prev) => prev + 8);
              }}
            >
              <Text style={styles.moreText}>Load More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    width: 30,
    height: 30,
    fontSize: 22,
  },

  cartIcon: {
    fontSize: 22,
    marginLeft: 9,
    marginRight: 0,
  },

  header: {
    width: Dimensions.get("window").width,
    //backgroundColor: "#6c757d",
    backgroundColor: "rgb(20,20,20)",
    padding: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchInput: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 35,
    padding: 7,
  },
  sortDrawer: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
  },
  sortIcon: {
    marginTop: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  sortRIcon: {
    marginBottom: 5,
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  icons: {
    fontSize: 20,
    marginRight: 2,
  },
  sortDiv: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  firstSortDiv: {
    width: Dimensions.get("window").width / 2,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  secondSortDiv: {
    width: Dimensions.get("window").width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    width: Dimensions.get("window").width,
    //backgroundColor: "#6c757d",
    backgroundColor: "white",
  },
  closeThis: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    flexDirection: "row",
    width: Dimensions.get("window").width / 3,
    marginTop: 10,
    marginBottom: 10,
  },
  closeIcon: {
    fontSize: 22,
  },

  firstFilterDiv: {
    width: 100,
    //marginTop: 150,
    //marginBottom: 50,
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
  },
  square: {
    fontSize: 18,
    //borderWidth: 2,
    marginLeft: 1,
    //backgroundColor: "white",
    padding: 0,
    //borderColor: "gray",
  },
  filterList: {
    width: Dimensions.get("window").width / 3,
    //height: 100,
    textAlign: "center",
    color: "white",
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0,0,5)",
  },
  filterListContainer: {
    width: Dimensions.get("window").width / 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(20,20,20,0.1)",
  },
  filterlistBtn: {
    //backgroundColor: "rgb(20,20,20)",
    flexDirection: "row",
  },
  applyBtns: {
    backgroundColor: "rgb(5,5,5)",
    marginTop: 5,
    marginBottom: 5,
    width: 70,
    textAlign: "center",
  },
  filterheader: {},
  filtername: {
    width: 100,
    fontSize: 22,
    color: "black",
  },
  filterIcon: {
    fontSize: 22,
  },
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
  loadMore: {
    width: Dimensions.get("window").width,
    height: 100,
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
  },
  loadBtn: {
    width: 100,
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    borderColor: "rgb(0,0,0)",
  },
  moreText: {
    color: "rgba(0,0,0,0.9)",
    margin: 1,
    fontSize: 17,
  },
});

export default Mobiles;
