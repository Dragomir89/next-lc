"use client";
import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { CircularProgressContext } from "../../context/CircularProgressContext";

const ProgressSpinner = () => {
  const { showProgress } = useContext(CircularProgressContext);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={showProgress}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default ProgressSpinner;
