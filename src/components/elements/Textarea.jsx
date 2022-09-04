import styled from "styled-components";
import { a11yHidden } from "styles/mixin";

const Textarea = ({ Label, isHide, onChangeHandler, placeholder }) => {
  return (
    <StTextareaContainer>
      <label htmlFor="textarea" className={isHide ? "a11y-hidden" : ""}>
        {Label}
      </label>
      <StTextarea
        id="textarea"
        name="content"
        placeholder={placeholder}
        onChange={onChangeHandler}
      ></StTextarea>
    </StTextareaContainer>
  );
};

Textarea.defaultProps = {
  Label: "",
  isHide: false,
  changeHandler: null,
  placeholder: "품목에 대한 설명을 작성해 주세요.",
};

const StTextareaContainer = styled.div`
  .a11y-hidden {
    ${a11yHidden}
  };
`;

const StTextarea = styled.textarea`
width:100%;
height:120px;
resize: none;
  border: 0.5px solid #999999;
`;

export default Textarea;
