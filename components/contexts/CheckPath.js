import React from "react";
import { useState, createContext } from "react";

export const PathContext = createContext();

export const PathProvider = (props) => {
  const [path, setPath] = useState();
  return (
    <PathContext.Provider value={[path, setPath]}>
      {props.children}
    </PathContext.Provider>
  );
};
