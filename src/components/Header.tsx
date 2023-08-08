import { styled } from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <Text>tsva.info</Text>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  padding: 8px;
  border-radius: 35px;
  background: ${(props) => `rgb(${props.theme.dark})`};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-family: "Inter";
  font-size: 2em;
  font-weight: 800;
  color: ${(props) => `rgb(${props.theme.light})`};
  text-transform: uppercase;

  @media (max-width: 1024px) {
    font-size: 1.6em;
    font-weight: 600;
  }
`;
