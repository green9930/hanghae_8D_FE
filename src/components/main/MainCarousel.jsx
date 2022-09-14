import styled from "styled-components";
import MainCarouselCard from "./MainCarouselCard";
import icons from "assets";
import { colors } from "styles/theme";
import { getRandomCards } from "api/mainApi";
import { useQuery } from "react-query";

const MainCarousel = () => {

  const { IconArrow } = icons;
  
 //데이터 Read
 const checkRandomLists= useQuery("randomList",getRandomCards,{
  refetchOnWindowFocus: false,
  onSuccess:(data)=>{
    console.log(data.data.data)
  }
 })


 if (checkRandomLists.isLoading) {
  return null;
}
  return (
    <StMainRandomContainer>
      <StMainRandomTitle>
        <IconArrow fill={colors.mainO}/>
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
  background-color: ${colors.mainP};
  width: 100%;
  padding-bottom: 20px;
  height: 240px;
  box-sizing:border-box;
`;
const StMainRandomTitle = styled.div`
  text-align: center;
  padding-top: 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  padding-top:20px;
  color: ${colors.white};
  font-family: 'twayfly', 'Noto Sans KR', sans-serif;
 
`;
const StMainTitleSpan = styled.span`
  font-style: normal;
  font-family: 'twayfly', 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 20px;
  margin-left: 10px;
  color:${colors.mainO};
`;
const StMainRandomImg = styled.div`
  display: flex;
  gap: 10px;
  overflow: scroll;
  padding: 10px 10px 0px 10px ;
  ::-webkit-scrollbar {
    display: none;
  }
  
`;

export default MainCarousel;
