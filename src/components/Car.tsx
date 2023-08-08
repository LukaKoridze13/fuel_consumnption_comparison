import { styled } from "styled-components";
import LanguageContext from "../context/LanguageContext";
import { useContext } from "react";
import useMpgToLkm from "../hooks/useMpgToLkm";
import useRoundUp from "../hooks/useRoundUp";
interface EmissionsInfo {
  efid: string;
  id: string;
  salesArea: string;
  score: string;
  scoreAlt: string;
  smartwayScore: string;
  standard: string;
  stdText: string;
}

interface EmissionsList {
  emissionsInfo: EmissionsInfo[];
}

interface CarData {
  atvType: string;
  barrels08: string;
  barrelsA08: string;
  c240Dscr: string;
  c240bDscr: string;
  charge120: string;
  charge240: string;
  charge240b: string;
  city08: string;
  city08U: string;
  cityA08: string;
  cityA08U: string;
  cityCD: string;
  cityE: string;
  cityUF: string;
  co2: string;
  co2A: string;
  co2TailpipeAGpm: string;
  co2TailpipeGpm: string;
  comb08: string;
  comb08U: string;
  combA08: string;
  combA08U: string;
  combE: string;
  combinedCD: string;
  combinedUF: string;
  createdOn: string;
  cylinders: string;
  displ: string;
  drive: string;
  emissionsList: EmissionsList;
  engId: string;
  eng_dscr: string;
  evMotor: string;
  feScore: string;
  fuelCost08: string;
  fuelCostA08: string;
  fuelType: string;
  fuelType1: string;
  fuelType2: string;
  ghgScore: string;
  ghgScoreA: string;
  guzzler: string;
  highway08: string;
  highway08U: string;
  highwayA08: string;
  highwayA08U: string;
  highwayCD: string;
  highwayE: string;
  highwayUF: string;
  hlv: string;
  hpv: string;
  id: string;
  lv2: string;
  lv4: string;
  make: string;
  mfrCode: string;
  model: string;
  modifiedOn: string;
  mpgData: string;
  mpgRevised: string;
  phevBlended: string;
  phevCity: string;
  phevComb: string;
  phevHwy: string;
  pv2: string;
  pv4: string;
  range: string;
  rangeA: string;
  rangeCity: string;
  rangeCityA: string;
  rangeHwy: string;
  rangeHwyA: string;
  startStop: string;
  trans_dscr: string;
  trany: string;
  UCity: string;
  UCityA: string;
  UHighway: string;
  UHighwayA: string;
  VClass: string;
  year: string;
  youSaveSpend: string;
  baseModel: string;
  sCharger: string;
  tCharger: string;
}

export default function Car(props: { car: CarData }) {
  const languageContext = useContext(LanguageContext);
  const convert = useMpgToLkm;
  const { car } = props;
  const cost = useRoundUp(Number(convert(Number(car.comb08)))*10*2.65*languageContext.currency.value)
  return (
    <Box>
      <Top>
        <Text>
          {car.model}, {car.make}, {car.year}
        </Text>
        <Text>{car.fuelType1}</Text>
        <Text>
          {car.trany}
          {car.displ !== "" && `, ${car.displ} L.`}
          {car.cylinders !== "" && `, ${car.cylinders} cyl.`}
        </Text>
        <Text>{car.drive}</Text>
      </Top>
      <Fuel>
        <Field>
          {languageContext.averageGeneral}
          <FieldBox>
            {convert(Number(car.comb08))} {languageContext.liters[0]}
          </FieldBox>
        </Field>
        <Field>
          {languageContext.averageInCity}
          <FieldBox>
            {convert(Number(car.city08))} {languageContext.liters[0]}
          </FieldBox>
        </Field>
        <Field>
          {languageContext.averageOnHighway}
          <FieldBox>
            {convert(Number(car.highway08))} {languageContext.liters[0]}
          </FieldBox>
        </Field>
        <Field>
          {languageContext.costPer1000km}
          <FieldBox>
            {cost}
            {languageContext.currency.name[0]}
          </FieldBox>
        </Field>
      </Fuel>
    </Box>
  );
}

const Box = styled.div`
  width: 320px;
  border-radius: 16px;
`;

const Top = styled.div`
  width: 100%;
  padding: 32px 21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  background-color: ${(props) => `rgb(${props.theme.dark})`};
  border-radius: 16px 16px 0px 0px;
`;

const Text = styled.p`
  font-family: "Inter";
  color: ${(props) => `rgb(${props.theme.light})`};
  font-size: 2em;
  font-weight: 400;
  border-bottom: 1px solid ${(props) => `rgb(${props.theme.light})`};
  width: fit-content;
`;

const Fuel = styled.div`
  width: 100%;
  background-color: ${(props) => `rgba(${props.theme.dark}, 0.5)`};
  border-radius: 0px 0px 16px 16px;
  padding: 32px 21px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 36px;
`;

const Field = styled.div`
  width: 100%;
  height: 52px;
  padding: 6px 16px;
  background-color: ${(props) => `rgb(${props.theme.dark})`};
  border-radius: 16px;

  color: ${(props) => `rgb(${props.theme.light})`};
  font-size: 1.6em;
  font-weight: 400;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  position: relative;
`;

const FieldBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);

  width: 80px;
  height: 60px;
  border-radius: 0px 16px 16px 0px;
  border: 2px solid ${(props) => `rgb(${props.theme.dark})`};
  background: ${(props) => `rgb(${props.theme.light})`};
  color: ${(props) => `rgb(${props.theme.dark})`};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
