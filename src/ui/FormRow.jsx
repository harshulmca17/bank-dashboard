import styled, { css } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;

  grid-template-columns: ${(props) =>
    props.orientation === "vertical" ? "1fr" : "24rem 1fr 1.2fr"};
  gap: ${(props) => (props.orientation === "vertical" ? "0.8rem" : "2.4rem")};

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${(props) =>
    props.orientation === "vertical"
      ? "none"
      : "1px solid var(--color-grey-100)"};
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  ${(props) =>
    props.orientation !== "vertical" &&
    css`
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}
`;

const Label = styled.label`
  font-weight: 500;
  color: var(${props => props.darkMode ? '--color-silver-700' : '--color-grey-900'});
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, orientation }) {
  const { darkMode } = useDarkMode();
  return (
    <StyledFormRow orientation={orientation}>
      {label && <Label htmlFor={children.props.id} darkMode={darkMode}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
