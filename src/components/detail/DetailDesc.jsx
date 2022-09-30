import React from "react";
import styled from "styled-components";
import handleRankColor from "utils/handleRankColor";
import { colors } from "styles/theme";

const DetailDesc = ({
  nickName,
  articlesId,
  title,
  content,
  category,
  price,
  selectedPrice,
  isMyArticles,
  userRank,
  process,
  createdAt,
  descRef,
}) => {
  return (
    <StDetailDesc ref={descRef}>
      <StSubInfo>
        <span>카테고리&gt;{category}</span>
        <span>
          <StUserRank rankColor={handleRankColor(userRank)}>
            {userRank}&nbsp;
          </StUserRank>
          {nickName}
        </span>
      </StSubInfo>
      <h2>{title}</h2>
      <StPrice process={process}>
        {process === "채택 성공" && (
          <StSelectedMessage>채택 완료</StSelectedMessage>
        )}
        <StPriceText>
          {process === "채택 성공" ? "채택가" : null}
          <span>{process === "채택 성공" ? selectedPrice : price}</span> 원
        </StPriceText>
      </StPrice>
      <StDesc>
        {content.split("\n").map((val, idx) => (
          <React.Fragment key={`${val}-${idx}`}>
            {val}
            <br />
          </React.Fragment>
        ))}
      </StDesc>
    </StDetailDesc>
  );
};

const StDetailDesc = styled.div`
  background: ${colors.grey7};
  width: 100%;
  padding: 10px 35px;
  overflow: visible;
  min-height: 150px;

  h2 {
    margin: 2px 0;
    font-size: 18px;
  }
`;

const StSubInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.grey2};
  font-weight: 400;
`;

const StUserRank = styled.span`
  color: ${({ rankColor }) => `${rankColor}`};
`;

const StPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ process }) => {
    if (process === "진행중") return "flex-end";
    if (process === "채택 성공") return "space-between";
  }};
  color: ${({ process }) => process === "채택 성공" && `${colors.mainP}`};
  text-align: right;
`;

const StPriceText = styled.span`
  span {
    display: inline-block;
    margin-left: 8px;
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    font-weight: 700;
  }
`;

const StSelectedMessage = styled.span`
  color: ${colors.mainP};
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const StDesc = styled.p`
  height: 100%;
  margin-top: 14px;
  position: relative;
  color: ${colors.grey1};
  word-break: break-all;
`;

export default DetailDesc;
