import Select from "react-select";
import ColorsContext from "../context/ColorsContext";
import { useContext } from "react";
import LanguageContext from "../context/LanguageContext";

interface SelectItem {
  text: string;
  value: string;
}

export default function CustomSelect(props: {
  lang: string;
  options: SelectItem[] | null | string;
  onChange: (arg: {text:string, value:string}) => void;
  placeholder: string;
  value: {text: string; value: string} | null
}) {
  const languageContext = useContext(LanguageContext);
  const colorsContext = useContext(ColorsContext);

  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          width: "280px",
          height: "36px",
          borderRadius: "100px",
          backgroundColor: `rgb(${colorsContext.light})`,
          fontSize: "1.8em",
          fontFamily: "Inter",
          cursor: "pointer",
          paddingRight: "10px",
          border: 0,
          boxShadow: "none",
          color: `rgb(${colorsContext.dark})`,
          opacity: state.isDisabled ? "0.2" : "1",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          opacity: 1,
          color: `rgb(${colorsContext.dark})`,
          fontFamily: props.lang === "ge" ? "BPG Glaho Arial" : "Inter",
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          opacity: 1,
          color: `rgb(${colorsContext.light})`,
          backgroundColor: `rgb(${colorsContext.dark})`,
          borderRadius: "50%",
          padding: "0px",
          border: "none",
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: "none",
        }),
        loadingIndicator: (baseStyles) => ({
          ...baseStyles,
          color: `rgb(${colorsContext.dark})`,
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          fontSize: "1.8em",
          backgroundColor: `rgb(${colorsContext.dark})`,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          cursor: "pointer",
          color: `rgb(${colorsContext.light})`,
          backgroundColor: state.isFocused
            ? `rgba(${colorsContext.light}, 0.2)`
            : "transparent",
          "&:hover": {
            backgroundColor: `rgba(${colorsContext.light}, 0.2)`,
          },
          fontFamily: "Inter",
        }),
      }}
      placeholder={props.placeholder}
      getOptionLabel={(option: SelectItem) => option.text}
      getOptionValue={(option: SelectItem) => option.value}
      options={
        props.options !== null && typeof props.options !== "string"
          ? props.options
          : [{ text: "Error loading data", value: "error" }]
      }
      isLoading={props.options === null}
      isDisabled={props.options === null}
      isSearchable={props.options !== null}
      noOptionsMessage={() => <span>{languageContext.noOptionsMessage}</span>}
      onChange={(item) => {
        if (item) {
          props.onChange(item);
        }
      }}
      value={props.value}
    />
  );
}
