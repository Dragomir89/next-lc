import { useState } from "react";
import dayjs from "dayjs";
import {
  addLabelToDropdownFields,
  getIdsByLabels,
  validateDropdowns,
} from "../../utils/functions";
import { getRequest, postRequest } from "../../utils/requests";
import OfferFields from "../../components/common/OfferFields";
import { Button } from "@mui/material";

function ShowOffers({ offer, options }) {
  const { constructionTypes, neighborhoods, propertyTypes, states } = options;

  const constructionTypeLabel = constructionTypes.find((e) => {
    return e._id === offer.constructionTypeId;
  }).label;

  const neighborhoodLabel = neighborhoods.find((e) => {
    return e._id === offer.neighborhoodId;
  }).label;

  const propertyTypesLabel = propertyTypes.find((e) => {
    return e._id === offer.propertyTypeId;
  }).label;

  const stateLabel = states.find((e) => {
    return e._id === offer.state;
  }).label;

  const [constructionType, setConstructionTypes] = useState(
    constructionTypeLabel
  );
  const [propertyType, setPropertyType] = useState(propertyTypesLabel);
  const [state, setStates] = useState(stateLabel);
  const [neighborhood, setNeighborhoods] = useState(neighborhoodLabel);

  const [hasErrorConstructionType, setHasErrorConstructionType] =
    useState(false);
  const [hasErrorPropertyType, setHasErrorPropertyType] = useState(false);
  const [hasErrorState, setHasErrorState] = useState(false);
  const [hasErrorNeighborhood, setHasErrorNeighborhood] = useState(false);

  const [phoneNumber, setphoneNumber] = useState(offer.phoneNumbers[0]);
  const [phoneNumber2, setPhoneNumber2] = useState(offer.phoneNumbers[1]);
  const [phoneNumber3, setPhoneNumber3] = useState(offer.phoneNumbers[2]);
  const [address, setAddress] = useState(offer.address);
  const [area, setArea] = useState(offer.area);
  const [price, setPrice] = useState(offer.price);
  const [floor, setFloor] = useState(offer.floor);
  const [propertyOwnerName, setPropertyOwnerName] = useState(
    offer.propertyOwnerName
  );
  const [description, setDescription] = useState(offer.description);
  const [info, setInfo] = useState(offer.info);
  const [lastCall, setLastCall] = useState(dayjs(new Date(offer.lastCall)));
  const [nextCall, setNextCall] = useState(dayjs(new Date(offer.nextCall)));

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

  const updateOffer = () => {
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
    const updatedOffer = {
      _id: offer._id,
      constructionTypeId: dropdownsIds.constructionTypeId,
      neighborhoodId: dropdownsIds.neighborhoodId,
      propertyTypeId: dropdownsIds.propertyTypeId,
      state: dropdownsIds.state,
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
    };
    postRequest("/api/edit-offer", updatedOffer).then((res) => {
      console.log(res);
    });
  };

  return (
    <div style={{ width: "1170px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Редактиране на оферта</h1>
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
          onClick={updateOffer}
          style={{ width: "290px" }}
          variant="contained"
          color="warning"
        >
          Редактирай
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;

  const { offerId } = params;
  const offer = await getRequest(`/api/get-offer/${offerId}`);
  let options = await getRequest("/api/get-all-opitions");
  options = addLabelToDropdownFields(options);

  return { props: { offer, options } };
}

export default ShowOffers;
