import AutocompleteDropdown from "./AutocompleteDropdown";

const DropdownFields = ({
  broker,
  brokers,
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
}) => {
  const fieldPadding = "5px";
  return (
    <div style={{ display: "flex", marginBottom: "25px" }}>
      <div style={{ padding: fieldPadding }}>
        <AutocompleteDropdown
          error={hasErrorConstructionType}
          id="constructionType"
          onChange={onChangeAutocomplete}
          value={constructionType}
          label="Вид строителство *"
          options={constructionTypes.map((e) => {
            return e.label;
          })}
        />
      </div>
      <div style={{ padding: fieldPadding }}>
        <AutocompleteDropdown
          error={hasErrorPropertyType}
          id="propertyType"
          label="Вид имот *"
          options={propertyTypes.map((e) => {
            return e.label;
          })}
          value={propertyType}
          onChange={onChangeAutocomplete}
        />
      </div>
      <div style={{ padding: fieldPadding }}>
        <AutocompleteDropdown
          error={hasErrorState}
          id="state"
          label="Състояние *"
          options={states.map((e) => {
            return e.label;
          })}
          onChange={onChangeAutocomplete}
          value={state}
        />
      </div>
      <div style={{ padding: fieldPadding }}>
        <AutocompleteDropdown
          error={hasErrorNeighborhood}
          id="neighborhood"
          label="Квартал *"
          options={neighborhoods.map((e) => {
            return e.label;
          })}
          onChange={onChangeAutocomplete}
          value={neighborhood}
        />
      </div>
      <div style={{ padding: fieldPadding }}>
        <AutocompleteDropdown
          error={hasErrorNeighborhood}
          id="broker"
          label="Брокер"
          options={brokers.map((e) => {
            return e.label;
          })}
          onChange={onChangeAutocomplete}
          value={broker}
        />
      </div>
    </div>
  );
};

export default DropdownFields;
