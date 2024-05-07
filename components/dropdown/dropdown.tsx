import React, { useState } from "react";
import Select, { components } from "react-select";
import { IDropdownProps } from "interfaces";

const Dropdown = ({
  process = false,
  onChange,
  value,
  options,
  isSearchable,
  name,
  isClearable,
  placeholder,
  icon = false,
}: IDropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const defaultValue = options.filter((filter: any) => filter.value === value);

  const setSelect = (item: any) => {
    !process && setSelectedOption(item);
    onChange(item);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "1px solid #e9ebf0",
      "&:hover": {
        borderColor: "#e9ebf0",
      },
      boxShadow: "none",
      borderRadius: 4,
      outlineColor: "#00adee",
      fontSize: 14,
      lineHeight: "22px",
      padding: "1px 0",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 9,
      borderRadius: 4,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: "#ffffff",
      "&:hover": {
        backgroundColor: "#00adee",
        color: "#ffffff",
      },
      borderBottom: "1px solid #f6f9ff",
      color: state.isSelected ? "#292d34" : "#7c828d",
      fontSize: 14,
      margin: 0,
      padding: "0.5rem",
    }),
  };

  const Control = ({ children, ...props }: any) => {
    const { selectProps } = props;

    return (
      <components.Control {...props}>
        {icon && (
          <img
            src={`/icons/flags/${selectProps.value.icon}`}
            style={{ width: 24, margin: "0 0 0 7px" }}
            alt={selectProps.value.label}
          />
        )}
        {children}
      </components.Control>
    );
  };
  const InputElement: any = ({ ...props }: any) => <components.Input {...props} />;

  const IconInput = (props: any) => (
    <components.Option {...props}>
      {icon && (
        <img
          src={`/menu-files/icons/${props.data.icon}`}
          style={{ width: 24, marginRight: 8 }}
          alt={props.data.label}
        />
      )}
      {props.data.label}
    </components.Option>
  );

  return (
    <Select
      styles={customStyles}
      isSearchable={isSearchable}
      instanceId={name}
      components={{ Control, Option: IconInput, Input: InputElement }}
      autoFocus={false}
      isClearable={isClearable}
      placeholder={placeholder}
      value={defaultValue[0] || selectedOption}
      noOptionsMessage={() => "-"}
      onChange={(item: any) => setSelect(item)}
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: "#50a1ff",
          neutral30: "#e9ebf0",
          primary25: "#e9ebf0",
        },
      })}
    />
  );
};

Dropdown.defaultProps = {
  isSearchable: false,
  isClearable: false,
  placeholder: "",
};

export default Dropdown;
