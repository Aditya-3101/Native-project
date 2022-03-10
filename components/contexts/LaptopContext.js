import React from "react";
import { useState, createContext } from "react";

export const LaptopContext = createContext();

export const LaptopProvider = (props) => {
  const [lpData, setLpData] = useState([]);

  return (
    <LaptopContext.Provider value={[lpData, setLpData]}>
      {props.children}
    </LaptopContext.Provider>
  );
};
