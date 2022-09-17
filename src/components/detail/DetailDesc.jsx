import React, { useState, useEffect } from "react";
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
}) => {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [styledContent, setStyledContent] = useState([]);

  const MAX_LENGTH = 44;
  const MAX_NEWLINE = 2;

  const contentVali = (content) => {
    if (!content.includes("\n") && content.length < MAX_LENGTH) return;
    if (content.includes("\n")) {
      const newlineNum = content.split("\n")?.length - 1;
      if (newlineNum >= MAX_NEWLINE) {
        setShowMoreBtn(true);
        const splitContent = content.split("\n").slice(0, 2);
        splitContent[1] = splitContent[1].substr(0, 20);
        setStyledContent(splitContent);
      }
    } else {
      if (content.length >= MAX_LENGTH) {
        setShowMoreBtn(true);
        setStyledContent([content.substr(0, MAX_LENGTH)]);
      }
    }
  };

  useEffect(() => {
    contentVali(content);
  }, [content]);

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
          {process === "채택 성공" ? "채택가" : null}
          <span>{process === "채택 성공" ? selectedPrice : price}</span> 원
        </StPriceText>
      </StPrice>
      {content.length < MAX_LENGTH && styledContent.length < MAX_NEWLINE ? (
        <StDesc isShow={false}>{content}</StDesc>
      ) : (
        <StDesc isShow={!showMoreBtn}>
          {showMoreBtn ? (
            <>
              {styledContent.map((val, idx) => (
                <React.Fragment key={`${val}-${idx}`}>
                  {styledContent.length === 1 ? (
                    `${styledContent}⋯`
                  ) : (
                    <>
                      {idx === 1 && styledContent[1].length === 20
                        ? `${val}⋯`
                        : val}
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
              <button onClick={() => setShowMoreBtn(false)}>
                <span>더 보기</span>
              </button>
            </>
          ) : (
            <>
              {content.split("\n").map((val, idx) => (
                <React.Fragment key={`${val}-${idx}`}>
                  {val}
                  <br />
                </React.Fragment>
              ))}
            </>
          )}
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
  word-break: break-all;

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
