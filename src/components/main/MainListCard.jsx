import styled from "styled-components";
import handleRankColor from "utils/handleRankColor";
import { colors } from "styles/theme";
import { useNavigate } from "react-router-dom";

const MainListCard = ({ data }) => {
  const navigate=useNavigate();
  const onClickDetail=()=>{
    navigate(`/detail/${articlesId}`)
  }
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
      <StMainContainer selectedPrice={selectedPrice} onClick={onClickDetail}>
        <StMainListImg src={image} alt="이미지" />
        <StMainDesc>
          <StFirstLine>
          <StTitle selectedPrice={selectedPrice}>
            {title.length < 9 ? title : title.slice(0, 9) + "⋯"}
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
    
      </StMainContainer>
    </>
  );
};
const StMainContainer = styled.div`
  display: flex;
  padding: 15px ;
  gap: 10px;
  color: ${({ selectedPrice }) =>
    selectedPrice ? `${colors.grey3}` : `${colors.black}`};
  width:335px;
  height:100px;
  box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin:10px auto;
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
const StFirstLine=styled.div`
display:flex;
justify-content:space-between

`
const StTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;
const StSeller = styled.div`
  font-size: 12px;
  letter-spacing: -3%;
  span {
    color: ${({ rankColor }) =>
       rankColor};
    padding-right: 4px;
  }
`;
const StPrice = styled.div`
text-align:right;
  div {
    font-size: 10px;
    letter-spacing: -0.5px;
  }
  span {
    font-size: 20px;
    font-weight: 700;
    line-height: 18px;
    padding-right: 2px;
    align-items:right;
  }
`;

const StSelectedPrice = styled.p`
  display: inline-block;
  color: ${colors.grey3};
  font-size: 14px;
  letter-spacing: -5%;
`;

const StMainProcess = styled.div`
  width: 50px;
  height: 20px;
  font-size: 10px;
  text-align: center;
  line-height: 20px;
  border-radius: 30px;
  background-color: ${({ process }) =>
    process === "진행중" ? `${colors.red}` :`${colors.subP}` };
  color: ${({ process }) => (process === "진행중" ? `${colors.white}`  : `${colors.mainP}` )};
  font-family: 'twayfly', 'Noto Sans KR', sans-serif
`;

export default MainListCard;
