import { useRef, useState } from "react";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";
import { useMutation, useQueryClient } from "react-query";
import { postComment } from "api/detailApi";
import handlePrice from "utils/handlePrice";

const DetailCommentForm = ({ isMyArticles, articlesId }) => {
  // const commentRef = useRef();
  const [commentPrice, setCommentPrice] = useState("");
  const [realCommentPrice, setRealCommentPrice] = useState({
    articlesId: articlesId,
    type: "price",
    comment: "",
  });
  const [commentText, setCommentText] = useState({
    articlesId: articlesId,
    type: "text",
    comment: "",
  });
  const [isPriceActive, setIsPriceActive] = useState(false);
  const [isTextActive, setIsTextActive] = useState(false);

  const MAX_LENGTH_TEXT = 80;

  const queryClient = useQueryClient();
  const { mutate: postMutate } = useMutation(postComment, {
    onSuccess: (data) => {
      console.log("POST COMMENTS", data);
      // console.log("commentRef.current", commentRef.current);
      // commentRef.current.focus();
      queryClient.invalidateQueries("checkComments");
      setCommentText({ ...commentText, comment: "" });
      setRealCommentPrice({ ...realCommentPrice, comment: "" });
      setCommentPrice("");
      setIsTextActive(false);
      setIsPriceActive(false);
    },
    onError: ({ response }) => {
      console.log("POST COMMENT ERROR", response.data.errorMessage); // 댓글은 10개 이상 작성이 불가능합니다.
      setCommentPrice("");
      setCommentText({ ...commentText, comment: "" });
      setIsTextActive(false);
      setIsPriceActive(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let target = "";
    if (name === "price") {
      const { isValid, realPrice, previewPrice } = handlePrice(value);
      console.log(isValid, realPrice, previewPrice);
      isValid ? setIsPriceActive(true) : setIsPriceActive(false);
      setRealCommentPrice({ ...realCommentPrice, comment: realPrice });
      setCommentPrice(previewPrice);
    }
    if (name === "text") {
      target = value.substr(0, MAX_LENGTH_TEXT);
      target.length ? setIsTextActive(true) : setIsTextActive(false);
      setCommentText({ ...commentText, comment: target });
    }
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    console.log("REALCOMMENTPRICE", realCommentPrice);
    postMutate(realCommentPrice);
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    console.log("REALCOMMENTTEXT", commentText);
    postMutate(commentText);
  };

  return (
    <StCommentFormContainer>
      {!isMyArticles && (
        <form onSubmit={handleSubmitPrice}>
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
        </form>
      )}
      <form onSubmit={handleSubmitText}>
        <StTextInput>
          <Input
            value={commentText.comment}
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
      </form>
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

const StPriceInput = styled.div`
  position: absolute;
  top: -65px;
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
