import React from "react";
import { useState, createContext } from "react";

export const TabletContext = createContext();

export const TabletProvider = (props) => {
  const [tabletData, setTabletData] = useState([]);
  return (
    <TabletContext.Provider value={[tabletData, setTabletData]}>
      {props.children}
    </TabletContext.Provider>
  );
};
