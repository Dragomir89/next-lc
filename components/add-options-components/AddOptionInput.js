"use client";
import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../../utils/requests";
import CustomAlert from "../common/CustomAlert";
import { CircularProgressContext } from "../../context/CircularProgressContext";

function AddOptionInput({ btnText, label, optionType }) {
  const { showProgressAction, hideProgressAction } = useContext(
    CircularProgressContext
  );
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const initialAlertData = {
    severity: "success",
    message: "Успешно добавяне",
    show: false,
  };
  const [alertData, setAlertData] = useState(initialAlertData);
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
        const alertData = {
          severity: "error",
          message: "Възникна Грешка",
          show: true,
        };
        setAlertData(alertData);
        hideProgressAction();
        setErrorMsg(data.errorMessage);
      } else {
        const alertData = {
          severity: "success",
          message: "Успешно добавяне",
          show: true,
        };

        setAlertData(alertData);
        hideProgressAction();
        setErrorMsg("");
        setInputVal("");
      }
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <CustomAlert {...alertData} setAlertData={setAlertData} />
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
