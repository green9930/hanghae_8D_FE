import { useState } from "react";
import styled from "styled-components";

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
  const MAX_LENGTH = 48;
  const styledPrice = content.substr(0, MAX_LENGTH);

  return (
    <StDetailDesc>
      <StSubInfo>
        <span>카테고리&gt;{category}</span>
        <span>
          {userRank}/{nickName}
        </span>
      </StSubInfo>
      <h2>{title}</h2>
      <StPrice>
        책정가 <span>{price}</span> 원
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
  span {
  }
`;

const StPrice = styled.div`
  text-align: right;

  span {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 600;
  }
`;

const StDesc = styled.p`
  margin-top: 14px;
  height: ${({ isShow }) => (isShow ? "100%" : "40px")};
  position: relative;

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
