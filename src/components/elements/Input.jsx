import styled from "styled-components";
import { a11yHidden } from "styles/mixin";

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
  placeholder: "placeholder",
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
    font-size: 16px;
  }
  width: ${(props) => `${props.width}`};
`;

export default Input;
