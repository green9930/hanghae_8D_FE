import { useQuery } from "react-query";
import styled from "styled-components";
import MainCarouselCard from "components/main/MainCarouselCard";
import { getRandomCards } from "api/mainApi";
import { colors } from "styles/theme";
import icons from "assets";
import { fontSize } from "styles/theme";
import LoadingMessage from "components/etc/LoadingMessage";
import Slider from "react-slick";

const MainCarousel = () => {
  const { MainArrow } = icons;
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    initialSlide: 0,
    // speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    // centerPadding: "30px",
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 1400,
    pauseOnHover: true,
    draggable: true,
  };

  /* -------------------------------- 데이터 Read -------------------------------- */
  const { data, isLoading } = useQuery("randomList", getRandomCards, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <LoadingMessage />;

  return (
    <StMainRandomContainer>
      <StMainRandomTitle>
        <MainArrow fill={colors.mainO} />
        <StMainTitleSpan>책첵</StMainTitleSpan> 진행 중 체크
      </StMainRandomTitle>
      <StMainRandomImg>
        <Slider {...settings}>
          {data.data.data?.map((data) => (
            <MainCarouselCard key={data.articlesId} data={data} />
          ))}
        </Slider>
      </StMainRandomImg>
    </StMainRandomContainer>
  );
};

const StMainRandomContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 240px;
  background-color: ${colors.mainP};
`;

const StMainRandomTitle = styled.div`
  padding-top: 10px;
  text-align: center;
  color: ${colors.white};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large20};
`;

const StMainTitleSpan = styled.span`
  margin-left: 6px;
  color: ${colors.mainO};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large20};
`;

const StMainRandomImg = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  padding: 15px 20px 35px 0px;
  /* ::-webkit-scrollbar {
    display: none;
  } */
  .slick-slide {
    padding-right: 10px;
  }
`;

export default MainCarousel;
