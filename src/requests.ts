import axios from "axios";
const baseUrl = "https://fueleconomy.gov/ws/rest";

export function fetchYears() {
  const yearMenuUrl = `${baseUrl}/vehicle/menu/year`;
  let data = fetch(yearMenuUrl);
  return data;
}
export function fetchMakes(year: string) {
  const makesUrl = `${baseUrl}/vehicle/menu/make?year=${year}`;
  let data = fetch(makesUrl);
  return data;
}
export function fetchModels(year: string, make: string) {
  const modelsUrl = `${baseUrl}/vehicle/menu/model?year=${year}&make=${make}`;
  let data = fetch(modelsUrl);
  return data;
}
export function fetchOptions(year: string, make: string, model: string) {
  const optionsUrl = `${baseUrl}/vehicle/menu/options?year=${year}&make=${make}&model=${model}`;
  let data = fetch(optionsUrl);
  return data;
}
export function fetchCarData(id: string) {
  const carDataUrl = `${baseUrl}/vehicle/${id}`;
  let data = fetch(carDataUrl);

  return data;
}
async function fetch(url: string) {
  let value = await axios
    .get(url)
    .then((response) => {
      if (response.data.menuItem) {
        return response.data.menuItem;
      } else {
        return response.data;
      }
    })
    .catch(function (error) {
      return error;
    });
  return value;
}
