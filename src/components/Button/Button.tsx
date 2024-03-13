import { FC, ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { ButtonStyled } from "./Button.styled";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  children?: ReactNode;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  text,
  children,
  type = "button",
  disabled = false,
}) => {
  return (
    <ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {text}
      {children}
    </ButtonStyled>
  );
};

export default Button;
