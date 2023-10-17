import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../../utils/requests";

function AddOptionInput({ btnText, label, optionType }) {
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onchangeInput = (event) => {
    setInputVal(event.target.value);
  };

  const onClickBtn = () => {
    const newOption = {
      optionType,
      value: inputVal,
    };
    postRequest("/api/post-add-option", newOption).then((data) => {
      if (data.errorMessage) {
        setErrorMsg(data.errorMessage);
      } else {
        setErrorMsg("");
        setInputVal("");
      }
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
