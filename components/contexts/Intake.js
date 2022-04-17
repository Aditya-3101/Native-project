import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const IntakeContext = createContext();

export const IntakeProvider = (props) => {
  const [intake, setIntake] = useState();

  return (
    <IntakeContext.Provider value={[intake, setIntake]}>
      {props.children}
    </IntakeContext.Provider>
  );
};
