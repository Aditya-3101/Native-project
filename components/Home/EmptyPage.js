import React from "react";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { IntakeContext } from "../contexts/Intake";

const Empty = () => {
  const [intake, setIntake] = useContext(IntakeContext);
  const navigation = useNavigation();

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.backBar}>
        <MaterialIcon
          name="arrow-back-ios"
          style={styles.backHomeIcon}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
      <View style={styles.disError}>
        <Text>{`No data Found for query "${intake}"`}</Text>
        <Image
          source={{
            uri: "https://i.ibb.co/BP6L3Qf/undraw-No-data-re-kwbl.png",
          }}
          style={styles.emptyImg}
        />
        <TouchableWithoutFeedback
          style={styles.gobtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.goback}>Go back to Home</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(255,255,255,0.98)",
    //alignItems: "center",
    //justifyContent: "center",
  },
  emptyImg: {
    width: 200,
    height: 200,
  },
  gobtn: {
    backgroundColor: "rgba(255,255,255,0.99)",
  },
  goback: {
    color: "rgba(30,122,255,0.98)",
  },
  backBar: {
    width: Dimensions.get("window").width,
    height: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  disError: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height - 100,
    width: Dimensions.get("window").width,
  },
  backHomeIcon: {
    width: 35,
    height: 35,
    fontSize: 34,
    marginLeft: 7,
    color: "rgba(0,0,0,0.99)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Empty;
