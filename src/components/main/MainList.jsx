import styled from "styled-components";
import test01 from "assets/test01.jpg";
import test02 from "assets/test02.jpg";
import test03 from "assets/test03.jpg";
import test04 from "assets/test04.jpg";
import MainListCard from "./MainListCard";

const MainList = () => {
  const datas = [
    {
      articlesId: 1,
      title: "에어팟 중고",
      price: "79,000",
      image: test01,
      nickName: "배근아",
      process: "진행중",
      userRank: "G",
    },
    {
      articlesId: 2,
      title: "맥북",
      price: "10,000,000",
      image: test02,
      nickName: "김단비",
      process: "채택 성공",
      selectedPrice: "100,000",
      userRank: "B",
    },
    {
      articlesId: 3,
      title: "아이폰",
      price: "300,000",
      image: test03,
      nickName: "김원호",
      process: "진행중",
      userRank: "S",
    },
    {
      articlesId: 4,
      title: "중고물품사세요플리즈",
      price: "3,300,000",
      image: test04,
      nickName: "배지영",
      process: "채택 성공",
      selectedPrice: "100,000",
      userRank: "D",
    },
  ];
  return (
    <StMainContainer>
      {datas.map((data) => (
        <MainListCard key={data.articlesId} data={data} />
      ))}
      <StAddList>
        <div />
        <div />
      </StAddList>
    </StMainContainer>
  );
};

const StMainContainer = styled.div`
  position: relative;
  
`;

const StAddList = styled.div`
  position: sticky;
  bottom:4%; 
  left:80%;
  background-color: #9083f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 50px;
  height: 50px;
  div {
    background-color: #ffffff;
    width: 2rem;
    height: 0.25rem;
    position: absolute;
    top: 50%;
    left: 50%; 
    margin-left: -1rem;; /* width의 50% */
    margin-top: -0.125rem;
    &:nth-child(1) {
      transform: rotate(90deg);
    }
  }
`;

export default MainList;
