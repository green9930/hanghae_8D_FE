import styled, { css } from "styled-components";
import { a11yHidden } from "styles/mixin";
import { colors, fontSize } from "styles/theme";

/* theme -------------------------------------------------------------------- */
// grey : 회색
// price : 가격
// comment : 일반 댓글

const Input = ({
  value,
  type,
  id,
  name,
  placeholder,
  width,
  labelText,
  isHide,
  onChangeHandler,
  theme,
}) => {
  return (
    <StInputContainer>
      <label htmlFor={id} className={isHide ? "a11y-hidden" : ""}>
        {labelText}
      </label>
      <StInput
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        width={width}
        onChange={onChangeHandler}
        theme={theme}
      />
    </StInputContainer>
  );
};

Input.defaultProps = {
  id: "",
  labelText: "",
  isHide: false,
  value: "",
  type: "text",
  name: "",
  placeholder: "내용을 입력해 주세요",
  width: "100%",
  onChangeHandler: null,
};

const StInputContainer = styled.div`
  .a11y-hidden {
    ${a11yHidden}
  }
`;

const StInput = styled.input`
  ::placeholder {
    color: ${({ theme }) => {
      if (theme === "grey") return `${colors.grey3}`;
      if (theme === "price") return `${colors.grey4}`;
      if (theme === "comment") return `${colors.white}`;
    }};
    font-weight: 400;
    font-size: ${({ theme }) => {
      if (theme === "grey" || theme === "price") return `${fontSize.regular16}`;
      if (theme === "comment") return `${fontSize.small12}`;
    }};
  }

  width: ${(props) => `${props.width}`};
  color: ${colors.black};

  ${({ theme }) => {
    if (theme === "grey") {
      return css`
        height: 40px;
        border: 0.5px solid ${colors.grey3};
        border-radius: 5px;
        padding: 12px 10px;
        text-align: center;
      `;
    }

    if (theme === "price") {
      return css`
        height: 50px;
        border: none;
        border-radius: 30px;
        padding: 12px 60px;
        background: ${colors.mainP};
      `;
    }

    if (theme === "comment") {
      return css`
        height: 40px;
        border: 0.5px solid ${colors.subP};
        border-radius: 20px;
        padding: 12px 14px;
        background: transparent;
      `;
    }
  }}
`;

export default Input;
