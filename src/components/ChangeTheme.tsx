import { styled } from "styled-components";
import ChangeThemeSVG from "./ChangeThemeSVG";
import LanguageContext from "../context/LanguageContext";
import { useContext } from "react";
export default function ChangeTheme(props: { onClick: () => void }) {
  const languageContext = useContext(LanguageContext);
  return (
    <Button onClick={props.onClick}>
      {languageContext.changeTheme} <ChangeThemeSVG />
    </Button>
  );
}

const Button = styled.button`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 40px;
  background-color: ${(props) => `rgb(${props.theme.dark})`};

  color: ${(props) => `rgb(${props.theme.light})`};
  font-size: 1.6em;
  font-weight: 400;

  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: 44px;
  transform: translateX(-50%);

  & path {
    fill: ${(props) => `rgb(${props.theme.light})`};
  }

  @media (max-width: 1024px) {
    transform:none;
    left:auto;
    right:8px;
    font-size: 1.3em;
    padding-inline: 12px;
    height:38px;
  }
`;
