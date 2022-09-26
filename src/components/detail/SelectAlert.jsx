import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const SelectAlert = ({ nickName, handleOpenModal }) => {
  const { MainArrow } = icons;

  return (
    <StSelectAlert>
      <StMessage>
        <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
        <StSelectMessage>
          <span>{nickName}</span>님을 <br /> 채택하셨습니다. 🤗
        </StSelectMessage>
      </StMessage>
      <Button onClickHandler={handleOpenModal}>닫기</Button>
    </StSelectAlert>
  );
};
const StSelectAlert = styled.div`
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
  gap: 8px;
  padding-top: 10px;
`;

const StSelectMessage = styled.span`
  text-align: center;
  font-size: ${fontSize.large20};

  span {
    font-size: ${fontSize.large20};
    font-weight: 700;
  }
`;

export default SelectAlert;
