import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";

const MyListCard = ({ item }) => {
  const { articlesId, title, price, selectedPrice, image, process, point } =
    item;
  const navigate = useNavigate();

  const handleGoToDetail = () => navigate(`/detail/${articlesId}`);

  return (
    <StMyListCard onClick={process === "진행중" ? handleGoToDetail : null}>
      <img alt="thumbnail" src={image} />
      <StMainInfo process={process}>
        <h2>{title}</h2>
        <StPrice>
          <span>{process === "진행중" ? "" : "채택가 "}</span>
          {process === "진행중" ? `${price}` : `${selectedPrice}`}
          <span>원</span>
        </StPrice>
      </StMainInfo>
      <StSubInfo>
        <StProcess process={process}>{process}</StProcess>
        <StPoint>+ {point}P</StPoint>
      </StSubInfo>
    </StMyListCard>
  );
};

const StMyListCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 70px;
  padding: 15px 35px;

  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`;

const StMainInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: ${colors.grey8};
  color: ${({ process }) =>
    process === "진행중" ? `${colors.black}` : `${colors.grey2}`};

  h2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    font-size: ${fontSize.regular14};
    font-weight: 700;
    letter-spacing: -0.5px;
    height: 18px;
    line-height: 18px;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StPrice = styled.span`
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.regular16};
  font-weight: 700;
  letter-spacing: -0.5px;

  span {
    font-family: "Noto Sans KR", sans-serif;
    font-size: ${fontSize.small10};
    font-weight: 400;
  }
`;

const StSubInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StProcess = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 20px;
  border-radius: 30px;
  background: ${({ process }) =>
    process === "진행중" ? `${colors.red}` : `${colors.subP}`};
  color: ${({ process }) =>
    process === "진행중" ? `${colors.white}` : `${colors.mainP}`};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.small10};
  font-weight: 400;
  text-align: center;
`;

const StPoint = styled.span`
  color: ${colors.mainP};
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-weight: 700;
  letter-spacing: -0.05em;
`;

export default MyListCard;
