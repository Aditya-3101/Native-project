import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home/Home";
import StackNavigator from "./components/StackNavigator";
import { MobileProvider } from "./components/contexts/MobileContext";
import { SortPhonesProvider } from "./components/contexts/SphonesContext";

const App = () => {
  return (
    <NavigationContainer>
      <SortPhonesProvider>
        <MobileProvider>
          <StackNavigator />
        </MobileProvider>
      </SortPhonesProvider>
    </NavigationContainer>
  );
};
export default App;
