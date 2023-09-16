import React from "react";
import Select from "react-select";

const ReactSelect = ({ options, placeholder, onChange, isMulti }) => {
  const MultiValueStyles = (base, state) => ({
    ...base,
    background: "#d57d1f",
  });
  const MultiValueLabelStyles = (base, state) => ({
    ...base,
    color: "#ffffff",
  });

  const MenuPortalStyles = (base, state) => ({
    ...base,
    background: "#d57d1f",
  });

  const OptionStyles = (base, state) => ({
    ...base,
    background: state.isFocused || state.isSelected ? "#2d2013" : "#d57d1f",
  });

  const SingleValueStyles = (base, state) => ({
    ...base,
    color: "#d57d1f",
    fontWeight: 800,
    //color: "#ffffff",
  });

  return (
    <Select
      options={options}
      placeholder={placeholder}
      isSearchable={true}
      isMulti={isMulti}
      onChange={onChange}
      styles={{
        multiValue: MultiValueStyles,
        multiValueLabel: MultiValueLabelStyles,
        menu: MenuPortalStyles,
        option: OptionStyles,
        singleValue: !isMulti ? SingleValueStyles : null,
      }}
    />
  );
};

export default ReactSelect;
