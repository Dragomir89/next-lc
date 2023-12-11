import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";
const CustomAlert = ({ show, severity, message, setAlertData }) => {
  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={() => {
        setAlertData({ show: false });
      }}
    >
      <Alert
        onClose={() => {
          setAlertData({ show: false });
        }}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
