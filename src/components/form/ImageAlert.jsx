import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const ImageAlert = ({ handleOpenModal }) => {
  const { MainArrow } = icons;

  return (
    <StImageAlert>
      <StMessage>
        <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
        <p>
          <span>20MB</span> 이하 <br />
          이미지를 올려주세요!🤓
        </p>
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
  gap: 22px;
  padding-top: 10px;

  p {
    text-align: center;
    font-size: ${fontSize.large24};
    line-height: 27px;
  }
  span {
    font-weight: 700;
    font-size: ${fontSize.large24};
  }
`;

export default ImageAlert;
