import Button from "components/elements/Button";
import Input from "components/elements/Input";
import { useState } from "react";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";

const DetailCommentForm = () => {
  const [commentPrice, setCommentPrice] = useState("");
  const [realCommentPrice, setRealCommentPrice] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isPriceActive, setIsPriceActive] = useState(false);
  const [isTextActive, setIsTextActive] = useState(false);

  const MAX_LENGTH_NUM = 8;
  const MAX_LENGTH_TEXT = 80;

  const priceVali = (text) => {
    const regExp = /^[0-9\s+]*$/g;
    return regExp.test(text);
  };

  const handleChange = (e) => {
    let target = "";
    if (e.target.name === "price") {
      target = e.target.value.replaceAll(",", "").substr(0, MAX_LENGTH_NUM);
      if (priceVali(target)) {
        target.length ? setIsPriceActive(true) : setIsPriceActive(false);
        setRealCommentPrice(target);
        priceVali(target) &&
          setCommentPrice(target.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
    }
    if (e.target.name === "text") {
      target = e.target.value.substr(0, MAX_LENGTH_TEXT);
      target.length ? setIsTextActive(true) : setIsTextActive(false);
      setCommentText(target);
    }
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    console.log("REALCOMMENTPRICE", realCommentPrice);
    setCommentPrice("");
    setIsPriceActive(false);
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    console.log("REALCOMMENTTEXT", commentText);
    setCommentText("");
    setIsTextActive(false);
  };

  return (
    <StCommentFormContainer>
      <StCommentForm onSubmit={handleSubmitPrice}>
        <StPriceInput isPriceActive={isPriceActive}>
          <Input
            value={commentPrice}
            name="price"
            onChangeHandler={handleChange}
            theme="price"
            placeholder="가격을 입력해 주세요."
          />
          <Button
            type="submit"
            variant="text"
            theme="transparent"
            isDisabled={!isPriceActive}
          >
            <span>가격 전송</span>
          </Button>
        </StPriceInput>
      </StCommentForm>
      <StCommentForm onSubmit={handleSubmitText}>
        <StTextInput>
          <Input
            value={commentText}
            name="text"
            onChangeHandler={handleChange}
            theme="comment"
          />
          <Button
            type="submit"
            variant="text"
            theme="transparent"
            isDisabled={!isTextActive}
          >
            <span>전송</span>
          </Button>
        </StTextInput>
      </StCommentForm>
    </StCommentFormContainer>
  );
};

const StCommentFormContainer = styled.div`
  background: ${colors.grey1};
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 5px 20px;
`;

const StCommentForm = styled.form``;

const StPriceInput = styled.div`
  position: absolute;
  top: -75px;
  left: 0;
  padding: 5px 20px;
  width: 100%;

  input {
    color: ${colors.white};
    ::placeholder {
      font-weight: 400 !important;
    }
  }

  button {
    width: 120px;
    height: 40px;
    position: absolute;
    top: 45%;
    right: 25px;
    transform: translateY(-50%);

    span {
      font-family: "twayfly", "Noto Sans KR", sans-serif;
      font-size: ${fontSize.regular18};
      font-weight: 400;
      line-height: 100%;
      color: ${({ isPriceActive }) =>
        isPriceActive ? `${colors.mainO}` : `${colors.subP}`};
    }
  }
`;

const StTextInput = styled.div`
  position: relative;

  input {
    color: ${colors.white};
    padding-right: 50px;
  }

  button {
    width: 50px;
    height: 40px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    font-size: ${fontSize.small12};
  }
`;

export default DetailCommentForm;
