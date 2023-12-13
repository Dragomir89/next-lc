"use client";
import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../../utils/requests";
import CustomAlert from "../common/CustomAlert";
import { CircularProgressContext } from "../../context/CircularProgressContext";
import { AlertContext } from "../../context/AlertContext";

function AddOptionInput({ btnText, label, optionType }) {
  const { showProgressAction, hideProgressAction } = useContext(
    CircularProgressContext
  );
  const { addedAction, showErrorAction } = useContext(AlertContext);

  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onchangeInput = (event) => {
    setInputVal(event.target.value);
  };

  const onClickBtn = () => {
    showProgressAction();
    const newOption = {
      optionType,
      value: inputVal,
    };
    postRequest("/api/post-add-option", newOption).then((data) => {
      if (data.errorMessage) {
        showErrorAction();
        setErrorMsg(data.errorMessage);
      } else {
        addedAction();
        setErrorMsg("");
        setInputVal("");
      }
      hideProgressAction();
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <TextField
        style={{ marginBottom: "5px" }}
        error={!!errorMsg}
        id="outlined-uncontrolled"
        label={label}
        fullWidth
        value={inputVal}
        onChange={onchangeInput}
        helperText={errorMsg}
      />
      <Button variant="outlined" onClick={onClickBtn}>
        {btnText}
      </Button>
    </div>
  );
}

export default AddOptionInput;
