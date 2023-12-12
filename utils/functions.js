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
  };
}

export function addLabelToDropdownFields(options) {
  options.constructionTypes = options.constructionTypes.map((o) => {
    o.label = o.value;
    return o;
  });
  options.neighborhoods = options.neighborhoods.map((o) => {
    o.label = o.value;
    return o;
  });
  options.propertyTypes = options.propertyTypes.map((o) => {
    o.label = o.value;
    return o;
  });
  options.states = options.states.map((o) => {
    o.label = o.value;
    return o;
  });
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
  state
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
  page,
  rowsPerPage
) {
  const { constructionTypeId, neighborhoodId, propertyTypeId, stateId } =
    getIdsByLabels(
      constructionTypes,
      constructionType,
      neighborhoods,
      neighborhood,
      propertyTypes,
      propertyType,
      states,
      state
    );
  const res = `/show-offers/${page}?rows=${rowsPerPage}&constructionTypeId=${constructionTypeId}&neighborhoodId=${neighborhoodId}&propertyTypeId=${propertyTypeId}&state=${stateId}`;
  console.log(res);
  return res;
}
