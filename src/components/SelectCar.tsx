import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import {
  fetchCarData,
  fetchMakes,
  fetchModels,
  fetchOptions,
  fetchYears,
} from "../requests";
import loadingCar from "../assets/loading-car.gif";
import CustomSelect from "./CustomSelect";
import LanguageContext from "../context/LanguageContext";

type FetchedData = { text: string; value: string }[] | null | string;
type NullObj = null | { text: string; value: string };

export default function SelectCar(props: {
  lang: string;
  addCar: ({}) => void;
}) {
  const languageContext = useContext(LanguageContext);
  // prettier-ignore
  const [years, setYears] = useState<FetchedData>(null);
  const [manufacturers, setManufacturers] = useState<FetchedData>(null);
  const [models, setModels] = useState<FetchedData>(null);
  const [options, setOptions] = useState<FetchedData>(null);

  const [yearSelected, setYearSelected] = useState<NullObj>(null);
  // prettier-ignore
  const [manufacturerSelected, setManufacturerSelected] = useState<NullObj>(null);
  const [modelSelected, setModelSelected] = useState<NullObj>(null);
  const [optionSelected, setOptionSelected] = useState<NullObj>(null);

  async function getYears() {
    let data = await fetchYears();
    if (Array.isArray(data)) {
      setYears(data);
    } else {
      setYears("Error");
    }
  }
  async function getManufacturers(year: string) {
    let data = await fetchMakes(year);
    if (Array.isArray(data)) {
      setManufacturers(data);
    } else {
      setManufacturers("Error");
    }
  }
  async function getModels(year: string, make: string) {
    let data = await fetchModels(year, make);
    if (Array.isArray(data)) {
      setModels(data);
    } else {
      setModels("Error");
    }
  }
  async function getOptions(year: string, make: string, model: string) {
    let data = await fetchOptions(year, make, model);
    if (Array.isArray(data)) {
      setOptions(data);
    } else if (data.text) {
      setOptions([{ ...data }]);
      setOptionSelected(data);
    } else {
      setOptions("Error");
    }
  }

  async function getCar(id: string) {
    let data = await fetchCarData(id);
    if (data) {
      props.addCar(data);
    } else {
      props.addCar("Error");
    }
  }

  useEffect(() => {
    getYears();
  }, []);

  useEffect(() => {
    setManufacturerSelected(null);
    setManufacturers(null);
    yearSelected && getManufacturers(yearSelected.value);
  }, [yearSelected]);

  useEffect(() => {
    if (yearSelected) {
      if (manufacturerSelected) {
        getModels(yearSelected.value, manufacturerSelected.value);
      }
    }
  }, [manufacturerSelected]);

  useEffect(() => {
    if (yearSelected) {
      if (manufacturerSelected) {
        if (modelSelected) {
          getOptions(
            yearSelected.value,
            manufacturerSelected.value,
            modelSelected.value
          );
        }
      }
    }
  }, [modelSelected]);

  useEffect(() => {
    optionSelected && getCar(optionSelected.value);
  }, [optionSelected]);
  return (
    <Form>
      {optionSelected ? (
        <Gif src={loadingCar} alt="Car moving" />
      ) : (
        <>
          <CustomSelect
            lang={props.lang}
            options={years}
            onChange={setYearSelected}
            placeholder={languageContext.chooseYear}
            value={yearSelected}
          />
          <CustomSelect
            lang={props.lang}
            options={manufacturers}
            onChange={setManufacturerSelected}
            placeholder={languageContext.chooseManufacturer}
            value={manufacturerSelected}
          />
          <CustomSelect
            lang={props.lang}
            options={models}
            onChange={setModelSelected}
            placeholder={languageContext.chooseModel}
            value={modelSelected}
          />
          <CustomSelect
            lang={props.lang}
            options={options}
            onChange={setOptionSelected}
            placeholder={languageContext.chooseOptions}
            value={optionSelected}
          />
        </>
      )}
    </Form>
  );
}

const Form = styled.form`
  width: 320px;
  height: 308px;
  padding: 48px 20px;
  background-color: ${(props) => `rgb(${props.theme.dark})`};
  border-radius: 32px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  & > span {
    color: ${(props) => `rgb(${props.theme.light})`};
    font-size: 3em;
    text-align: center;
  }
`;

const Gif = styled.img`
  width: 200px;
  aspect-ratio: 4/3;
`;
