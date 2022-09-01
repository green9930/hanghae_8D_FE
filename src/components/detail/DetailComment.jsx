import styled from "styled-components";

const DetailComment = ({ commentVal }) => {
  const { commentsId, type, nickName, userRank, comment, createdAt } =
    commentVal;

  return (
    <>
      {type === "text" ? (
        <StTextComment>
          <StSubInfo>
            <StName>{nickName}</StName>
            <StTime>{createdAt}</StTime>
          </StSubInfo>
          <StText>{comment}</StText>
        </StTextComment>
      ) : (
        <StPriceComment>
          <StSubInfo>
            <StName>{nickName}</StName>
            <StTime>{createdAt}</StTime>
          </StSubInfo>
          <StPrice>
            <span>{comment}</span> 원
          </StPrice>
        </StPriceComment>
      )}
    </>
  );
};

const StTextComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 7px 0;
`;

const StPriceComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 0;
`;

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;

const StName = styled.span`
  display: inline-block;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const StTime = styled.span`
  display: inline-block;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
`;

const StText = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 12px;
  line-height: 19px;
`;

const StPrice = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  span {
    font-size: 18px;
  }
  font-size: 10px;
`;

export default DetailComment;
