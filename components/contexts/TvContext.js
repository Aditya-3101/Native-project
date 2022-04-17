import React from "react";
import { useState, createContext } from "react";

export const Tvcontext = createContext();

export const TvProvider = (props) => {
  const [tvData, setTvData] = useState([]);
  return (
    <Tvcontext.Provider value={[tvData, setTvData]}>
      {props.children}
    </Tvcontext.Provider>
  );
};
