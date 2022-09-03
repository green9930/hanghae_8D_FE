import styled from "styled-components";

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
      <StMainContainer>
        <StMainListImg src={image} alt="이미지" />
        <StMainDesc>
          <p>{title.length < 12 ? title : title.slice(0, 12) + "..."}</p>
          <div>
            <span>{userRank}</span>
            {nickName}
          </div>
          {selectedPrice ? (
            <p>
              <span>채택가</span>
              {selectedPrice}원
            </p>
          ) : (
            <p>{price}원</p>
          )}
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
`;

const StMainListImg = styled.img`
  width: 70px;
  height: 70px;
`;
const StMainDesc = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 163px; */
  width:80%;
  justify-content: center;
`;
const StMainProcess = styled.div`
  width: 18%;
  height: 20px;
  margin-top: 9px;
  font-size: 10px;
  text-align: center;
  line-height: 20px;
  border-radius: 30px;
  background-color: ${(props) =>
    props.process === "진행중" ? "#FF4040" : "#E3DFFF"};
  color: ${(props) => (props.process === "진행중" ? "#FFFFFF" : "#9083F7")};
`;

export default MainListCard;
