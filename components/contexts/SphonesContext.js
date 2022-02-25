import React from "react";
import { useState, createContext } from "react";

export const SortPhonesContext = createContext();

export const SortPhonesProvider = (props) => {
  const [smbData, setSmbData] = useState([]);
  return (
    <SortPhonesContext.Provider value={[smbData, setSmbData]}>
      {props.children}
    </SortPhonesContext.Provider>
  );
};
