import styled from "styled-components";

export const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 250px;
  padding: 12px 24px;
  font-family: "Nunito, sans-serif";

  background-color: #264a39b8;
  border-radius: 12px;

  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  border: none;
  cursor: pointer;
  outline: none;

  &:focus,
  &:hover {
    background-color: #3a8662b8;
  }

  &:disabled {
    background-color: #ebebeb;
    cursor: default;
  }
`;
