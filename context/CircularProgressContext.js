"use client";

import React, { createContext, useState } from "react";

export const CircularProgressContext = createContext();

export const CircularProgressProvider = ({ children }) => {
  const [showProgress, setShowProgress] = useState(false);

  const showProgressAction = () => {
    setShowProgress(true);
  };

  const hideProgressAction = () => {
    setShowProgress(false);
  };

  return (
    <CircularProgressContext.Provider
      value={{ showProgress, showProgressAction, hideProgressAction }}
    >
      {children}
    </CircularProgressContext.Provider>
  );
};
