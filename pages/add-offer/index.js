import { useState } from "react";
import { Button, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getRequest, postRequest } from "../../utils/requests";
import { addLabelToDropdownFields } from "../../utils/functions";
import DropdownFields from "../../components/common/DropdownFields";

function AddOfferPage({ options }) {
  const [constructionType, setConstructionTypes] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [state, setStates] = useState(null);
  const [neighborhood, setNeighborhoods] = useState(null);

  const [hasErrorConstructionType, setHasErrorConstructionType] =
    useState(false);
  const [hasErrorPropertyType, setHasErrorPropertyType] = useState(false);
  const [hasErrorState, setHasErrorState] = useState(false);
  const [hasErrorNeighborhood, setHasErrorNeighborhood] = useState(false);

  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [phoneNumber3, setPhoneNumber3] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [floor, setFloor] = useState("");
  const [propertyOwnerName, setPropertyOwnerName] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [lastCall, setLastCall] = useState(dayjs(new Date()));
  const [nextCall, setNextCall] = useState(dayjs(new Date()));

  const { constructionTypes, neighborhoods, propertyTypes, states } = options;

  const fieldPadding = "5px";

  const onChangeAutocomplete = (e, values) => {
    if (!e) {
      return;
    }
    const id = e.target.id.split("-")[0];
    switch (id) {
      case "constructionType":
        setConstructionTypes(values);
        break;
      case "propertyType":
        setPropertyType(values);
        break;
      case "state":
        setStates(values);
        break;
      case "neighborhood":
        setNeighborhoods(values);
        break;
    }
  };

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "phoneNumber":
        setphoneNumber(value);
        break;
      case "phoneNumber2":
        setPhoneNumber2(value);
        break;
      case "phoneNumber3":
        setPhoneNumber3(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "area":
        setArea(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "floor":
        setFloor(value);
        break;
      case "propertyOwnerName":
        setPropertyOwnerName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "info":
        console.log("INFO = ", value);
        setInfo(value);
        break;
      default:
        break;
    }
  };

  const resetForm = () => {
    setHasErrorConstructionType(false);
    setHasErrorPropertyType(false);
    setHasErrorState(false);
    setHasErrorNeighborhood(false);

    setConstructionTypes(null);
    setPropertyType(null);
    setStates(null);
    setNeighborhoods(null);
    setphoneNumber("");
    setPhoneNumber2("");
    setPhoneNumber3("");
    setAddress("");
    setArea("");
    setPrice("");
    setFloor("");
    setPropertyOwnerName("");
    setDescription("");
    setInfo("");
    setLastCall(dayjs(new Date()));
    setNextCall(dayjs(new Date()));
  };

  const validateForm = () => {
    let hasError = false;
    if (!constructionType) {
      setHasErrorConstructionType(true);
      hasError = true;
    }
    if (!propertyType) {
      setHasErrorPropertyType(true);
      hasError = true;
    }
    if (!state) {
      setHasErrorState(true);
      hasError = true;
    }
    if (!neighborhood) {
      setHasErrorNeighborhood(true);
      hasError = true;
    }
    return hasError;
  };

  const submitNewOffer = () => {
    if (validateForm()) {
      return;
    }

    const constructionTypeId = constructionTypes.find((e) => {
      return e.label === constructionType;
    })._id;

    const neighborhoodId = neighborhoods.find((e) => {
      return e.label === neighborhood;
    })._id;

    const propertyTypeId = propertyTypes.find((e) => {
      return e.label === propertyType;
    })._id;

    const stateId = states.find((e) => {
      return e.label === state;
    })._id;

    console.log(constructionTypeId);

    postRequest("/api/offer", {
      addedOn: new Date().toISOString(),
      constructionTypeId,
      neighborhoodId,
      propertyTypeId,
      state: stateId,
      phoneNumber,
      phoneNumber2,
      phoneNumber3,
      address,
      area,
      price,
      floor,
      propertyOwnerName,
      description,
      info,
      lastCall,
      nextCall,
    })
      .then((res) => {
        resetForm();
      })
      .catch((e) => {});
  };

  return (
    <div style={{ width: "1170px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Добави оферта</h1>
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
      <div style={{ padding: fieldPadding }}>
        <Button
          onClick={submitNewOffer}
          style={{ width: "290px" }}
          variant="contained"
          color="success"
        >
          Запази
        </Button>
      </div>
    </div>
  );
}

export default AddOfferPage;
export async function getStaticProps(context) {
  let options = await getRequest("/api/get-all-opitions");

  options = addLabelToDropdownFields(options);

  return {
    props: {
      options,
    },
    revalidate: 60,
  };
}
