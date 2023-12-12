"use client";

import React, { useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";
import { AlertContext } from "../../context/AlertContext";
const CustomAlert = () => {
  const { alertData, hideAlertAction } = useContext(AlertContext);

  return (
    <Snackbar
      open={alertData.show}
      autoHideDuration={5000}
      onClose={() => {
        hideAlertAction();
      }}
    >
      <Alert
        onClose={() => {
          hideAlertAction();
        }}
        severity={alertData.severity}
        sx={{ width: "100%" }}
      >
        {alertData.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
