import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import handleRankColor from "utils/handleRankColor";
import { colors } from "styles/theme";
import { fontSize } from "styles/theme";

const MainListCard = ({ data }) => {
  const navigate = useNavigate();

  const MAX_TITLE_LENGTH = 13;
  const MIN_TITLE_LENGTH = 0; //13자리까지 보이고 나머지는 ⋯

  const {
    articlesId,
    nickName,
    process,
    title,
    price,
    image,
    selectedPrice,
    userRank,
  } = data; //메인리스트에서 받아 온 data 구조 분해

  return (
    <StMainContainer>
      <StMainWrap
        selectedPrice={selectedPrice}
        onClick={() => navigate(`/detail/${articlesId}`)}
      >
        <StImage>
          <StMainListImg src={image} alt="이미지" />
        </StImage>
        <StMainDesc>
          <StFirstLine>
            <StTitle selectedPrice={selectedPrice}>
              {title.length < MAX_TITLE_LENGTH
                ? title
                : title.slice(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH) + "⋯"}
            </StTitle>
            <StMainProcess process={process}>{process}</StMainProcess>
          </StFirstLine>
          <StSeller
            selectedPrice={selectedPrice}
            rankColor={handleRankColor(userRank)}
          >
            <span>{userRank}</span>
            {nickName}
          </StSeller>
          <StPrice selectedPrice={selectedPrice}>
            {selectedPrice ? (
              <div>
                <StSelectedPrice>채택가</StSelectedPrice>
                <span>{selectedPrice}</span>원
              </div>
            ) : (
              <div>
                <span>{price}</span>원
              </div>
            )}
          </StPrice>
        </StMainDesc>
      </StMainWrap>
    </StMainContainer>
  );
};

const StMainContainer = styled.div`
  padding: 0px 20px;
`;

const StMainWrap = styled.div`
  display: flex;
  padding: 15px;
  gap: 10px;
  height: 100px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 10px auto;
  color: ${({ selectedPrice }) =>
    selectedPrice ? `${colors.grey3}` : `${colors.black}`};
  background-color: ${({ selectedPrice }) =>
    selectedPrice ? `${colors.grey7}` : `${colors.white}`};
`;
const StImage = styled.div`
  min-width: 70px;
  min-height: 70px;
`;
const StMainListImg = styled.img`
  object-fit: cover;
  width: 70px;
  height: 70px;
`;

const StMainDesc = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const StFirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StTitle = styled.p`
  font-size: ${fontSize.regular14};
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const StSeller = styled.div`
  font-size: ${fontSize.small12};
  letter-spacing: -3%;
  display: flex;
  align-items: center;

  span {
    color: ${({ rankColor }) => rankColor};
    padding-right: 4px;
  }
`;

const StPrice = styled.div`
  text-align: right;

  div {
    font-size: ${fontSize.small10};
    letter-spacing: -0.5px;
  }

  span {
    font-size: ${fontSize.large20};
    font-weight: 700;
    line-height: 18px;
    padding-right: 2px;
    align-items: right;
  }
`;

const StSelectedPrice = styled.p`
  display: inline-block;
  color: ${colors.grey3};
  font-size: ${fontSize.regular14};
  letter-spacing: -5%;
`;

const StMainProcess = styled.div`
  width: 50px;
  height: 20px;
  font-size: ${fontSize.small10};
  text-align: center;
  line-height: 20px;
  border-radius: 30px;
  background-color: ${({ process }) =>
    process === "진행중" ? `${colors.red}` : `${colors.subP}`};
  color: ${({ process }) =>
    process === "진행중" ? `${colors.white}` : `${colors.mainP}`};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
`;

export default MainListCard;
