import Button from "components/elements/Button";
import Input from "components/elements/Input";
import styled from "styled-components";

const DetailCommentForm = () => {
  return (
    <StCommentForm>
      <StInput>
        <Input />
        <Button />
      </StInput>
    </StCommentForm>
  );
};

const StCommentForm = styled.form`
  background: darkgray;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 5px 20px;
`;

const StInput = styled.div`
  position: relative;

  input {
    width: 100%;
  }

  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`;

export default DetailCommentForm;
