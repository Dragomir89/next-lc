import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { postRequest } from "../../utils/requests";

function AddOptionInput({ btnText, label, optionType }) {
  const [inputVal, setInputVal] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);

  const onchangeInput = (event) => {
    setInputVal(event.target.value);
  };

  const onClickBtn = () => {
    setOpen(true);
    const newOption = {
      optionType,
      value: inputVal,
    };
    postRequest("/api/post-add-option", newOption).then((data) => {
      if (data.errorMessage) {
        setOpen(false);
        setErrorMsg(data.errorMessage);
      } else {
        setOpen(false);
        setErrorMsg("");
        setInputVal("");
      }
    });
  };

  return (
    <div style={{ padding: "10px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
