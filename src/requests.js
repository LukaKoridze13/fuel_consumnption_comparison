const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const optionsSelect = document.getElementById("optionsSelect");
const carDataContainer = document.getElementById("carDataContainer");
const selectedYearSpan = document.getElementById("selectedYear");
const selectedMakeSpan = document.getElementById("selectedMake");
const selectedModelSpan = document.getElementById("selectedModel");
const selectedOptionsSpan = document.getElementById("selectedOptions");
const showConsumptionButton = document.getElementById("showConsumptionButton");
// prettier-ignore
const image = document.getElementById("car");
const fuelConsumptionContainer = document.getElementById(
  "fuelConsumptionContainer"
);
const cityConsumptionSpan = document.getElementById("cityConsumption");
const highwayConsumptionSpan = document.getElementById("highwayConsumption");
const averageConsumptionSpan = document.getElementById("averageConsumption");
const baseUrl = "https://fueleconomy.gov/ws/rest";

// Fetch available model years
fetchYears();

// Add event listeners
yearSelect.addEventListener("change", fetchMakes);
makeSelect.addEventListener("change", fetchModels);
modelSelect.addEventListener("change", fetchOptions);
optionsSelect.addEventListener("change", fetchAndDisplayCarData);
showConsumptionButton.addEventListener("click", showFuelConsumption);

// Functions
function fetchMakes() {
  const selectedYear = yearSelect.value;
  makeSelect.disabled = true;
  modelSelect.disabled = true;
  optionsSelect.disabled = true;
  carDataContainer.style.display = "none";

  const makesUrl = `${baseUrl}/vehicle/menu/make?year=${selectedYear}`;
  axios
    .get(makesUrl)
    .then((response) => {
      const makes = Array.isArray(response.data.menuItem)
        ? response.data.menuItem
        : [];
      makeSelect.innerHTML =
        '<option value="" disabled selected>Select a manufacturer</option>';
      makes.forEach((make) => {
        const option = document.createElement("option");
        option.value = make.value;
        option.textContent = make.value;
        makeSelect.appendChild(option);
      });
      makeSelect.disabled = false;
    })
    .catch((error) => {
      console.error("Error fetching makes:", error);
    });
}

function fetchModels() {
  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  modelSelect.disabled = true;
  optionsSelect.disabled = true;
  carDataContainer.style.display = "none";

  const modelsUrl = `${baseUrl}/vehicle/menu/model?year=${selectedYear}&make=${selectedMake}`;
  axios
    .get(modelsUrl)
    .then((response) => {
      const models = Array.isArray(response.data.menuItem)
        ? response.data.menuItem
        : [];
      modelSelect.innerHTML =
        '<option value="" disabled selected>Select a model</option>';
      models.forEach((model) => {
        const option = document.createElement("option");
        option.value = model.value;
        option.textContent = model.value;
        modelSelect.appendChild(option);
      });
      modelSelect.disabled = false;
    })
    .catch((error) => {
      console.error("Error fetching models:", error);
    });
}

function fetchOptions() {
  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  const selectedModel = modelSelect.value;
  optionsSelect.disabled = true;
  carDataContainer.style.display = "none";

  const optionsUrl = `${baseUrl}/vehicle/menu/options?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}`;
  axios
    .get(optionsUrl)
    .then((response) => {
      const options = response.data.menuItem;
      if (Array.isArray(options)) {
        optionsSelect.innerHTML =
          '<option value="" disabled selected>Select options</option>';
        options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.value = option.value;
          optionElement.textContent = option.text;
          optionsSelect.appendChild(optionElement);
        });
        optionsSelect.disabled = false;
      } else {
        optionsSelect.innerHTML = `<option value="${options.value}" disabled selected>${options.text}</option>`;
        fetchAndDisplayCarData();
      }
    })
    .catch((error) => {
      console.error("Error fetching options:", error);
    });
}

function fetchAndDisplayCarData() {
  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  const selectedModel = modelSelect.value;
  const selectedOptionId = optionsSelect.value;
  image.src = `https://www.fueleconomy.gov/feg/photos/${selectedYear}_${selectedMake}_${selectedModel.split(' ')[0]}.jpg`;
  selectedYearSpan.textContent = selectedYear;
  selectedMakeSpan.textContent = selectedMake;
  selectedModelSpan.textContent = selectedModel;
  selectedOptionsSpan.textContent = "No options selected";

  // Fetch car data using the selected option ID
  const carDataUrl = `${baseUrl}/vehicle/${selectedOptionId}`;
  axios
    .get(carDataUrl)
    .then((response) => {
      const carData = response.data;
      selectedOptionsSpan.textContent = `${carData.trany}, ${carData.cylinders} cyl, ${carData.displ} L`;
      carDataContainer.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching car data:", error);
    });
}

function showFuelConsumption() {
  const selectedOptionId = optionsSelect.value;

  // Fetch fuel consumption data using the selected option ID
  const fuelDataUrl = `${baseUrl}/vehicle/${selectedOptionId}`;
  axios
    .get(fuelDataUrl)
    .then((response) => {
      const fuelData = response.data;
      cityConsumptionSpan.textContent = `${mpgConvert(
        fuelData.city08U
      )} L/100Km`;
      highwayConsumptionSpan.textContent = `${mpgConvert(
        fuelData.highway08U
      )} L/100Km`;
      averageConsumptionSpan.textContent = `${mpgConvert(
        fuelData.comb08U
      )} L/100Km`;
      fuelConsumptionContainer.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching fuel consumption data:", error);
    });
}

function fetchYears() {
  const yearMenuUrl = `${baseUrl}/vehicle/menu/year`;
  axios
    .get(yearMenuUrl)
    .then((response) => {
      const modelYears = Array.isArray(response.data.menuItem)
        ? response.data.menuItem
        : [];
      yearSelect.innerHTML =
        '<option value="" disabled selected>Select a year</option>';
      modelYears.forEach((year) => {
        const option = document.createElement("option");
        option.value = year.value;
        option.textContent = year.value;
        yearSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching model years:", error);
    });
}

function mpgConvert(mpg) {
  return roundUp(235.215 / mpg);
}

function roundUp(number) {
  const roundedNumber = Math.ceil(number * 100) / 100;
  return roundedNumber.toFixed(2);
}
