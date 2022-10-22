import { useQuery } from "react-query";
import styled from "styled-components";
import Slider from "react-slick";
import { isMobile } from "react-device-detect";
import icons from "assets";
import { fontSize, colors } from "styles/theme";
import { getRandomCards } from "api/mainApi";
import LoadingMessage from "components/etc/LoadingMessage";
import MainCarouselCard from "components/main/MainCarouselCard";

const MainCarousel = () => {
  const { MainArrow } = icons;
  const settings = {
    infinite: true,
    arrows: false,
    dots: false,
    initialSlide: 0,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 1600,
    pauseOnHover: true,
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
        {isMobile ? (
          <StMainRandomImg>
            {data.data.data?.map((data) => (
              <MainCarouselCard key={data.articlesId} data={data} />
            ))}
          </StMainRandomImg>
        ) : (
          <StSlider>
            <Slider {...settings}>
              {data.data.data?.map((data) => (
                <MainCarouselCard key={data.articlesId} data={data} />
              ))}
            </Slider>
          </StSlider>
        )}
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
  padding: 15px 0px 35px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const StSlider = styled.div`
  padding: 15px 0px 35px;
  .slick-slide {
    padding-right: 10px;
  }
`;

export default MainCarousel;
