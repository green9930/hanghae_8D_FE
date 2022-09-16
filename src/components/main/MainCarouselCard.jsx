import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/theme";

const MainCarouselCard = ({ data }) => {
  const { articlesId, title, price, image } = data;
  const navigate = useNavigate();

  const onClickDetail = () => navigate(`/detail/${articlesId}`);

  return (
    <StImgBox onClick={onClickDetail}>
      <StImg src={image} alt="이미지" />
      <StTitle>{title.length < 6 ? title : title.slice(0, 6) + "⋯"}</StTitle>
      <StPrice>
        {price}
        <span>원</span>
      </StPrice>
    </StImgBox>
  );
};

const StImgBox = styled.div`
  background-color: ${colors.white};
  min-width: 120px;
  min-height: 160px;
  border-radius: 10px;
`;

const StTitle = styled.div`
  padding-left: 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const StPrice = styled.p`
  padding-right: 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: right;

  span {
    margin-left: 2px;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: -0.5px;
  }
`;

const StImg = styled.img`
  height: 110px;
  width: 120px;
  border-radius: 10px 10px 0px 0px;
`;

export default MainCarouselCard;
