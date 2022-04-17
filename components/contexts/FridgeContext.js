import React from "react";
import { createContext, useState } from "react";

export const FridgeContext = createContext();

export const FridgeProvider = (props) => {
  const [fridgeData, setFridgeData] = useState([]);

  return (
    <FridgeContext.Provider value={[fridgeData, setFridgeData]}>
      {props.children}
    </FridgeContext.Provider>
  );
};
