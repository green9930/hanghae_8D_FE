import styled, { css } from "styled-components";
import { a11yHidden } from "styles/mixin";
import { colors } from "styles/theme";

/* variant ------------------------------------------------------------------ */
// image : 아이콘 버튼
// text : 텍스트 버튼
/* theme -------------------------------------------------------------------- */
// p_filled : bg purple
// p_outline : bg white & putple outline
// grey : 회색 버튼
// disabled : 비활성화 버튼
// transparent : 배경 투명 버튼
/* size --------------------------------------------------------------------- */
// small_round : 카테고리 작은 버튼
// large_round : 큰 버튼 + border-radius
// large : 큰 버튼

const Button = ({
  children,
  type,
  name,
  onClickHandler,
  isDisabled,
  isVisible,
  variant,
  width,
  height,
  theme,
  size,
}) => {
  return (
    <StButton
      type={type}
      name={name}
      onClick={onClickHandler}
      disabled={isDisabled}
      isVisible={isVisible}
      variant={variant}
      width={width}
      height={height}
      theme={theme}
      size={size}
    >
      {children}
    </StButton>
  );
};

Button.defaultProps = {
  children: "BUTTON",
  name: "",
  type: "button",
  size: "large",
  variant: "text",
  onClickHandler: null,
  isVisible: true,
  isDisabled: false,
  width: "",
  height: "100%",
  theme: "p_filled",
};

const StButton = styled.button`
  border: none;
  outline: none;

  ${({ variant, size }) => {
    if (variant === "image") {
      return css`
        display: flex;
        align-items: center;
        background: transparent;
        padding: 0;
      `;
    }
    if (variant === "text") {
      if (size === "small_round") {
        return css`
          width: 72px;
          height: 24px;
          border-radius: 30px;
          text-align: center;
          font-size: 12px;
          letter-spacing: -0.03em;
        `;
      }
      if (size === "large_round") {
        return css`
          width: 100%;
          height: 50px;
          border-radius: 50px;
          text-align: center;
          font-size: 18px;
        `;
      }
      if (size === "large") {
        return css`
          width: 100%;
          height: 50px;
          text-align: center;
          font-size: 18px;
        `;
      }
    }
  }}

  background: ${({ variant, theme }) => {
    if (variant === "text") {
      switch (theme) {
        case "p_filled":
          return `${colors.mainP}`;
        case "p_outline":
          return `${colors.white}`;
        case "grey":
          return `${colors.grey4}`;
        case "disabled":
          return `${colors.grey3}`;
        case "transparent":
          return "transparent";
        default:
          return `${colors.mainP}`;
      }
    }
  }};

  color: ${({ variant, theme }) => {
    if (variant === "text") {
      switch (theme) {
        case "p_filled" || "grey" || "disabled":
          return `${colors.white}`;
        case "p_outline":
          return `${colors.mainP}`;
        default:
          return `${colors.white}`;
      }
    }
  }};

  border: ${({ theme }) =>
    theme === "p_outline" && `1px solid ${colors.mainP}`};

  ${({ isVisible }) =>
    !isVisible &&
    css`
      ${a11yHidden}
    `};
`;

export default Button;
