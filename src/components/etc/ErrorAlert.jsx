import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const ErrorAlert = ({ handleOpenModal }) => {
  const { MainArrow } = icons;

  return (
    <StImageAlert>
      <StMessage>
        <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
        <p>존재하지 않는 게시글입니다.🤓</p>
      </StMessage>
      <Button onClickHandler={handleOpenModal}>닫기</Button>
    </StImageAlert>
  );
};

const StImageAlert = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StMessage = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 10px;

  p {
    text-align: center;
    font-size: ${fontSize.large20};
    line-height: 30px;
    letter-spacing: -5%;
  }

  span {
    font-weight: 700;
    font-size: ${fontSize.large20};
    line-height: 30px;
    letter-spacing: -5%;
  }
`;

export default ErrorAlert;
