import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Modal from "components/layout/Modal";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import CommentNumAlert from "components/detail/CommentNumAlert";
import handlePrice from "utils/handlePrice";
import { postComment } from "api/detailApi";
import { commentRefState } from "state/atom";
import { colors, fontSize } from "styles/theme";

const DetailCommentForm = ({ isMyArticles, articlesId }) => {
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
  const [openCommentNumAlert, setOpenCommentNumAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setCommentRefState = useSetRecoilState(commentRefState);

  const MAX_LENGTH_TEXT = 80;

  const queryClient = useQueryClient();

  const { mutate: postMutate } = useMutation(postComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("checkComments");
      setCommentText({ ...commentText, comment: "" });
      setRealCommentPrice({ ...realCommentPrice, comment: "" });
      setCommentPrice("");
      setIsTextActive(false);
      setIsPriceActive(false);
      setCommentRefState(true);
    },
    onError: ({ response }) => {
      setErrorMessage(response.data.errorMessage);
      setOpenCommentNumAlert(true);
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
    postMutate(realCommentPrice);
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    postMutate(commentText);
  };

  return (
    <>
      <StCommentFormContainer>
        {!isMyArticles && (
          <StPriceForm
            isPriceActive={isPriceActive}
            onSubmit={handleSubmitPrice}
          >
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
          </StPriceForm>
        )}
        <StTextForm onSubmit={handleSubmitText}>
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
        </StTextForm>
        {openCommentNumAlert && (
          <Modal handleOpenModal={() => setOpenCommentNumAlert(false)}>
            <CommentNumAlert
              message={errorMessage}
              handleOpenModal={() => setOpenCommentNumAlert(false)}
            />
          </Modal>
        )}
      </StCommentFormContainer>
    </>
  );
};

const StCommentFormContainer = styled.div`
  width: 100%;
`;

const StPriceForm = styled.form`
  position: fixed;
  bottom: 50px;
  width: 100%;
  padding: 5px 20px;

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

const StTextForm = styled.form`
  position: relative;
  background: ${colors.grey1};
  width: 100%;
  padding: 5px 20px;
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
