import { useState } from "react";
import styled from "styled-components";
import Button from "components/elements/Button";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const UnregisterAlert = ({ handleOpenModal }) => {
  const [isUnregister, setIsUnregister] = useState(false);

  const { MainArrow } = icons;

  const handleUnregister = () => {
    console.log("UNREGISTER");
    setIsUnregister(true);
  };

  return (
    <StLogoutAlert>
      {isUnregister ? (
        <StMessage isUnregister={isUnregister}>
          <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
          <span>회원탈퇴 처리 되었습니다. 😂</span>
        </StMessage>
      ) : (
        <StMessage isUnregister={isUnregister}>
          <StUnregister>회원 탈퇴</StUnregister>
          <span>정말 탈퇴하시겠어요? 😥</span>
        </StMessage>
      )}
      {isUnregister ? (
        <StButton>
          <Button onClickHandler={handleOpenModal}>닫기</Button>
        </StButton>
      ) : (
        <StButton>
          <Button theme="grey" onClickHandler={handleUnregister}>
            탈퇴하기
          </Button>
          <Button onClickHandler={handleOpenModal}>아니오</Button>
        </StButton>
      )}
    </StLogoutAlert>
  );
};

const StLogoutAlert = styled.div`
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
  gap: ${({ isUnregister }) => (isUnregister ? "18px" : "22px")};
  padding-top: ${({ isUnregister }) => (isUnregister ? "10px" : "14px")};

  span {
    text-align: center;
    font-size: ${fontSize.large24};
  }
`;

const StUnregister = styled.div`
  color: ${colors.grey2};
  font-size: ${fontSize.large20};
  font-weight: 700;
`;

const StButton = styled.div`
  display: flex;
`;

export default UnregisterAlert;
