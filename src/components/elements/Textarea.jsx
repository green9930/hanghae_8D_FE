import styled from "styled-components";
import { a11yHidden } from "styles/mixin";
import { colors } from "styles/theme";

const Textarea = ({ Label, isHide, onChangeHandler, placeholder,value,name}) => {
  return (
    <StTextareaContainer>
      <label htmlFor="textarea" className={isHide ? "a11y-hidden" : ""}>
        {Label}
      </label>
      <StTextarea
        id="textarea"
        name="desc"
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
      ></StTextarea>
    </StTextareaContainer>
  );
};

Textarea.defaultProps = {
  Label: "",
  isHide: false,
  onChangeHandler: null,
  placeholder: "품목에 대한 설명을 작성해 주세요.",
  
};

const StTextareaContainer = styled.div`
  .a11y-hidden {
    ${a11yHidden}
  };
`;

const StTextarea = styled.textarea`
padding:12px 20px;
width:100%;
height:120px;
resize: none;
border: 0.5px solid #999999;
::placeholder {
    color:  ${colors.gray3}}
    font-size:16px
`;

export default Textarea;
