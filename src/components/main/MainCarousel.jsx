import { useQuery } from "react-query";
import styled from "styled-components";
import MainCarouselCard from "components/main/MainCarouselCard";
import { getRandomCards } from "api/mainApi";
import { colors } from "styles/theme";
import icons from "assets";

const MainCarousel = () => {
  const { IconArrow } = icons;

  /* -------------------------------- 데이터 Read -------------------------------- */
  const checkRandomLists = useQuery("randomList", getRandomCards, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
  });

  if (checkRandomLists.isLoading) return null;

  return (
    <StMainRandomContainer>
      <StMainRandomTitle>
        <IconArrow fill={colors.mainO} />
        <StMainTitleSpan>책첵</StMainTitleSpan> 진행 중 체크
      </StMainRandomTitle>
      <StMainRandomImg>
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
  padding-bottom: 20px;
`;

const StMainRandomTitle = styled.div`
  padding-top: 20px;
  text-align: center;
  color: ${colors.white};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
`;

const StMainTitleSpan = styled.span`
  margin-left: 10px;
  color: ${colors.mainO};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`;

const StMainRandomImg = styled.div`
  display: flex;
  gap: 10px;
  overflow: scroll;
  padding: 10px 10px 0px 10px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default MainCarousel;
