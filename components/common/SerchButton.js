"use client";

import React, { useContext } from "react";
import { Button } from "@mui/material";
import { CircularProgressContext } from "../../context/CircularProgressContext";
import { styled } from "@mui/material/styles";

const StyledSearchButton = styled(Button)({
  height: "55px",
  width: "240px",
});

const SerchButton = ({ handleClickSearch }) => {
  const { showProgressAction } = useContext(CircularProgressContext);

  return (
    <div style={{ marginTop: "5px" }}>
      <StyledSearchButton
        variant="contained"
        size="large"
        onClick={() => {
          showProgressAction();
          handleClickSearch();
        }}
      >
        ТЪРСИ
      </StyledSearchButton>
    </div>
  );
};

export default SerchButton;
