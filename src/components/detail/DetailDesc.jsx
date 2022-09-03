import { useState } from "react";
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
        {process === "done" && <StSelectedMessage>채택 완료</StSelectedMessage>}
        <StPriceText>
          책정가 <span>{price}</span> 원
        </StPriceText>
      </StPrice>
      <StDesc isShow={isShow}>
        {isShow ? `${content}` : `${styledPrice}⋯`}
        <button onClick={() => setIsShow(true)}>
          <span>더 보기</span>
        </button>
      </StDesc>
    </StDetailDesc>
  );
};

const StDetailDesc = styled.div`
  padding: 10px 35px;
  width: 100%;
  overflow: visible;
  h2 {
    font-size: 18px;
    margin: 2px 0;
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
    if (process === "process") return "flex-end";
    if (process === "done") return "space-between";
  }};
  color: ${({ process }) => process === "done" && `${colors.mainP}`};
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
  margin-top: 14px;
  height: ${({ isShow }) => (isShow ? "100%" : "40px")};
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
      font-size: 14px;
      font-weight: 500;
      text-decoration: underline;
    }
  }
`;

export default DetailDesc;
