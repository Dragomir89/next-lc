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
