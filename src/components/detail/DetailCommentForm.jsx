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
import { commentRefState, loginState } from "state/atom";
import { colors, fontSize } from "styles/theme";
import { removeCookie } from "api/cookies";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

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
  const [errorData, setErrorData] = useState({
    errorCode: "",
    errorMessage: "",
  });

  const setIsLogin = useSetRecoilState(loginState);
  const setCommentRefState = useSetRecoilState(commentRefState);

  const navigate = useNavigate();
  const MAX_LENGTH_TEXT = 80;

  const queryClient = useQueryClient();

  const { mutate: postMutate, isLoading: postIsLoading } = useMutation(
    postComment,
    {
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
        setErrorData({
          errorCode: response.data.errorCode,
          errorMessage: response.data.errorMessage,
        });
        setOpenCommentNumAlert(true);
        setCommentPrice("");
        setCommentText({ ...commentText, comment: "" });
        setIsTextActive(false);
        setIsPriceActive(false);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    let target = "";
    if (name === "price") {
      const { isValid, realPrice, previewPrice } = handlePrice(
        value.replace(" ", "")
      );
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

  const handleCommentAlert = () => {
    if (errorData.errorCode === "405") {
      setIsLogin(false);
      removeCookie("accessToken");
      removeCookie("refreshToken");
      navigate("/login");
    }
    setOpenCommentNumAlert(false);
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    if (realCommentPrice.comment.trim().length === 0) return;
    postMutate(realCommentPrice);
  };

  const handleSubmitText = (e) => {
    e.preventDefault();
    if (commentText.comment.trim().length === 0) return;
    postMutate(commentText);
  };

  return (
    <StCommentFormContainer>
      {!isMyArticles && (
        <StPriceForm
          isPriceActive={isPriceActive}
          onSubmit={handleSubmitPrice}
          isMobile={isMobile}
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
            isDisabled={!isPriceActive ? (postIsLoading ? true : false) : false}
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
            isDisabled={!isTextActive ? (postIsLoading ? true : false) : false}
          >
            <span>전송</span>
          </Button>
        </StTextInput>
      </StTextForm>
      {openCommentNumAlert && (
        <Modal handleOpenModal={handleCommentAlert}>
          <CommentNumAlert
            errorData={errorData}
            handleOpenModal={handleCommentAlert}
          />
        </Modal>
      )}
    </StCommentFormContainer>
  );
};

const StCommentFormContainer = styled.div`
  width: 100%;
`;

const StPriceForm = styled.form`
  position: fixed;
  bottom: 50px;
  padding: 5px 20px;
  z-index: 111;
  width: ${({ isMobile }) => (isMobile ? "100%" : "500px")};
  @media screen and (max-width: 950px) {
    width: 100%;
  }

  input {
    color: ${colors.white};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    ::placeholder {
      font-weight: 400 !important;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: ${colors.white};
  }

  button {
    width: 120px;
    height: 40px;
    position: absolute;
    top: 45%;
    right: 25px;
    @media screen and (max-width: 350px) {
      right: 15px;
    }
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
  position: absolute;
  bottom: 0;
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

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: ${colors.white};
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
