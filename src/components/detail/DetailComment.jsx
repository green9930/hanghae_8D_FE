import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import Modal from "components/layout/Modal";
import Button from "components/elements/Button";
import DeleteAlert from "components/detail/DeleteAlert";
import SelectAlert from "components/detail/SelectAlert";
import handleRankColor from "utils/handleRankColor";
import { selectComment } from "api/detailApi";
import { colors } from "styles/theme";
import icons from "assets";

const DetailComment = ({ commentVal, isMyArticles, articlesId, process }) => {
  const {
    commentsId,
    type,
    nickName,
    userRank,
    comment,
    createdAt,
    isSelected,
    isMyComment,
  } = commentVal;

  const [openSelectAlert, setOpenSelectAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const { BSalectPurple, BSalectWhite, IconTrash } = icons;
  const queryClient = useQueryClient();

  /* 댓글 채택 -------------------------------------------------------------------- */
  const { mutate: selectMutate } = useMutation(selectComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("detailCheck");
      queryClient.invalidateQueries("checkComments");
    },
    onError: ({ response }) => window.alert(response.data.errorMessage),
  });

  const handleSelectComment = () => {
    selectMutate({ articlesId: articlesId, commentsId: commentsId });
    setOpenSelectAlert(false);
  };

  const handleDeleteComment = () => setOpenDeleteAlert(true);
  const handleSelectAlert = () => setOpenSelectAlert(true);
  const handleDeleteAlert = () => setOpenDeleteAlert(false);

  return (
    <>
      {type === "text" ? (
        <StTextComment>
          <StTextContainer>
            <StSubInfo>
              <StUserRank rankColor={handleRankColor(userRank)}>
                {userRank}
              </StUserRank>
              <StName>{nickName}</StName>
              <StTime>{createdAt}</StTime>
            </StSubInfo>
            <StText>{comment}</StText>
          </StTextContainer>
          <StTextBtnContainer>
            {isMyComment && (
              <Button variant="image" onClickHandler={handleDeleteComment}>
                <IconTrash fill={`${colors.grey1}`} />
              </Button>
            )}
          </StTextBtnContainer>
        </StTextComment>
      ) : (
        <StPriceComment>
          <StSubInfo>
            <StUserRank rankColor={handleRankColor(userRank)}>
              {userRank}
            </StUserRank>
            <StName>{nickName}</StName>
            <StTime>{createdAt}</StTime>
          </StSubInfo>
          <StPriceContainer>
            <StPrice isSelected={isSelected}>
              <span>{comment}</span> 원
            </StPrice>
            <StPriceBtnContainer>
              {isMyArticles && !isSelected && process === "진행중" ? (
                isMyComment ? null : (
                  <Button variant="image" onClickHandler={handleSelectAlert}>
                    <BSalectWhite width="30px" height="30px" />
                  </Button>
                )
              ) : null}
              {isSelected ? <BSalectPurple width="30px" height="30px" /> : null}
              {isMyComment && !isSelected ? (
                <Button variant="image" onClickHandler={handleDeleteComment}>
                  <IconTrash fill={`${colors.grey1}`} />
                </Button>
              ) : null}
            </StPriceBtnContainer>
          </StPriceContainer>
        </StPriceComment>
      )}
      {openSelectAlert && (
        <Modal handleOpenModal={handleSelectComment}>
          <SelectAlert
            nickName={nickName}
            handleOpenModal={handleSelectComment}
          />
        </Modal>
      )}
      {openDeleteAlert && (
        <Modal handleOpenModal={handleDeleteAlert}>
          <DeleteAlert
            isArticle={false}
            commentsId={commentsId}
            handleOpenModal={handleDeleteAlert}
          />
        </Modal>
      )}
    </>
  );
};

const StTextComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
`;

const StPriceComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 0;
`;

const StTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

const StUserRank = styled.span`
  color: ${({ rankColor }) => rankColor};
  font-size: 12px;
  font-weight: 700;
`;

const StName = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
`;

const StTime = styled.span`
  display: inline-block;
  font-size: 12px;
`;

const StText = styled.p`
  font-size: 12px;
  line-height: 18px;
  word-break: break-all;
`;

const StTextBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
  }
`;

const StPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  flex-grow: 1;
`;

const StPrice = styled.span`
  flex-grow: 1;
  text-align: right;
  font-size: 10px;
  color: ${({ isSelected }) => (isSelected ? `${colors.mainP}` : "inherit")};

  span {
    text-align: right;
    font-family: "Roboto", "Noto Sans KR", sans-serif;
    font-size: 18px;
    font-weight: 700;
  }
`;

const StPriceBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
  }
`;

export default DetailComment;
