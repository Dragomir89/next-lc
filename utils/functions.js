export const transformDateToString = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  return `${year}-${month}-${day}`;
};

export function fomatOffersTableData(incommingOffer) {
  return {
    id: incommingOffer._id,
    constructionType: incommingOffer.constructionTypeId.value,
    propertyType: incommingOffer.propertyTypeId.value,
    neighborhood: incommingOffer.neighborhoodId.value,
    state: incommingOffer.state.value,
    area: incommingOffer.area,
    price: incommingOffer.price,
    address: incommingOffer.address,
    nextCall: transformDateToString(incommingOffer.nextCall),
  };
}

export function addLabelToDropdownFields(options) {
  for (var key in options) {
    options[key] = options[key].map((o) => {
      o.label = o.value;
      return o;
    });
  }

  return options;
}

export function getIdsByLabels(
  constructionTypes,
  constructionType,
  neighborhoods,
  neighborhood,
  propertyTypes,
  propertyType,
  states,
  state,
  brokers,
  broker
) {
  const constructionTypeId = constructionTypes.find((e) => {
    return e.label === constructionType;
  })?._id;

  const neighborhoodId = neighborhoods.find((e) => {
    return e.label === neighborhood;
  })?._id;

  const propertyTypeId = propertyTypes.find((e) => {
    return e.label === propertyType;
  })?._id;

  const stateId = states.find((e) => {
    return e.label === state;
  })?._id;

  if (broker) {
    const brokerId = brokers.find((e) => {
      return e.label === broker;
    })?._id;

    return {
      constructionTypeId,
      neighborhoodId,
      propertyTypeId,
      stateId,
      brokerId,
    };
  }

  return {
    constructionTypeId,
    neighborhoodId,
    propertyTypeId,
    stateId,
  };
}

export function validateDropdowns(
  constructionType,
  setHasErrorConstructionType,
  propertyType,
  setHasErrorPropertyType,
  state,
  setHasErrorState,
  neighborhood,
  setHasErrorNeighborhood
) {
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
}

export function createQueryStr(
  constructionTypes,
  constructionType,
  neighborhoods,
  neighborhood,
  propertyTypes,
  propertyType,
  states,
  state,
  rowsPerPage,
  brokers,
  broker,
  phoneNumber,
  nextCall
) {
  const {
    constructionTypeId,
    neighborhoodId,
    propertyTypeId,
    stateId,
    brokerId,
  } = getIdsByLabels(
    constructionTypes,
    constructionType,
    neighborhoods,
    neighborhood,
    propertyTypes,
    propertyType,
    states,
    state,
    brokers,
    broker
  );

  let nextCallStr = "";
  if (nextCall && nextCall.$d && nextCall.$d.toString() !== "Invalid Date") {
    nextCallStr = transformDateToString(nextCall.$d);
  }
  console.log(nextCallStr);
  const res = `?rows=${rowsPerPage || ""}&nextCall=${
    nextCallStr || ""
  }&constructionTypeId=${constructionTypeId || ""}&neighborhoodId=${
    neighborhoodId || ""
  }&propertyTypeId=${propertyTypeId || ""}&state=${stateId || ""}&brokerId=${
    brokerId || ""
  }&phoneNumber=${phoneNumber || ""}`;
  return res;
}

export const onChangeAutocomplete = (
  e,
  values,
  setConstructionTypes,
  setPropertyType,
  setStates,
  setNeighborhoods,
  setBroker
) => {
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
    case "broker":
      setBroker(values);
      break;
  }
};

export const creteFindOfferQuery = (query) => {
  const findObj = {};
  for (const [key, value] of Object.entries(query)) {
    if (value && key !== "page" && key !== "rows") {
      findObj[key] = value;
    }
    if (key === "nextCall" && value) {
      findObj["nextCall"] = { $lte: new Date(value) };
    }
  }
  return findObj;
};

// const onChangeInput = (e) => { //// move here

export const getSelectetLabels = (options, query) => {
  const constructionTypeObj = options.constructionTypes.find((el) => {
    return el._id === query.constructionTypeId;
  });
  const propertyTypeObj = options.propertyTypes.find((el) => {
    return el._id === query.propertyTypeId;
  });
  const neighborhoodsObJ = options.neighborhoods.find((el) => {
    return el._id === query.neighborhoodId;
  });
  const stateObj = options.states.find((el) => {
    return el._id === query.state;
  });
  const brokerObj = options.brokers.find((el) => {
    return el._id === query.brokerId;
  });

  const selectedValues = {
    constructionType: constructionTypeObj ? constructionTypeObj.label : null,
    propertyType: propertyTypeObj ? propertyTypeObj.label : null,
    neighborhood: neighborhoodsObJ ? neighborhoodsObJ.label : null,
    state: stateObj ? stateObj.label : null,
    broker: brokerObj ? brokerObj.label : null,
    phoneNumber: query.phoneNumber ? query.phoneNumber : "",
    nextCall: query.nextCall ? query.nextCall : "",
  };

  return selectedValues;
};
