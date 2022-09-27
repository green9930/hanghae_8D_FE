import { useEffect } from "react";
import styled from "styled-components";
import Button from "components/elements/Button";
import { removeCookie } from "api/cookies";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const LogoutAlert = ({ handleOpenModal }) => {
  const { MainArrow } = icons;

  useEffect(() => {
    const removeUser = () => {
      removeCookie("accessToken");
      removeCookie("refreshToken");
    };
    removeUser();
  }, []);

  return (
    <StLogoutAlert>
      <StMessage>
        <MainArrow width="40px" height="40px" fill={`${colors.mainP}`} />
        <span>로그아웃 되었습니다. 😊</span>
      </StMessage>
      <Button onClickHandler={handleOpenModal}>닫기</Button>
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
  gap: 22px;
  padding-top: 10px;

  span {
    text-align: center;
    font-size: ${fontSize.large20};
  }
`;

export default LogoutAlert;
