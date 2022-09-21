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

  const { mutate: selectMutate } = useMutation(selectComment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("detailCheck");
      queryClient.invalidateQueries("checkComments");
    },
  });

  const handleSelectComment = () => {
    selectMutate({ articlesId: articlesId, commentsId: commentsId });
    setOpenSelectAlert(true);
  };

  const handleDeleteComment = () => setOpenDeleteAlert(true);
  const handleSelectAlert = () => setOpenSelectAlert(false);
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
            <StBtnContainer>
              {isMyArticles && !isSelected && process === "진행중" ? (
                isMyComment ? null : (
                  <Button variant="image" onClickHandler={handleSelectComment}>
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
            </StBtnContainer>
          </StPriceContainer>
        </StPriceComment>
      )}
      {openSelectAlert && (
        <Modal handleOpenModal={handleSelectAlert}>
          <SelectAlert
            nickName={nickName}
            handleOpenModal={handleSelectAlert}
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
  margin-right: 4px;
  font-size: 12px;
  line-height: 18px;
  word-break: break-all;
`;

const StTextBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
`;

const StPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StPrice = styled.span`
  text-align: center;
  font-size: 10px;
  color: ${({ isSelected }) => (isSelected ? `${colors.mainP}` : "inherit")};

  span {
    font-family: "Roboto", "Noto Sans KR", sans-serif;
    font-size: 18px;
    font-weight: 700;
  }
`;

const StBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default DetailComment;
