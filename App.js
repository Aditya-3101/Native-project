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
import { FridgeProvider } from "./components/contexts/FridgeContext";
import { TvProvider } from "./components/contexts/TvContext";
import { TabletProvider } from "./components/contexts/TabletContext";
import { PathProvider } from "./components/contexts/CheckPath";
import { ProfileProvider } from "./components/contexts/ProfileContext";

const App = () => {
  return (
    <NavigationContainer>
      <ProfileProvider>
        <CartProvider>
          <IntakeProvider>
            <PathProvider>
              <TvProvider>
                <FridgeProvider>
                  <LaptopProvider>
                    <SortPhonesProvider>
                      <TabletProvider>
                        <MobileProvider>
                          <WmacProvider>
                            <DetailProvider>
                              <StackNavigator />
                            </DetailProvider>
                          </WmacProvider>
                        </MobileProvider>
                      </TabletProvider>
                    </SortPhonesProvider>
                  </LaptopProvider>
                </FridgeProvider>
              </TvProvider>
            </PathProvider>
          </IntakeProvider>
        </CartProvider>
      </ProfileProvider>
    </NavigationContainer>
  );
};
export default App;
