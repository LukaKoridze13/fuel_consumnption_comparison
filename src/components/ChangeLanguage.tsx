import { styled } from "styled-components";

export default function ChangeLanguage(props: {
  onClick: (arg: string) => void;
  lang: string;
}) {
  return (
    <Parent $lang={props.lang}>
      <Geo
        onClick={() => {
          props.onClick("ge");
        }}
      >
        ქართული
      </Geo>
      <Eng
        onClick={() => {
          props.onClick("eng");
        }}
      >
        English
      </Eng>
    </Parent>
  );
}

const Parent = styled.div<{ $lang: string }>`
  position: absolute;
  left: 64px;
  bottom: 44px;
  height: 38px;

  border-radius: 40px;
  border: 2px solid ${(props) => `rgb(${props.theme.dark})`};

  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    width: 94px;
    height: 38px;
    border-radius: 32px;
    top: -2px;
    background-color: ${(props) => `rgb(${props.theme.dark})`};
    left: ${(props) => {
      return props.$lang === "ge" ? `-2px` : `90px`;
    }};
    width: ${(props) => {
      return props.$lang === "ge" ? `94px` : `82px`;
    }};
    transition: all 0.1s linear;
  }
  & button:first-child {
    color: ${(props) => {
      return props.$lang === "ge"
        ? `rgb(${props.theme.light})`
        : `rgb(${props.theme.dark})`;
    }};
  }
  & button:last-child {
    color: ${(props) => {
      return props.$lang === "eng"
        ? `rgb(${props.theme.light})`
        : `rgb(${props.theme.dark})`;
    }};
  }
`;

const Geo = styled.button`
  height: 38px;
  border-radius: 32px;
  background: transparent;

  padding: 8px 16px;
  font-family: "ALK Sanet", sans-serif;
  transition: all 0.1s linear;

  position: relative;
  z-index: 3;
`;

const Eng = styled(Geo)`
  font-family: "Inter";
`;
