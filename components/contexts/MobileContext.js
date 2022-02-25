import React from "react";
import { useState, createContext } from "react";

export const MobileContext = createContext();

export const MobileProvider = (props) => {
  const [smData, setSmData] = useState([]);

  return (
    <MobileContext.Provider value={[smData, setSmData]}>
      {props.children}
    </MobileContext.Provider>
  );
};
