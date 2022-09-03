import styled from "styled-components";
import MainCarouselCard from "./MainCarouselCard";
import test01 from "assets/test01.jpg";
import test02 from "assets/test02.jpg";
import test03 from "assets/test03.jpg";
import test04 from "assets/test04.jpg";
import icons from "assets";

const MainCarousel = () => {
  const datas = [
    {
      articlesId: 1,
      title: "에어팟 중고",
      price: "79,000",
      image: test01,
    },
    {
      articlesId: 2,
      title: "맥북",
      price: "10,000,000",
      image: test02,
    },
    {
      articlesId: 3,
      title: "아이폰",
      price: "300,000",
      image: test03,
    },
    {
      articlesId: 4,
      title: "중고물품사세요플리즈",
      price: "3,300,000",
      image: test04,
    },
  ];

  const { IconArrow } = icons;

  return (
    <StMainRandomContainer>
      <StMainRandomTitle>
        <IconArrow />
        <StMainTitleSpan>책첵</StMainTitleSpan> 진행 중 체크
      </StMainRandomTitle>
      <StMainRandomImg>
        {datas.map((data) => (
          <MainCarouselCard key={data.articlesId} data={data} />
        ))}
      </StMainRandomImg>
    </StMainRandomContainer>
  );
};
const StMainRandomContainer = styled.div`
  background-color: #9083f7;
  width: 100%;
  padding-bottom: 30px;
  height: 240px;
`;
const StMainRandomTitle = styled.div`
  text-align: center;
  padding: 20px 0px 10px 0px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  color: white;
`;
const StMainTitleSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  margin-left: 10px;
  color: #f9d9c2;
`;
const StMainRandomImg = styled.div`
  display: flex;
  gap: 10px;
  overflow: scroll;
  padding: 0px 20px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MainCarousel;
