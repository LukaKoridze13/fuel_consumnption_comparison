import { useState } from "react";
import { styled } from "styled-components";
import { ThemeProvider } from "styled-components";
import ChangeTheme from "./components/ChangeTheme";
import Header from "./components/Header";
import LanguageContext from "./context/LanguageContext";
import languages from "./languages";
import ChangeLanguage from "./components/ChangeLanguage";
import SelectCar from "./components/SelectCar";
import ColorsContext from "./context/ColorsContext";
import colors from "./colors";
import Car from "./components/Car";

export default function App() {
  // prettier-ignore
  const [themeColor, setThemeColor] = useState(localStorage.getItem("fuelEconomyTheme") || "blue");
  // prettier-ignore
  const [lang, setLang] = useState(localStorage.getItem("fuelEconomylang") || "ge");
  const [cars, setCars] = useState<any[]>([]);
  // prettier-ignore
  function changeTheme() {
    const themes = Object.keys(colors);
    const index = themes.indexOf(themeColor);
    if (index !== themes.length - 1) {
      setThemeColor(themes[index + 1]);
      localStorage.setItem("fuelEconomyTheme", themes[index + 1]);
    } else {
      setThemeColor(themes[0]);
      localStorage.setItem("fuelEconomyTheme", themes[0]);
    }
  }

  function changeLanguage(lang: string) {
    setLang(lang);
  }

  function addCar(arg: {}) {
    setCars([...cars, arg]);
  }

  return (
    <ThemeProvider theme={colors[themeColor]}>
      <LanguageContext.Provider value={languages[lang]}>
        <ColorsContext.Provider value={colors[themeColor]}>
          <Screen>
            {/* prettier-ignore */}
            <Container $font={lang === "ge" ? '"BPG Glaho Arial", sans-serif' : "Inter"}>
              <Header />
              <Main>
                {cars.map(car => <Car key={car.id} car={car}/>)}
                <SelectCar key={cars.length} lang={lang} addCar={addCar} />
              </Main>
              <ChangeTheme onClick={changeTheme} />
              <ChangeLanguage onClick={changeLanguage} lang={lang} />
            </Container>
          </Screen>
        </ColorsContext.Provider>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

const Screen = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => `rgb(${props.theme.light})`};

  & *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${(props) => `rgb(${props.theme.dark})`};
  }

  & *::-webkit-scrollbar {
    width: 12px;
    background-color: ${(props) => `rgb(${props.theme.dark})`};
  }

  & *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: ${(props) => `rgb(${props.theme.light})`};
  }
`;

const Container = styled.div<{ $font: string }>`
  width: 100%;
  min-height: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 44px 64px;

  font-size: 10px;
  font-family: ${(props) => props.$font};

  position: relative;

  flex-grow: 1;
  min-height: 0;

  @media (max-width: 1024px) {
    padding: 8px;
    padding-bottom: 120px;
  }
`;

const Main = styled.main`
  width: 100%;

  margin: 100px 0px;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 1024px) {
    row-gap: 8px;
    margin: 20px 0px;
  }
`;
