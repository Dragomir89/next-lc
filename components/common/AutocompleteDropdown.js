import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function AutocompleteDropdown({ label, options, onChange, value, id, error }) {
  return (
    <Autocomplete
      id={id}
      value={value}
      onInputChange={onChange}
      style={{ width: "230px" }}
      disablePortal
      options={options}
      sx={{ width: 290 }}
      renderInput={(params) => (
        <TextField {...params} error={error} label={label} />
      )}
    />
  );
}

export default AutocompleteDropdown;
