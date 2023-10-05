import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";

function AddOptionInput({
  handleClick,
  btnText,
  label,
  existingOptions,
  optionType,
}) {
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onchangeInput = (event) => {
    setInputVal(event.target.value);
  };

  const onClickBtn = () => {
    for (let i = 0; i < existingOptions.length; i++) {
      if (
        existingOptions[i].value.trim().toLocaleLowerCase() ===
        inputVal.trim().toLocaleLowerCase()
      ) {
        setErrorMsg("Тази иопция вече съществува");
        return;
      }
    }
    const newOption = {
      optionType,
      value: inputVal,
    };
    setErrorMsg("");
    handleClick(newOption);
    setInputVal("");
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
