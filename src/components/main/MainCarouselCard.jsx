import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/theme";

const MainCarouselCard = ({ data }) => {
  const { articlesId, title, price, image } = data;
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(`/detail/${articlesId}`);
  };
  return (
    <StImgBox onClick={onClickDetail}>
      <StImg src={image} alt="이미지" />
      <StTitle>{title.length < 9 ? title : title.slice(0, 9) + "⋯"}</StTitle>
      <StPrice>
        {price}
        <span>원</span>
      </StPrice>
    </StImgBox>
  );
};
const StImgBox = styled.div`
  min-width: 120px;
  min-height: 160px;
  border-radius: 10px;
  background-color: ${colors.white}; ;
`;
const StTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  padding-left: 10px;
`;
const StPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: right;
  padding-right: 12px;
  span {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: -0.5px;
    margin-left: 2px;
  }
`;

const StImg = styled.img`
  width: 100%;
  height: 110px;
  border-radius: 10px 10px 0px 0px;
`;

export default MainCarouselCard;
