import { useQuery } from "react-query";
import styled from "styled-components";
import MainCarouselCard from "components/main/MainCarouselCard";
import { getRandomCards } from "api/mainApi";
import { colors } from "styles/theme";
import icons from "assets";
import { fontSize } from "styles/theme";
import { isMobile } from "react-device-detect";

const MainCarousel = () => {
  const { MainArrow } = icons;

  /* -------------------------------- 데이터 Read -------------------------------- */
  const checkRandomLists = useQuery("randomList", getRandomCards, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
  });

  if (checkRandomLists.isLoading) return null;

  return (
    <StMainRandomContainer>
      <StMainRandomTitle>
        <MainArrow fill={colors.mainO} />
        <StMainTitleSpan>책첵</StMainTitleSpan> 진행 중 체크
      </StMainRandomTitle>
      <StMainRandomImg isMobile={isMobile}>
        {checkRandomLists.data.data.data?.map((data) => (
          <MainCarouselCard key={data.articlesId} data={data} />
        ))}
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
  font-style: normal;
  font-weight: 400;
  font-size: ${fontSize.large20};
`;

const StMainTitleSpan = styled.span`
  margin-left: 6px;
  color: ${colors.mainO};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large20};
  font-style: normal;
  font-weight: 400;
`;

const StMainRandomImg = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  padding: 15px 20px 35px 20px;

  ::-webkit-scrollbar {
    display: ${({ isMobile }) => (isMobile ? "none" : null)};
  }
`;

export default MainCarousel;
