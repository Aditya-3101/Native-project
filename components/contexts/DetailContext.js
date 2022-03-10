import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const DetailContext = createContext();

export const DetailProvider = (props) => {
  const [selected, setSelected] = useState();
  return (
    <DetailContext.Provider value={[selected, setSelected]}>
      {props.children}
    </DetailContext.Provider>
  );
};
