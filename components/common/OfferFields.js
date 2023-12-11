import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DropdownFields from "../../components/common/DropdownFields";

const OfferFields = ({
  info,
  propertyOwnerName,
  hasErrorConstructionType,
  onChangeAutocomplete,
  constructionType,
  constructionTypes,
  hasErrorPropertyType,
  propertyTypes,
  propertyType,
  hasErrorState,
  states,
  state,
  hasErrorNeighborhood,
  neighborhoods,
  neighborhood,
  phoneNumber,
  onChangeInput,
  phoneNumber2,
  phoneNumber3,
  address,
  area,
  price,
  floor,
  description,
  lastCall,
  setLastCall,
  nextCall,
  setNextCall,
}) => {
  const fieldPadding = "5px";
  return (
    <>
      <DropdownFields
        hasErrorConstructionType={hasErrorConstructionType}
        onChangeAutocomplete={onChangeAutocomplete}
        constructionType={constructionType}
        constructionTypes={constructionTypes}
        hasErrorPropertyType={hasErrorPropertyType}
        propertyTypes={propertyTypes}
        propertyType={propertyType}
        hasErrorState={hasErrorState}
        states={states}
        state={state}
        hasErrorNeighborhood={hasErrorNeighborhood}
        neighborhoods={neighborhoods}
        neighborhood={neighborhood}
      />

      <div style={{ display: "flex" }}>
        <div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              id={"phoneNumber"}
              style={{ marginBottom: "5px" }}
              label={"Телефон 1"}
              fullWidth
              value={phoneNumber}
              onChange={onChangeInput}
            />
          </div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              style={{ marginBottom: "5px" }}
              id="phoneNumber2"
              label={"Телефон 2"}
              fullWidth
              value={phoneNumber2}
              onChange={onChangeInput}
            />
          </div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              style={{ marginBottom: "5px" }}
              id="phoneNumber3"
              label={"Телефон 3"}
              fullWidth
              value={phoneNumber3}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              style={{ marginBottom: "5px" }}
              id="address"
              label={"Адрес"}
              fullWidth
              onChange={onChangeInput}
              value={address}
            />
          </div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              type="number"
              style={{ marginBottom: "5px" }}
              id="area"
              label={"Квадратура"}
              fullWidth
              value={area}
              onChange={onChangeInput}
            />
          </div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              type="number"
              style={{ marginBottom: "5px" }}
              id="price"
              label={"\u20AC Цена"}
              fullWidth
              value={price}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              type="number"
              style={{ marginBottom: "5px" }}
              id="floor"
              label={"Етаж"}
              fullWidth
              value={floor}
              onChange={onChangeInput}
            />
          </div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              style={{ marginBottom: "5px" }}
              id="propertyOwnerName"
              label={"Име на собственик"}
              fullWidth
              value={propertyOwnerName}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <TextField
              style={{ marginBottom: "5px" }}
              id="description"
              label={"Описание"}
              fullWidth
              value={description}
              onChange={onChangeInput}
            />
          </div>
          <div style={{ padding: fieldPadding, width: "300px" }}>
            <Textarea
              value={info}
              minRows={5}
              onChange={(e) => {
                e.target.id = "info";
                console.log(e.target.class);
                console.log(e.target.value);
                onChangeInput(e);
              }}
              placeholder="Допълнително описание"
              sx={{
                "&::before": {
                  border: "1.5px solid var(--Textarea-focusedHighlight)",
                  transform: "scaleX(0)",
                  left: "2.5px",
                  right: "2.5px",
                  bottom: 0,
                  top: "unset",
                  transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                  borderRadius: 0,
                  borderBottomLeftRadius: "64px 20px",
                  borderBottomRightRadius: "64px 20px",
                },
                "&:focus-within::before": {
                  transform: "scaleX(1)",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: fieldPadding, display: "flex" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ marginBottom: "5px" }}>
            <DatePicker
              value={lastCall}
              onChange={setLastCall}
              className="test"
              label={"Последно Обаждане"}
              openTo="month"
              views={["year", "month", "day"]}
            />
          </div>
          <div style={{ marginBottom: "5px", marginLeft: "10px" }}>
            <DatePicker
              value={nextCall}
              onChange={setNextCall}
              className="test"
              label={"Следващо Обаждане"}
              openTo="month"
              views={["year", "month", "day"]}
            />
          </div>
        </LocalizationProvider>
      </div>
    </>
  );
};

export default OfferFields;
