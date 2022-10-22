import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";
import { getCookie } from "api/cookies";

const MainCarouselCard = ({ data }) => {
  const { articlesId, title, price, image } = data;
  const navigate = useNavigate();

  const MAX_TITLE_LENGTH = 6;
  const MIN_TITLE_LENGTH = 0; //6자리까지 보이고 나머지는 ⋯

  const onClickDetail = () =>
    getCookie("accessToken")
      ? navigate(`/detail/${articlesId}`)
      : navigate("/login");

  return (
    <StImgBox onClick={onClickDetail}>
      <StImg src={image} alt="이미지" />
      <StTitle>
        {title.length < MAX_TITLE_LENGTH
          ? title
          : title.slice(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH) + "⋯"}
      </StTitle>
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
  cursor: pointer;
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
