import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "components/elements/Button";
import { deleteComment, deleteDetailCheck } from "api/detailApi";
import { commentRefState, loginState } from "state/atom";
import { colors, fontSize } from "styles/theme";
import icons from "assets";
import { useState } from "react";
import { removeCookie } from "api/cookies";

const DeleteAlert = ({
  isArticle,
  commentsId,
  articlesId,
  handleOpenModal,
}) => {
  const [deleteData, setDeleteData] = useState({
    deleteMessage: "정말 삭제하시겠어요?",
    isError: false,
  });
  const setIsLogin = useSetRecoilState(loginState);
  const setCommentRefState = useSetRecoilState(commentRefState);
  const navigate = useNavigate();

  const { IconTrash } = icons;
  const queryClient = useQueryClient();

  /* 게시글 DELETE --------------------------------------------------------------- */
  const { mutate: detailDeleteMutate } = useMutation(deleteDetailCheck, {
    onSuccess: () => {
      queryClient.invalidateQueries("detailCheck");
      handleOpenModal();
      navigate("/");
    },
  });
  /* 댓글 DELETE ---------------------------------------------------------------- */
  const { mutate: commentDeleteMutate } = useMutation(deleteComment, {
    onSuccess: () => {
      setCommentRefState(false); // 댓글 삭제 시 댓글 목록 하단 포커스 이동 방지
      queryClient.invalidateQueries("checkComments");
      handleOpenModal();
    },
    // 댓글 삭제 중 회원 정보 만료된 경우
    onError: ({ response }) => {
      setDeleteData({
        isError: true,
        deleteMessage: response.data.errorMessage,
      });
    },
  });

  const handleDelete = () => {
    isArticle
      ? detailDeleteMutate(articlesId) // 게시글 삭제
      : commentDeleteMutate(commentsId); // 댓글 삭제
  };

  /* 405 에러 발생 시 모달 창 닫을 때 회원 토큰 제거 ------------------------------------------- */
  const handleCloseModal = () => {
    setIsLogin(false);
    removeCookie("accessToken");
    removeCookie("refreshToken");
    navigate("/login");
  };

  return (
    <StDeleteAlert>
      <StMessage isError={deleteData.isError}>
        <IconTrash width="40px" height="40px" fill={`${colors.mainP}`} />
        <span>{deleteData.deleteMessage}</span>
      </StMessage>
      <StButton>
        {deleteData.isError ? (
          <>
            <Button onClickHandler={handleCloseModal}>닫기</Button>
          </>
        ) : (
          <>
            <Button theme="grey" onClickHandler={handleDelete}>
              삭제하기
            </Button>
            <Button onClickHandler={handleOpenModal}>아니오</Button>
          </>
        )}
      </StButton>
    </StDeleteAlert>
  );
};

const StDeleteAlert = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StMessage = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 22px;
  padding-top: 10px;

  span {
    display: inline-block;
    text-align: center;
    font-size: ${({ isError }) =>
      isError ? `${fontSize.regular18}` : `${fontSize.large20}`};
  }
`;

const StButton = styled.div`
  display: flex;
`;

export default DeleteAlert;
