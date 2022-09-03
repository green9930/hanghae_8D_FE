import styled from "styled-components";

const MainCarouselCard = ({ data }) => {
  const { articlesId, title, price, image } = data;

  return (
    <StImgBox>
      <StImg src={image} alt="이미지" />
      <div>{title.length < 7 ? title : title.slice(0, 7) + "..."}</div>
      <p>{price}원</p>
    </StImgBox>
  );
};
const StImgBox = styled.div`
  width: 120px; 
  height: 160px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
`;

const StImg = styled.img`
  width: 100px;
  height: 100px;
`;

export default MainCarouselCard;
