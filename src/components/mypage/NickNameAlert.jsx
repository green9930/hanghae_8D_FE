import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const NickNameAlert = ({ message, handleOpenModal }) => {
  const { MainArrow } = icons;
  const messageArr = message.split(".").filter((val) => val);

  return (
    <StLogoutAlert>
      <StMessage isMultiLine={!messageArr.length === 1}>
        <StIcon>
          <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
        </StIcon>
        <div>
          {messageArr.map((val, index) => {
            return (
              <span key={index}>
                {val}
                <br />
              </span>
            );
          })}
        </div>
      </StMessage>
      <Button onClickHandler={handleOpenModal}>닫기</Button>
    </StLogoutAlert>
  );
};

const StLogoutAlert = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

const StMessage = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 20px 0 20px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    span {
      font-size: ${fontSize.large20};
    }
  }
`;

const StIcon = styled.div`
  position: absolute;
  top: 10px;
`;

export default NickNameAlert;
