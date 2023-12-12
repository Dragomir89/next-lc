"use client";

import React, { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = { show: false, severity: "", message: "" };

  const [alertData, setAlertData] = useState(initialState);

  const hideAlertAction = () => {
    setAlertData((prevState) => {
      return {
        ...prevState,
        show: false,
      };
    });
  };

  const addedAction = () => {
    setAlertData({
      severity: "success",
      message: "Успешно добавяне",
      show: true,
    });
  };

  const addedOfferAction = () => {
    setAlertData({
      severity: "success",
      message: "Успешно добавихте оферта",
      show: true,
    });
  };

  const showErrorAction = () => {
    setAlertData({
      severity: "error",
      message: "Възникна грешка",
      show: true,
    });
  };

  const savedChangesAction = () => {
    setAlertData({
      severity: "warning",
      message: "Промените бяха запазени",
      show: true,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alertData,
        addedOfferAction,
        addedAction,
        showErrorAction,
        savedChangesAction,
        hideAlertAction,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
