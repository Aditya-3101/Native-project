import React from "react";
import { createContext, useState } from "react";

export const WmacContext = createContext();

export const WmacProvider = (props) => {
  const [wdata, setWdata] = useState([]);
  return (
    <WmacContext.Provider value={[wdata, setWdata]}>
      {props.children}
    </WmacContext.Provider>
  );
};
