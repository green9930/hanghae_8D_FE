import styled from "styled-components";
import Button from "components/elements/Button";
import handleRankColor from "utils/handleRankColor";
import { colors } from "styles/theme";
import icons from "assets";

const RankModal = ({ handleOpenModal }) => {
  const { RankListWhite } = icons;

  return (
    <StRankModal>
      <RankListWhite />
      <StRankContent>
        <StRankContainer type="rank">
          <StRankName color={handleRankColor("B")}>Bronze</StRankName>
          <StRankName color={handleRankColor("S")}>Silver</StRankName>
          <StRankName color={handleRankColor("G")}>Gold</StRankName>
          <StRankName color={handleRankColor("P")}>Platinum</StRankName>
          <StRankName color={handleRankColor("D")}>Diamond</StRankName>
        </StRankContainer>
        <StRankContainer type="rank">
          <StPoint>0~100P</StPoint>
          <StPoint>101~200P</StPoint>
          <StPoint>201~500P</StPoint>
          <StPoint>501~1000P</StPoint>
          <StPoint>1001P~</StPoint>
        </StRankContainer>
      </StRankContent>
      <StRankInfo>
        <StRankInfoContainer>
          <StRankContainer type="info">
            <StInfoText>댓글 작성</StInfoText>
            <StInfoText>댓글 채택 하기</StInfoText>
          </StRankContainer>
          <StRankContainer type="info">
            <span>+1P</span>
            <span>+10P</span>
          </StRankContainer>
        </StRankInfoContainer>
        <StRankInfoContainer>
          <StRankContainer type="info">
            <StInfoText>게시글 작성</StInfoText>
            <StInfoText>댓글 채택 받기</StInfoText>
          </StRankContainer>
          <StRankContainer type="info">
            <span>+2P</span>
            <span>+50P</span>
          </StRankContainer>
        </StRankInfoContainer>
      </StRankInfo>
      <Button onClickHandler={handleOpenModal}>닫기</Button>
    </StRankModal>
  );
};

const StRankModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 10px;
`;

const StRankContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StRankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ type }) => type === "rank" && "4px"};
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

const StRankName = styled.span`
  color: ${({ color }) => `${color}`};
`;

const StPoint = styled.span`
  color: ${colors.black};
`;

const StRankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: ${colors.grey7};
  width: 100%;
  padding: 20px 0;
`;

const StRankInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StInfoText = styled.span`
  font-weight: 400;
`;

export default RankModal;
