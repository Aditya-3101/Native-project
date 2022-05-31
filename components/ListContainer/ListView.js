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
  BackHandler,
  Pressable,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { MobileContext } from "../contexts/MobileContext";
import { LaptopContext } from "../contexts/LaptopContext";
import { IntakeContext } from "../contexts/Intake";
import { SortPhonesContext } from "../contexts/SphonesContext";
import { CartContext } from "../contexts/Getcart";
import { WmacContext } from "../contexts/WmachineContext";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Modal from "./Modal";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../Header";
import { FridgeContext } from "../contexts/FridgeContext";
import { Tvcontext } from "../contexts/TvContext";
import { TabletContext } from "../contexts/TabletContext";
import { PathContext } from "../contexts/CheckPath";

const ListView = (props) => {
  const isFocused = useIsFocused();

  const [smData, setSmData] = useContext(MobileContext);

  const [smbData, setSmbData] = useContext(SortPhonesContext);

  const [lpData, setLpData] = useContext(LaptopContext);

  const [wdata, setWdata] = useContext(WmacContext);

  const [intake, setIntake] = useContext(IntakeContext);

  const [items, setItems] = useContext(CartContext);

  const [fridgeData, setFridgeData] = useContext(FridgeContext);

  const [tvData, setTvData] = useContext(Tvcontext);

  const [tabletData, setTabletData] = useContext(TabletContext);

  const [path, setPath] = useContext(PathContext);

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

  const [storageoptions, setStorageOptions] = useState([16, 32, 64, 128, 256]);

  const [wCapacity, setWcapacity] = useState([
    "6Kg",
    "7Kg",
    "8Kg",
    "9Kg",
    "10Kg",
  ]);

  const [fridgeCapacity, setFridgeCapacity] = useState([
    "180L",
    "200L",
    "300L",
    "500L",
  ]);

  const lpStorageoptions = [256, 512, 1, 2];

  const tabStorageoptions = [32, 64, 128, 256];

  const smRAMoptions = [2, 3, 4, 6, 8, 12];

  const lpRAMoptions = [4, 8, 12, 16, 32];

  const [isloading, setLoading] = useState(true);

  const [functionality, setFunctionality] = useState([
    "Semi Automatic",
    "Fully Automatic",
  ]);

  const [fridgeFunctionality, setFridgeFunctionality] = useState([
    "Direct Cool",
    "Frost Free",
  ]);

  const [screenQuality, setScreenQuality] = useState([
    "HD",
    "HD+",
    "FHD",
    "QHD",
    "UHD",
  ]);

  const [screenSize, setScreenSize] = useState([
    "18-24",
    "24-32",
    "32-52",
    "52-76",
  ]);

  const [tbScreenSize, setTbScreenSize] = useState(["6-8", "8-12", "12-16"]);

  const [tvPrice, setTvPrice] = useState([20000, 40000, 60000, 100000, 150000]);

  const priceoptions = [10000, 20000, 40000, 80000, 100000];

  const lpPriceOptions = [30000, 50000, 80000, 200000, 400000];

  const wPriceOptions = [10000, 30000, 50000, 70000];

  const fridgePriceOptions = [10000, 30000, 50000, 70000];

  const tbPriceOptions = [20000, 30000, 50000, 70000];

  const navigation = useNavigation();

  const [pages, setpages] = useState(7);

  const sorter = (a, b) => {
    return a.Sprice - b.Sprice;
  };
  const sortByAge = (arr) => {
    arr.sort(sorter);
  };

  const dessorter = (a, b) => {
    return b.Sprice - a.Sprice;
  };
  const dessortByAge = (arr) => {
    arr.sort(dessorter);
  };

  useLayoutEffect(() => {
    let isMounted = true;
    if (intake === "mobiles") {
      isMounted = true;
      fetch("http://192.168.43.29:4000/api/main/smartphones")
        .then((res) => res.json())
        .then((result) => {
          isMounted ? setSmData(result) : null;
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
    } else if (intake === "Laptops") {
      isMounted = true;
      fetch("http://192.168.43.29:4000/api/main/laptops")
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          isMounted ? setLpData(result) : null;
        })
        .catch((error) => {
          console.log(error);
        });
      fetch("http://192.168.43.29:4000/api/main/laptops/sort/Brands")
        .then((res) => res.json())
        .then((result) => {
          setSmbData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (intake === "Wmachine") {
      isMounted = true;
      fetch("http://192.168.43.29:4000/api/main/wmachines")
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          isMounted ? setWdata(result) : null;
        })
        .catch((error) => {
          console.log(error);
        });
      fetch("http://192.168.43.29:4000/api/main/wmachines/sort/Brands")
        .then((res) => res.json())
        .then((result) => {
          setSmbData(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (intake === "Fridge") {
      fetch("http://192.168.43.29:4000/api/main/Refrigerators")
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setFridgeData(Result) : null;
          setLoading(false);
        })
        .catch((Err) => {
          console.log(Err);
        });
      fetch("http://192.168.43.29:4000/api/main/Refrigerators/sort/brands")
        .then((res) => res.json())
        .then((Result) => {
          setSmbData(Result);
        })
        .catch((Err) => {
          console.log(Err);
        });
    } else if (intake === "Tvs") {
      fetch("http://192.168.43.29:4000/api/main/televisions")
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setTvData(Result) : null;
          setLoading(false);
        })
        .catch((Err) => {
          console.log(Err);
        });
      fetch("http://192.168.43.29:4000/api/main/televisions/sort/brands")
        .then((res) => res.json())
        .then((Result) => {
          setSmbData(Result);
        })
        .catch((Err) => {
          console.log(Err);
        });
    } else if (intake === "Tablets") {
      fetch("http://192.168.43.29:4000/api/main/Tablets")
        .then((res) => res.json())
        .then((Result) => {
          isMounted ? setTabletData(Result) : null;
          setLoading(false);
        })
        .catch((Err) => {
          console.log(Err);
        });
      fetch("http://192.168.43.29:4000/api/main/Tablets/sort/brands")
        .then((res) => res.json())
        .then((Result) => {
          setSmbData(Result);
        })
        .catch((Err) => {
          console.log(Err);
        });
    } else if (String(intake).length > 9) {
      isMounted = true;
      const getThis = String(intake).split(",");
      if (getThis[0] === "Mobiles") {
        fetch(`http://192.168.43.29:4000/api/main/search?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((result) => {
            isMounted ? setSmData(result) : null;
            setLoading(false);
          })
          .catch((err) => console.log(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Laptops") {
        fetch(`http://192.168.43.29:4000/api/main/search/lp?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setLpData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/lp/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Wmachine") {
        fetch(`http://192.168.43.29:4000/api/main/search/wm?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setWdata(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/wm/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Fridges") {
        fetch(`http://192.168.43.29:4000/api/main/search/Rf?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setFridgeData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/wm/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Televisions") {
        fetch(`http://192.168.43.29:4000/api/main/search/Tv?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setTvData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/Tv/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Tablets") {
        fetch(`http://192.168.43.29:4000/api/main/search/Tb?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setTabletData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/Tb/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackBtnPressed);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackBtnPressed
      );
    };
  }, []);

  const handleBackBtnPressed = () => {
    navigation.goBack(null);
    return true;
  };

  useLayoutEffect(() => {
    let isMounted = true;
    if (String(intake).length > 9) {
      isMounted = true;
      const getThis = String(intake).split(",");
      if (getThis[0] === "Mobiles") {
        fetch(`http://192.168.43.29:4000/api/main/search?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((result) => {
            isMounted ? setSmData(result) : null;
            setLoading(false);
          })
          .catch((err) => console.log(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Laptops") {
        fetch(`http://192.168.43.29:4000/api/main/search/lp?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setLpData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/lp/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Wmachine") {
        fetch(`http://192.168.43.29:4000/api/main/search/wm?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setWdata(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/wm/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Fridges") {
        fetch(`http://192.168.43.29:4000/api/main/search/Rf?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setFridgeData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/wm/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Televisions") {
        fetch(`http://192.168.43.29:4000/api/main/search/Tv?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setTvData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/Tv/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      } else if (getThis[0] === "Tablets") {
        fetch(`http://192.168.43.29:4000/api/main/search/Tb?get=${getThis[1]}`)
          .then((res) => res.json())
          .then((Result) => {
            isMounted ? setTabletData(Result) : null;
            setLoading(false);
          })
          .catch((err) => alert(err));
        fetch(
          `http://192.168.43.29:4000/api/main/search/Tb/getBrands?get=${getThis[1]}`
        )
          .then((Res) => Res.json())
          .then((result) => {
            setSmbData(result);
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [intake]);

  const Regain = () => {
    smData.length > 0
      ? fetch("http://192.168.43.29:4000/api/main/smartphones")
          .then((res) => res.json())
          .then((result) => {
            setSmData(result);
          })
          .catch((error) => {
            console.log(error);
          })
      : lpData.length > 0
      ? fetch("http://192.168.43.29:4000/api/main/laptops")
          .then((res) => res.json())
          .then((Result) => {
            setLpData(Result);
          })
          .catch((err) => {
            console.log(err);
          })
      : wdata.length > 0
      ? fetch("http://192.168.43.29:4000/api/main/wmachines")
          .then((res) => res.json())
          .then((Result) => {
            setWdata(Result);
          })
          .catch((err) => {
            console.log(err);
          })
      : fridgeData.length > 0
      ? fetch("http://192.168.43.29:4000/api/main/Refrigerators")
          .then((res) => res.json())
          .then((Result) => {
            setFridgeData(Result);
          })
          .catch((err) => {
            console.log(err);
          })
      : tvData.length > 0
      ? fetch("http://192.168.43.29:4000/api/main/televisions")
          .then((res) => res.json())
          .then((Result) => {
            setTvData(Result);
          })
          .catch((err) => {
            console.log(err);
          })
      : tabletData.length > 0
      ? fetch("http://192.168.43.29:4000/api/main/tablets")
          .then((res) => res.json())
          .then((Result) => {
            setTabletData(Result);
          })
          .catch((err) => {
            console.log(err);
          })
      : null;
  };

  const brandName = [
    ...smbData
      .reduce((map, obj) => map.set(obj.Sbrand, obj), new Map())
      .values(),
  ];

  //const brandName = [...smbData];

  const getNames = (names) => {
    getBrands.push(`"${names}"`);
    getMultifilters.push(names);
  };

  const getRAM = (names) => {
    getRam.push(`${names}`);
    getMultifilters.push(names);
  };

  const getStoragelist = (names) => {
    getStorage.push(names);
    getMultifilters.push(names);
  };

  const getPricelist = (names) => {
    getPrice.push(names);
    getMultifilters.push(names);
  };

  const getKeys = (keys) => {
    return keys;
  };

  const applyThis = () => {
    if (smData.length > 1) {
      if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getBrands.length > 0) &
        (getStorage.length == 0) &
        (getPrice.length == 0)
      ) {
        const getnames = getMultifilters.join();

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
            setGetMultifilters([]);
            setUnClicked(false);
            setShowFilters(false);
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

        fetch(
          `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/names/ram/storage?name=${getMultifilters
            .join()
            .replace(/[^a-zA-Z]/g, "")}&ram=${getRam}&storage=${getStorage}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setSmData(Result);
            setUnClicked(false);
            setGetMultifilters([]);
            setShowFilters(false);
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
            cpygetbrands.push(result);
            setGetMultifilters([]);
            setCpyGetBrandsLength(getBrands);
            setGetBrands([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getRam.length > 0) &
        (getBrands.length == 0) &
        (getStorage.length == 0) &
        (getPrice.length == 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/RAM?ram=${getRam.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setSmData(result);
            setCpyGetRamsLength(getRam);
            setGetRam([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
            setGetMultifilters([]);
            setShowFilters(false);
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
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (lpData.length > 1) {
      if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length === 0) &
        (getBrands.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/laptops/sort/Brands/names/rams?names=${getMultifilters
            .join()
            .replace(/[^a-zA-Z]/g, "")}&rams=${getMultifilters
            .join()
            .replace(/[^0-9]/g, "")}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setLpData(Result);
            setGetMultifilters([]);
            setUnClicked(false);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/laptops/sort/Brands/names/ram/storage?name=${getMultifilters
            .join()
            .replace(/[^a-zA-Z]/g, "")}&ram=${getRam}&storage=${getStorage}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setLpData(Result);
            setUnClicked(false);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getBrands.length > 0) &
        (getRam.length == 0) &
        (getStorage.length === 0) &
        (getPrice.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/laptops/sort/Brands/names?brand=${getBrands.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setLpData(result);
            cpygetbrands.push(result);
            setCpyGetBrandsLength(getBrands);
            setGetBrands([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getRam.length > 0) &
        (getBrands.length == 0) &
        (getPrice.length == 0) &
        (getStorage.length == 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/laptops/sort/Brands/RAM?ram=${getRam.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setLpData(result);
            setCpyGetRamsLength(getRam);
            setGetRam([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getStorage.length > 0) &
        (getRam.length === 0) &
        (getPrice.length === 0) &
        (getBrands.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/laptops/sort/Brands/storage?storage=${getStorage.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setLpData(result);
            setCpyGetStorageLength(getStorage);
            setGetStorage([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
          `http://192.168.43.29:4000/api/main/laptops/sort/Brands/Price?price=${getPrice.join()}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setLpData(Result);
            setCpyGetPriceLength(getPrice);
            setGetPrice([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (wdata.length > 1) {
      if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length === 0) &
        (getBrands.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/names/func?names=${
            functionality.includes(getMultifilters[0]) == true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&func=${
            functionality.includes(getMultifilters[1]) == true
              ? getMultifilters[1]
              : getMultifilters[0]
          }`
        )
          .then((res) => res.json())
          .then((Result) => {
            setWdata(Result);
            setGetMultifilters([]);
            setUnClicked((prev) => !prev);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/names/func/capacity?names=${
            functionality.includes(getMultifilters[0]) === true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&func=${
            functionality.includes(getMultifilters[1]) === true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&cap=${getStorage.join().match(/\d+/g).join("")}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setLpData(Result);
            setGetMultifilters([]);
            setUnClicked(false);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getBrands.length > 0) &
        (getRam.length == 0) &
        (getStorage.length === 0) &
        (getPrice.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/names?brand=${getBrands.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWdata(result);
            cpygetbrands.push(result);
            setCpyGetBrandsLength(getBrands);
            setGetBrands([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getRam.length > 0) &
        (getBrands.length == 0) &
        (getPrice.length == 0) &
        (getStorage.length == 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/functionality?types=${getRam.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWdata(result);
            setCpyGetRamsLength(getRam);
            setGetRam([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getStorage.length > 0) &
        (getRam.length === 0) &
        (getPrice.length === 0) &
        (getBrands.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/capacity?storage=${getStorage.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setWdata(result);
            setCpyGetStorageLength(
              getStorage.length > 2 ? getStorage.slice(0, 2) : getStorage
            );
            setGetStorage([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
          `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/Price?price=${getPrice.join()}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setWdata(Result);
            setCpyGetPriceLength(getPrice);
            setGetPrice([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else if (fridgeData.length > 1) {
      if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length === 0) &
        (getBrands.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/names/func?names=${
            fridgeFunctionality.includes(getMultifilters[0]) == true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&func=${
            fridgeFunctionality.includes(getMultifilters[1]) == true
              ? getMultifilters[1]
              : getMultifilters[0]
          }`
        )
          .then((res) => res.json())
          .then((Result) => {
            setFridgeData(Result);
            setGetMultifilters([]);
            setUnClicked((prev) => !prev);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/names/func/capacity?names=${
            fridgeFunctionality.includes(getMultifilters[0]) === true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&func=${
            fridgeFunctionality.includes(getMultifilters[1]) === true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&cap=${getStorage.join().match(/\d+/g).join("")}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setLpData(Result);
            setGetMultifilters([]);
            setUnClicked(false);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getBrands.length > 0) &
        (getRam.length == 0) &
        (getStorage.length === 0) &
        (getPrice.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/names?brand=${getBrands.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            //setWdata(result);
            setFridgeData(result);
            cpygetbrands.push(result);
            setCpyGetBrandsLength(getBrands);
            setGetBrands([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getRam.length > 0) &
        (getBrands.length == 0) &
        (getPrice.length == 0) &
        (getStorage.length == 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/functionality?types=${getRam.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setFridgeData(result);
            setCpyGetRamsLength(getRam);
            setGetRam([]);
            setShowFilters(false);

            setGetMultifilters([]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getStorage.length > 0) &
        (getRam.length === 0) &
        (getPrice.length === 0) &
        (getBrands.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/capacity?storage=${getStorage.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setFridgeData(result);
            setCpyGetStorageLength(
              getStorage.length > 2 ? getStorage.slice(0, 2) : getStorage
            );
            setGetStorage([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
          `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/Price?price=${getPrice.join()}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setFridgeData(Result);
            setCpyGetPriceLength(getPrice);
            setGetPrice([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })

          .catch((error) => {
            console.log(error);
          });
      }
    } else if (tvData.length > 1) {
      if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length === 0) &
        (getBrands.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/televisions/sort/Brands/names/func?names=${
            screenQuality.includes(getMultifilters[0]) == true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&func=${
            screenQuality.includes(getMultifilters[1]) == true
              ? getMultifilters[1]
              : getMultifilters[0]
          }`
        )
          .then((res) => res.json())
          .then((Result) => {
            setTvData(Result);
            setGetMultifilters([]);
            setUnClicked((prev) => !prev);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getStorage.length > 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/televisions/sort/Brands/names/func/capacity?names=${
            screenQuality.includes(getMultifilters[0]) === true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&func=${
            screenQuality.includes(getMultifilters[1]) === true
              ? getMultifilters[1]
              : getMultifilters[0]
          }&cap=${getStorage.join()}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setTvData(Result);
            setGetMultifilters([]);
            setUnClicked(false);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getBrands.length > 0) &
        (getRam.length == 0) &
        (getStorage.length === 0) &
        (getPrice.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/televisions/sort/Brands/names?brand=${getBrands.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setTvData(result);
            cpygetbrands.push(result);
            setCpyGetBrandsLength(getBrands);
            setGetBrands([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getRam.length > 0) &
        (getBrands.length == 0) &
        (getPrice.length == 0) &
        (getStorage.length == 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/televisions/sort/Brands/quality?types=${getRam.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setTvData(result);
            setCpyGetRamsLength(getRam);
            setGetRam([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getStorage.length > 0) &
        (getRam.length === 0) &
        (getPrice.length === 0) &
        (getBrands.length === 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/televisions/sort/Brands/size?storage=${getStorage.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setTvData(result);
            setCpyGetStorageLength(
              getStorage.length > 2 ? getStorage.slice(0, 2) : getStorage
            );
            setGetStorage([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
          `http://192.168.43.29:4000/api/main/televisions/sort/Brands/Price?price=${getPrice.join()}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setTvData(Result);
            setCpyGetPriceLength(getPrice);
            setGetPrice([]);
            setShowFilters(false);

            setGetMultifilters([]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (tabletData.length > 1) {
      if (
        (getMultifilters.length > 1) &
        (getRam.length > 0) &
        (getBrands.length > 0) &
        (getStorage.length == 0) &
        (getPrice.length == 0)
      ) {
        const getnames = getMultifilters.join();

        fetch(
          `http://192.168.43.29:4000/api/main/tablets/sort/Brands/names/size?names=${getMultifilters
            .join()
            .replace(/[^a-zA-Z]/g, "")}&rams=${getMultifilters
            .join()
            .replace(/[^\d-]/g, "")}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setTabletData(Result);
            setGetMultifilters([]);
            setUnClicked(false);
            setShowFilters(false);
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

        fetch(
          `http://192.168.43.29:4000/api/main/tablets/sort/Brands/names/ram/storage?name=${getMultifilters
            .join()
            .replace(/[^a-zA-Z]/g, "")}&ram=${getRam}&storage=${getStorage}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setTabletData(Result);
            setUnClicked(false);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if ((getBrands.length > 0) & (getRam.length == 0)) {
        fetch(
          `http://192.168.43.29:4000/api/main/tablets/sort/Brands/names?brand=${getBrands.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setTabletData(result);
            cpygetbrands.push(result);
            setGetMultifilters([]);
            setCpyGetBrandsLength(getBrands);
            setGetBrands([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (
        (getRam.length > 0) &
        (getBrands.length == 0) &
        (getStorage.length == 0) &
        (getPrice.length == 0)
      ) {
        fetch(
          `http://192.168.43.29:4000/api/main/Tablets/sort/Brands/Size?Size=${getRam.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setTabletData(result);
            setCpyGetRamsLength(
              getRam.length > 2 ? getRam.slice(0, 2) : getRam
            );
            setGetRam([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
          `http://192.168.43.29:4000/api/main/tablets/sort/Brands/storage?storage=${getStorage.join()}`
        )
          .then((res) => res.json())
          .then((result) => {
            setTabletData(result);
            setCpyGetStorageLength(getStorage);
            setGetStorage([]);
            setGetMultifilters([]);
            setShowFilters(false);
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
          `http://192.168.43.29:4000/api/main/tablets/sort/Brands/Price?price=${getPrice.join()}`
        )
          .then((res) => res.json())
          .then((Result) => {
            setTabletData(Result);
            setCpyGetPriceLength(getPrice);
            setGetPrice([]);
            setGetMultifilters([]);
            setShowFilters(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      <ScrollView scrollEnabled={showFilters === true ? false : true}>
        <StatusBar backgroundColor={"rgb(20,20,20)"} barStyle="light-content" />
        <View>
          <Header
            name={
              intake == "mobiles"
                ? "Mobiles"
                : String(intake).includes("Mobiles")
                ? "Mobiles"
                : intake == "Laptops"
                ? "Laptops"
                : String(intake).includes("Laptops")
                ? "Laptops"
                : intake == "Wmachine"
                ? "Washing Machines"
                : String(intake).includes("Wmachine")
                ? "Washing Machines"
                : intake === "Fridge"
                ? "Refrigerators"
                : String(intake).includes("Fridge")
                ? "Refrigerators"
                : String(intake).includes("Refrigerator")
                ? "Refrigerators"
                : intake === "Tvs"
                ? "Televisions"
                : String(intake).includes("Tv")
                ? "Televisions"
                : String(intake).includes("Televisions")
                ? "Televisions"
                : intake === "Tablets"
                ? "Tablets"
                : String(intake).includes("Tablets")
                ? "Tablets"
                : null
            }
          />
          <View style={styles.header}>
            <MaterialIcon
              name="arrow-back-ios"
              color="white"
              //fontsize={50}
              style={styles.backIcon}
              onPress={() => {
                navigation.navigate("Home"),
                  smData.length > 0
                    ? setSmData("")
                    : lpData.length > 0
                    ? setLpData("")
                    : null;
              }}
            />
            <TextInput
              onChangeText={setSearch}
              value={search}
              placeholder="Search"
              placeholderTextColor={"white"}
              style={styles.searchInput}
              onFocus={() => {
                setPath(intake);
                navigation.navigate("Search");
              }}
            />
            <MaterialIcon
              name="local-mall"
              color="white"
              //fontsize={54}
              style={styles.cartIcon}
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
                marginTop: -40,
                marginRight: -13,
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {items.length}
            </Text>
          </View>
          <View style={styles.sortDrawer}>
            <TouchableOpacity
              onPress={() => {
                setShowCart(!showCart);
              }}
            >
              <View style={styles.sortIcon}>
                <Icon name="sort" color="rgb(0,0,0)" style={styles.icons} />
                <Text
                  style={{
                    fontSize: 18,
                    color: "rgb(0,0,0)",
                  }}
                >
                  Sort
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowFilters(!showFilters);
              }}
            >
              <View style={styles.sortRIcon}>
                <Icon
                  name="filter"
                  color="rgb(20,20,20)"
                  style={styles.icons}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: "rgb(0,0,0)",
                  }}
                >
                  Filter
                </Text>
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
              borderBottomWidth: 1,
              borderBottomColor: "rgb(20,20,20)",
              //borderRadius: 50,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
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
                  if (smData.length > 1) {
                    smData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(true);
                      setSortType("Price:Low to High");
                      return a.Sprice - b.Sprice;
                    });
                  } else if (lpData.length > 1) {
                    lpData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(true);
                      setSortType("Price:Low to High");
                      return a.LPprice - b.LPprice;
                    });
                  } else if (wdata.length > 1) {
                    wdata.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(true);
                      setSortType("Price:Low to High");
                      return a.Wprice - b.Wprice;
                    });
                  } else if (fridgeData.length > 1) {
                    fridgeData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(true);
                      setSortType("Price:Low to High");
                      return a.Rfprice - b.Rfprice;
                    });
                  } else if (tvData.length > 1) {
                    tvData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(true);
                      setSortType("Price:Low to High");
                      return a.Tvprice - b.Tvprice;
                    });
                  } else if (tabletData.length > 1) {
                    tabletData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(true);
                      setSortType("Price:Low to High");
                      return a.Tbprice - b.Tbprice;
                    });
                  }
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
                  if (smData.length > 1) {
                    smData.sort((a, b) => {
                      setShowCart(false);
                      setSortType("");
                      setShowRemover(false);
                      return a.ProductId - b.ProductId;
                    });
                  } else if (lpData.length > 1) {
                    lpData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(false);
                      return a.ProductId - b.ProductId;
                    });
                  } else if (wdata.length > 1) {
                    wdata.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(false);
                      return a.ProductId - b.ProductId;
                    });
                  } else if (fridgeData.length > 1) {
                    fridgeData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(false);
                      return a.ProductId - b.ProductId;
                    });
                  } else if (tvData.length > 1) {
                    tvData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(false);
                      return a.ProductId - b.ProductId;
                    });
                  } else if (tabletData.length > 1) {
                    tabletData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(false);
                      return a.ProductId - b.ProductId;
                    });
                  }
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
                  if (smData.length > 1) {
                    smData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(false);
                      setSortType("Price:High to Low");
                      return b.Sprice - a.Sprice;
                    });
                  } else if (lpData.length > 1) {
                    lpData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(false);
                      setSortType("Price:High to Low");
                      return b.LPprice - a.LPprice;
                    });
                  } else if (wdata.length > 1) {
                    wdata.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(false);
                      setSortType("Price:High to Low");
                      return b.Wprice - a.Wprice;
                    });
                  } else if (fridgeData.length > 1) {
                    fridgeData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(false);
                      setSortType("Price:High to Low");
                      return b.Rfprice - a.Rfprice;
                    });
                  } else if (tvData.length > 1) {
                    tvData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(false);
                      setSortType("Price:High to Low");
                      return b.Tvprice - a.Tvprice;
                    });
                  } else if (tabletData.length > 1) {
                    tabletData.sort((a, b) => {
                      setShowCart(false);
                      setShowRemover(true);
                      setSortLowtoHigh(false);
                      setSortType("Price:High to Low");
                      return b.Tbprice - a.Tbprice;
                    });
                  }
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
              <TouchableOpacity
                onPress={() => {
                  if (smData.length > 1) {
                    smData.sort((a, b) => {
                      setShowCart(false);
                      setSortType("Relevance");
                      setShowRemover(false);
                      return b.S_rating - a.S_rating;
                    });
                  } else if (lpData.length > 1) {
                    lpData.sort((a, b) => {
                      setShowCart(false);
                      setSortType("Relevance");
                      setShowRemover(false);
                      return b.S_rating - a.S_rating;
                    });
                  } else if (wdata.length > 1) {
                    wdata.sort((a, b) => {
                      setShowCart(false);
                      setSortType("Relevance");
                      setShowRemover(false);
                      return b.S_rating - a.S_rating;
                    });
                  } else if (fridgeData.length > 1) {
                    fridgeData.sort((a, b) => {
                      setShowCart(false);
                      setSortType("Relevance");
                      setShowRemover(false);
                      return b.S_rating - a.S_rating;
                    });
                  } else if (tvData.length > 1) {
                    tvData.sort((a, b) => {
                      setShowCart(false);
                      setSortType("Relevance");
                      setShowRemover(false);
                      return b.S_rating - a.S_rating;
                    });
                  } else if (tabletData.length > 1) {
                    tabletData.sort((a, b) => {
                      setShowCart(false);
                      setSortType("Relevance");
                      setShowRemover(false);
                      return b.S_rating - a.S_rating;
                    });
                  }
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
                if (smData.length > 1) {
                  smData.sort((a, b) => {
                    setSortType("Relevance");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                } else if (lpData.length > 1) {
                  lpData.sort((a, b) => {
                    setSortType("Relevance");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                } else if (wdata.length > 1) {
                  wdata.sort((a, b) => {
                    setSortType("Relevance");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                } else if (fridgeData.length > 1) {
                  fridgeData.sort((a, b) => {
                    setShowRemover(false);
                    setSortType("Relevance");
                    return a.ProductId - b.ProductId;
                  });
                } else if (tvData.length > 1) {
                  tvData.sort((a, b) => {
                    setShowRemover(false);
                    setSortType("Relevance");
                    return a.ProductId - b.ProductId;
                  });
                } else if (tabletData.length > 1) {
                  tabletData.sort((a, b) => {
                    setShowRemover(false);
                    setSortType("Relevance");
                    return a.ProductId - b.ProductId;
                  });
                }
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
                if (smData.length > 1) {
                  smData.sort((a, b) => {
                    setSortType("Relevance");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                } else if (lpData.length > 1) {
                  lpData.sort((a, b) => {
                    setSortType("Relevance");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                } else if (wdata.length > 1) {
                  wdata.sort((a, b) => {
                    setSortType("Relevance");
                    setShowRemover(false);
                    return a.ProductId - b.ProductId;
                  });
                } else if (fridgeData.length > 1) {
                  fridgeData.sort((a, b) => {
                    setShowRemover(false);
                    setSortType("Relevance");
                    return a.ProductId - b.ProductId;
                  });
                } else if (tvData.length > 1) {
                  tvData.sort((a, b) => {
                    setShowRemover(false);
                    setSortType("Relevance");
                    return a.ProductId - b.ProductId;
                  });
                } else if (tabletData.length > 1) {
                  tabletData.sort((a, b) => {
                    setShowRemover(false);
                    setSortType("Relevance");
                    return a.ProductId - b.ProductId;
                  });
                }
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
              //backgroundColor: "red",
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
              //backgroundColor: "red",
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
              if (cpygetBrandslength.length === 2) {
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
                    }}
                    onPress={() => {
                      smData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setSmData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : lpData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/laptops/sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setLpData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : wdata.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setWdata(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((Err) => {
                              console.log(Err);
                            })
                        : fridgeData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setFridgeData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((Err) => {
                              console.log(Err);
                            })
                        : tvData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/televisions/sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTvData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((Err) => {
                              console.log(Err);
                            })
                        : tabletData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/tablets/sort/Brands/sName/rNames?sName=${pars}&rName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTabletData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : null;
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
                    }}
                    onPress={() => {
                      smData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setSmData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : lpData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/laptops/sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setLpData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : wdata.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setWdata(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : fridgeData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setFridgeData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tvData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/televisions/sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTvData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tabletData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/tablets/sort/Brands/seName/reNames?seName=${pars}&reName=${cpygetBrandslength
                              .join()
                              .replace(pars, "")}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTabletData(Result);
                              setCpyGetBrandsLength(
                                cpygetBrandslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : null;
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
                      minWidth: 100,
                      maxWidth: 180,
                      height: 30,
                      backgroundColor: "rgb(0,0,0)",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      position: "relative",
                    }}
                    onPress={() => {
                      smData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/RAM/sName/rNames?sName=${pars}&rName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setSmData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : lpData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/laptops/sort/Brands/RAM/sName/rNames?sName=${pars}&rName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setLpData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : wdata.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/func/sName/rNames?sName=${pars}&rName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setWdata(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : fridgeData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/func/sName/rNames?sName=${pars}&rName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setFridgeData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tvData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/televisions/sort/Brands/func/sName/rNames?sName=${pars}&rName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTvData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tabletData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/tablets/sort/Brands/Size/sName/rNames?sName=${pars}&rName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTabletData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : null;
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
                      {pars ^ (0 == pars)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("")}
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
                      smData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/RAM/seName/reNames?seName=${pars}&reName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setSmData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : lpData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/laptops/sort/Brands/RAM/seName/reNames?seName=${pars}&reName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setLpData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tvData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/televisions/sort/Brands/func/seName/reNames?seName=${pars}&reName=${cpygetRamslength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTvData(Result);
                              setCpyGetRamsLength(
                                cpygetRamslength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : null;
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
                      {/*{pars ^ (0 == pars)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("")}*/}
                      {pars ^ (0 == pars)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("")}
                    </Text>
                  </TouchableOpacity>
                );
              } else if (cpygetRamslength.length === 1) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      flexDirection: "row",

                      minWidth: 100,
                      maxWidth: 130,
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
                      {pars ^ (0 == pars)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : tabletData.length > 0
                        ? pars + "Inch"
                        : String(pars).replace(/"/g, "").concat("")}
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
                      smData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/smartphones//sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
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
                            })
                        : lpData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/laptops/sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setLpData(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : wdata.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/wmachines/sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setWdata(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : fridgeData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/Refrigerators/sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setFridgeData(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tvData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/televisions/sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTvData(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : tabletData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/tablets/sort/Brands/Storage/sName/rNames?sName=${pars}&rName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTabletData(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : null;
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
                      {pars ^ (0 == pars)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("")}
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
                      {pars ^ (0 == true)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : String(pars).replace(/"/g, "").concat("")}
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
                      smData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/smartphones/sort/Brands/Storage/seName/reNames?seName=${pars}&reName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
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
                            })
                        : lpData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/laptops/sort/Brands/Storage/seName/reNames?seName=${pars}&reName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setLpData(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : wdata.length > 0
                        ? Regain()
                        : tabletData.length > 0
                        ? fetch(
                            `http://192.168.43.29:4000/api/main/tablets/sort/Brands/Storage/seName/reNames?seName=${pars}&reName=${cpygetStoragelength.filter(
                              (e) => e !== pars
                            )}`
                          )
                            .then((res) => res.json())
                            .then((Result) => {
                              setTabletData(Result);
                              setCpyGetStorageLength(
                                cpygetStoragelength.filter((e) => e !== pars)
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            })
                        : null;
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
                      {pars ^ (0 == true)
                        ? String(pars).replace(/"/g, "").concat("GB")
                        : setUnClicked(false)}
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
              height: 40,
              paddingLeft: 10,
              alignItems: "center",
              backgroundColor: "white",
              borderBottomColor: "rgb(20,20,20)",
              borderBottomWidth: 1,
              display: showFilters ? "flex" : "none",
            }}
          >
            <Icon name="filter" color="gray" style={styles.filterIcon} />
            <Text style={styles.filtername}>Filters</Text>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              height: 380,
              //maxHeight: 600,
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
                style={{
                  backgroundColor: "#e7e7e7",
                  color: "red",
                  flexDirection: "row",
                }}
                onPress={() => setDefaultNames("Brand")}
              >
                <Text
                  style={{
                    width: Dimensions.get("window").width / 3,
                    //height: 100,
                    textAlign: "center",
                    color: defaultNames == "Brand" ? "black" : "white",
                    paddingTop: 6,
                    paddingBottom: 6,
                    fontSize: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    backgroundColor:
                      defaultNames == "Brand" ? "#e7e7e7" : "rgb(0,0,5)",
                  }}
                >
                  Brand{" "}
                </Text>
                <View
                  style={{
                    color: "black",
                    backgroundColor: "#4abf18",
                    marginTop: -4,
                    width: 8,
                    height: 8,
                    //fontSize: 17,
                    //borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetBrandslength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#e7e7e7",
                  color: "red",
                  flexDirection: "row",
                }}
                onPress={() => setDefaultNames("RAM")}
              >
                <Text
                  style={{
                    width: Dimensions.get("window").width / 3,
                    //height: 100,
                    textAlign: "center",
                    color: defaultNames == "RAM" ? "black" : "white",
                    paddingTop: 6,
                    paddingBottom: 6,
                    fontSize: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    backgroundColor:
                      defaultNames == "RAM" ? "#e7e7e7" : "rgb(0,0,5)",
                  }}
                >
                  {wdata.length > 0
                    ? "Functionality"
                    : fridgeData.length > 0
                    ? "Defrosting Type"
                    : tvData.length > 0
                    ? "Resolution"
                    : tabletData.length > 0
                    ? "Screen Size"
                    : "RAM"}
                </Text>
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
                    //borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetRamslength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#e7e7e7",
                  color: "red",
                  flexDirection: "row",
                }}
                onPress={() => setDefaultNames("Storage")}
              >
                <Text
                  style={{
                    width: Dimensions.get("window").width / 3,
                    //height: 100,
                    textAlign: "center",
                    color: defaultNames == "Storage" ? "black" : "white",
                    paddingTop: 6,
                    paddingBottom: 6,
                    fontSize: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    backgroundColor:
                      defaultNames == "Storage" ? "#e7e7e7" : "rgb(0,0,5)",
                  }}
                >
                  {wdata.length > 0
                    ? "Capacity"
                    : tvData.length > 0
                    ? "Screen Size"
                    : "Storage"}
                </Text>
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
                    //borderWidth: 1,
                    borderRadius: 50,
                    display: cpygetStoragelength.length > 0 ? "flex" : "none",
                  }}
                ></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#e7e7e7",
                  color: "red",
                  flexDirection: "row",
                }}
                onPress={() => {
                  setDefaultNames("Price"), setShowPrice(!showprice);
                }}
              >
                <Text
                  style={{
                    width: Dimensions.get("window").width / 3,
                    //height: 100,
                    textAlign: "center",
                    color: defaultNames == "Price" ? "black" : "white",
                    paddingTop: 6,
                    paddingBottom: 6,
                    fontSize: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    backgroundColor:
                      defaultNames == "Price" ? "#e7e7e7" : "rgb(0,0,5)",
                  }}
                >
                  Price
                </Text>
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
                    //borderWidth: 1,
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
                height: 380,
                flex: 1,
                //justifyContent: "space-evenly",
                alignItems: "center",

                display: defaultNames === "Brand" ? "flex" : "none",
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexGrow: 1,
                  //flex: 1,
                }}
              >
                {brandName.map((paras, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      //style={styles.firstFilterDiv}
                      onPress={() => {
                        getNames(paras.Sbrand), getKeys(index);
                      }}
                      style={{
                        width: 100,
                        marginTop: 10,
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
              </ScrollView>
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
              {smData.length > 0
                ? smRAMoptions.map((rams, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getRAM(rams)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 8,
                          }}
                        >
                          {rams + "GB"}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : lpData.length > 0
                ? lpRAMoptions.map((rams, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getRAM(rams)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 8,
                          }}
                        >
                          {rams + "GB"}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : wdata.length > 0
                ? functionality.map((func, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getRAM(func)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 8,
                            textAlign: "center",
                          }}
                        >
                          {func}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : fridgeData.length > 0
                ? fridgeFunctionality.map((func, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getRAM(func)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 8,
                            textAlign: "center",
                          }}
                        >
                          {func}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : tvData.length > 0
                ? screenQuality.map((func, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getRAM(func)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 8,
                            textAlign: "center",
                          }}
                        >
                          {func}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : tabletData.length > 0
                ? tbScreenSize.map((storages, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getRAM(storages)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {storages ? storages + "Inch" : null}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
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
              {smData.length > 0
                ? storageoptions.map((params, indice) => {
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
                  })
                : lpData.length > 0
                ? lpStorageoptions.map((storages, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getStoragelist(storages)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {storages < 10 ? storages + "TB" : storages + "GB"}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : wdata.length > 0
                ? wCapacity.map((storages, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getStoragelist(storages)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {storages ? "< " + storages : null}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : fridgeData.length > 0
                ? fridgeCapacity.map((storages, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getStoragelist(storages)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {storages ? "< " + storages : null}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : tvData.length > 0
                ? screenSize.map((storages, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getStoragelist(storages)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {storages ? storages : null}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : tabletData.length > 0
                ? tabStorageoptions.map((params, indice) => {
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
                  })
                : null}
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
              {smData.length > 0
                ? priceoptions.map((params, indice) => {
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
                  })
                : lpData.length > 0
                ? lpPriceOptions.map((price, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getPricelist(price)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {"< " +
                            parseInt(price)
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
                  })
                : wdata.length > 0
                ? wPriceOptions.map((price, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getPricelist(price)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {"< " +
                            parseInt(price)
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
                  })
                : fridgeData.length > 0
                ? fridgePriceOptions.map((price, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getPricelist(price)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {"< " +
                            parseInt(price)
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
                  })
                : tvData.length > 0
                ? tvPrice.map((price, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getPricelist(price)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {"< " +
                            parseInt(price)
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
                  })
                : tabletData.length > 0
                ? tbPriceOptions.map((price, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.firstFilterDiv}
                        onPress={() => getPricelist(price)}
                      >
                        <Text
                          style={{
                            color: "white",
                            marginTop: 9,
                            marginBottom: 9,
                          }}
                        >
                          {"< " +
                            parseInt(price)
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
                  })
                : null}
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
              smData.length > 0 ? (
                <Modal data={smData.slice(0, pages)} />
              ) : lpData.length > 0 ? (
                <Modal data={lpData.slice(0, pages)} />
              ) : wdata.length > 0 ? (
                <Modal data={wdata.slice(0, pages)} />
              ) : fridgeData.length > 0 ? (
                <Modal data={fridgeData.slice(0, pages)} />
              ) : tvData.length > 0 ? (
                <Modal data={tvData.slice(0, pages)} />
              ) : tabletData.length > 0 ? (
                <Modal data={tabletData.slice(0, pages)} />
              ) : null
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
              display:
                pages <= smData.length
                  ? "flex"
                  : pages <= lpData.length
                  ? "flex"
                  : "none",
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
    fontSize: 32,
  },

  cartIcon: {
    position: "absolute",
    fontSize: 30,
    marginLeft: 9,
    marginRight: 0,
    right: "3.5%",
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
    backgroundColor: "#343a40",
    color: "rgba(255,255,255,0.95)",
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
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
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
  filtername: {
    width: 100,
    fontSize: 22,
    color: "rgb(0,0,0)",
  },
  filterIcon: {
    fontSize: 22,
    color: "rgb(0,0,0)",
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

export default ListView;
