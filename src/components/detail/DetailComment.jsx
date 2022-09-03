import styled from "styled-components";
import { ReactComponent as BSalectPurple } from "assets/B_salect_purple.svg";
import { ReactComponent as BSalectWhite } from "assets/B_salect_white.svg";
import { ReactComponent as IconTrash } from "assets/icon_trash.svg";
import { colors } from "styles/theme";
import handleRankColor from "utils/handleRankColor";

const DetailComment = ({ commentVal, isMyArticles }) => {
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
            {isMyComment && <IconTrash />}
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
              {isMyArticles && !isSelected ? <BSalectPurple /> : null}
              {isSelected && <BSalectWhite />}
              {isMyComment && <IconTrash />}
            </StBtnContainer>
          </StPriceContainer>
        </StPriceComment>
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
  font-size: 12px;
  line-height: 19px;
`;

const StTextBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
