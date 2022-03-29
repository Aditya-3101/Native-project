import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home/Home";
import StackNavigator from "./components/StackNavigator";
import { MobileProvider } from "./components/contexts/MobileContext";
import { LaptopProvider } from "./components/contexts/LaptopContext";
import { SortPhonesProvider } from "./components/contexts/SphonesContext";
import { DetailProvider } from "./components/contexts/DetailContext";
import { CartProvider } from "./components/contexts/Getcart";
import { IntakeProvider } from "./components/contexts/Intake";
import { WmacProvider } from "./components/contexts/WmachineContext";

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <IntakeProvider>
          <LaptopProvider>
            <SortPhonesProvider>
              <MobileProvider>
                <WmacProvider>
                  <DetailProvider>
                    <StackNavigator />
                  </DetailProvider>
                </WmacProvider>
              </MobileProvider>
            </SortPhonesProvider>
          </LaptopProvider>
        </IntakeProvider>
      </CartProvider>
    </NavigationContainer>
  );
};
export default App;
