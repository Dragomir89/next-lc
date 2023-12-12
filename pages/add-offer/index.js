import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { getRequest, postRequest } from "../../utils/requests";
import {
  addLabelToDropdownFields,
  getIdsByLabels,
  validateDropdowns,
} from "../../utils/functions";
import OfferFields from "../../components/common/OfferFields";
import { CircularProgressContext } from "../../context/CircularProgressContext";
import { AlertContext } from "../../context/AlertContext";

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
  const { showProgressAction, hideProgressAction } = useContext(
    CircularProgressContext
  );

  const { addedOfferAction, showErrorAction } = useContext(AlertContext);

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

  const submitNewOffer = () => {
    if (
      validateDropdowns(
        constructionType,
        setHasErrorConstructionType,
        propertyType,
        setHasErrorPropertyType,
        state,
        setHasErrorState,
        neighborhood,
        setHasErrorNeighborhood
      )
    ) {
      return;
    }
    showProgressAction();

    const dropdownsIds = getIdsByLabels(
      constructionTypes,
      constructionType,
      neighborhoods,
      neighborhood,
      propertyTypes,
      propertyType,
      states,
      state
    );

    postRequest("/api/offer", {
      addedOn: new Date().toISOString(),
      constructionTypeId: dropdownsIds.constructionTypeId,
      neighborhoodId: dropdownsIds.neighborhoodId,
      propertyTypeId: dropdownsIds.propertyTypeId,
      state: dropdownsIds.stateId,
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
        hideProgressAction();
        addedOfferAction();
        resetForm();
      })
      .catch((e) => {
        hideProgressAction();
        showErrorAction();
      });
  };

  return (
    <div style={{ width: "1170px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Добави оферта</h1>
      <OfferFields
        info={info}
        propertyOwnerName={propertyOwnerName}
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
        phoneNumber={phoneNumber}
        onChangeInput={onChangeInput}
        phoneNumber2={phoneNumber2}
        phoneNumber3={phoneNumber3}
        address={address}
        area={area}
        price={price}
        floor={floor}
        description={description}
        lastCall={lastCall}
        setLastCall={setLastCall}
        nextCall={nextCall}
        setNextCall={setNextCall}
      />
      <div style={{ padding: "5px" }}>
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

// getStaticProps страницата се генерира при билдване на проекта и
// се връща на клиента готова
export async function getStaticProps(context) {
  let options = await getRequest("/api/get-all-opitions");

  options = addLabelToDropdownFields(options);

  return {
    props: {
      options,
    },
    revalidate: 60, /// през 60 секунди се обновява с нова информация ако има такава
  };
}
