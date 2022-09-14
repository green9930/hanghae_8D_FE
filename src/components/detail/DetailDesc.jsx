import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "styles/theme";
import handleRankColor from "utils/handleRankColor";

const DetailDesc = ({
  nickName,
  articlesId,
  title,
  content,
  category,
  price,
  isMyArticles,
  userRank,
  process,
  createdAt,
}) => {
  const [isShow, setIsShow] = useState(false);

  const MAX_LENGTH = 44;
  const styledPrice = content.substr(0, MAX_LENGTH);

  return (
    <StDetailDesc>
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
          채택가 <span>{price}</span> 원
        </StPriceText>
      </StPrice>
      {content.length < MAX_LENGTH ? (
        <StDesc isShow={false}>
          {content.split("\n").map((val, idx) => {
            return (
              <React.Fragment key={idx}>
                {val}
                <br />
              </React.Fragment>
            );
          })}
        </StDesc>
      ) : (
        // <StDesc isShow={false}>{content}</StDesc>
        <StDesc isShow={isShow}>
          {isShow ? `${content}` : `${styledPrice}⋯`}
          <button onClick={() => setIsShow(true)}>
            <span>더 보기</span>
          </button>
        </StDesc>
      )}
    </StDetailDesc>
  );
};

const StDetailDesc = styled.div`
  background: ${colors.grey7};
  width: 100%;
  padding: 10px 35px;
  overflow: visible;

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
  height: ${({ isShow }) => (isShow ? "100%" : "40px")};
  margin-top: 14px;
  position: relative;
  color: ${colors.grey1};

  button {
    display: ${({ isShow }) => (isShow ? "none" : "flex")};
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    align-items: center;
    justify-content: center;

    span {
      color: ${colors.grey1};
      font-size: 14px;
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;

export default DetailDesc;
