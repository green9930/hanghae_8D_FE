import styled from "styled-components";
import handleRankColor from "utils/handleRankColor";
import { colors } from "styles/theme";

const MainListCard = ({ data }) => {
  const {
    articlesId,
    nickName,
    process,
    title,
    price,
    image,
    selectedPrice,
    userRank,
  } = data;
  return (
    <>
      <StMainContainer selectedPrice={selectedPrice}>
        <StMainListImg src={image} alt="이미지" />
        <StMainDesc>
          <StTitle selectedPrice={selectedPrice}>
            {title.length < 12 ? title : title.slice(0, 12) + "..."}
          </StTitle>
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
        <StMainProcess process={process}>{process}</StMainProcess>
      </StMainContainer>
    </>
  );
};
const StMainContainer = styled.div`
  display: flex;
  padding: 15px 35px;
  gap: 10px;
  color: ${({ selectedPrice }) =>
    selectedPrice ? `${colors.grey3}` : `${colors.black}`};
`;

const StMainListImg = styled.img`
  width: 70px;
  height: 70px;
`;
const StMainDesc = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: center;
`;
const StTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;
const StSeller = styled.div`
  font-size: 12px;
  letter-spacing: -3%;
  span {
    color: ${({ selectedPrice, rankColor }) =>
      selectedPrice ? `${colors.grey3}` : rankColor};
    padding-right: 4px;
  }
`;
const StPrice = styled.div`
  div {
    font-size: 10px;
    letter-spacing: -0.5px;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    line-height: 18px;
    padding-right: 2px;
  }
`;

const StSelectedPrice = styled.p`
  display: inline-block;
  color: ${colors.grey3};
  font-size: 14px;
  letter-spacing: -5%;
`;

const StMainProcess = styled.div`
  width: 55px;
  height: 20px;
  font-size: 10px;
  text-align: center;
  line-height: 20px;
  border-radius: 30px;
  background-color: ${({ process }) =>
    process === "진행중" ? "#FF4040" : "#E3DFFF"};
  color: ${({ process }) => (process === "진행중" ? "#FFFFFF" : "#9083F7")};
`;

export default MainListCard;
