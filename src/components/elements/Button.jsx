import styled, { css } from "styled-components";
import { a11yHidden } from "styles/mixin";

const Button = ({
  children,
  type,
  name,
  onClickHandler,
  isDisabled,
  isVisible,
}) => {
  return (
    <StButton
      type={type}
      name={name}
      onClick={onClickHandler}
      disabled={isDisabled}
      isVisible={isVisible}
    >
      {children}
    </StButton>
  );
};

Button.defaultProps = {
  children: "BUTTON",
  name: "",
  type: "button",
  size: "",
  variant: "",
  onClickHandler: null,
  isVisible: true,
  isDisabled: true,
};

const StButton = styled.button`
  ${({ isVisible }) =>
    !isVisible &&
    css`
      ${a11yHidden}
    `};
`;

export default Button;
