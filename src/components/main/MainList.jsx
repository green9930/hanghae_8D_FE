import styled from "styled-components";
import test01 from "assets/test01.jpg";
import test02 from "assets/test02.jpg";
import test03 from "assets/test03.jpg";
import test04 from "assets/test04.jpg";
import MainListCard from "./MainListCard";
import icons from "assets"
import { useNavigate } from "react-router-dom";


const MainList = () => {
  const {IconPlus}=icons;
  const navigate=useNavigate()
  const onClickHandler=()=>{
navigate("/form")
  }
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
      <StIcon onClick={onClickHandler}>
      <IconPlus/>  
      </StIcon>
    </StMainContainer>
  );
};

const StMainContainer = styled.div`
  position: relative;
  
`;

const StIcon = styled.div`
  position: sticky;
  bottom:4%; 
  left:80%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;

export default MainList;
