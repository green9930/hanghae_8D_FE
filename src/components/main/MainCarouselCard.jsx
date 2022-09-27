import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/theme";
import { fontSize } from "styles/theme";

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
  filter: drop-shadow(0px 4px 13px rgba(0, 0, 0, 0.25));
`;

const StTitle = styled.div`
  padding-left: 10px;
  font-size: ${fontSize.regular16};
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const StPrice = styled.p`
  padding-right: 12px;
  font-size: ${fontSize.regular16};
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: right;
  font-family: "Roboto", sans-serif;

  span {
    margin-left: 2px;
    font-size: ${fontSize.small10};
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
