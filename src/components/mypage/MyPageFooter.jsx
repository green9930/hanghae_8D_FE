import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "components/elements/Button";
import Modal from "components/layout/Modal";
import LogoutAlert from "components/mypage/LogoutAlert";
import UnregisterAlert from "components/mypage/UnregisterAlert";
import { loginState } from "state/atom";
import { getCookie } from "api/cookies";
import { colors } from "styles/theme";
import icons from "assets";

const MyPageFooter = () => {
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);
  const [openUnregisterAlert, setOpenUnregisterAlert] = useState(false);

  const setIsLogin = useSetRecoilState(loginState);

  const navigate = useNavigate();
  const { SendMessage, Logout, Unregister } = icons;

  const handleLogout = () => setOpenLogoutAlert(true);

  const handleLogoutAlert = () => {
    setOpenLogoutAlert(false);
    setIsLogin(false);
    navigate("/");
  };

  const handleUnregisterAlert = () => {
    setOpenUnregisterAlert(false);
    if (!getCookie("accessToken") && !getCookie("refreshToken"))
      window.location.replace("/");
    setIsLogin(true);
    navigate("/mypage");
  };

  return (
    <>
      <StFooterBtn>
        <Button variant="image">
          <SendMessage />
          <span>의견보내기</span>
        </Button>
      </StFooterBtn>
      <StFooterBtn>
        <Button variant="image" onClickHandler={handleLogout}>
          <Logout />
          <span>로그아웃</span>
        </Button>
      </StFooterBtn>
      <StFooterBtn>
        <Button
          variant="image"
          onClickHandler={() => setOpenUnregisterAlert(true)}
        >
          <Unregister />
          <span>회원탈퇴</span>
        </Button>
      </StFooterBtn>
      {openLogoutAlert && (
        <Modal handleOpenModal={handleLogoutAlert}>
          <LogoutAlert handleOpenModal={handleLogoutAlert} />
        </Modal>
      )}
      {openUnregisterAlert && (
        <Modal handleOpenModal={handleUnregisterAlert}>
          <UnregisterAlert handleOpenModal={handleUnregisterAlert} />
        </Modal>
      )}
    </>
  );
};

const StFooterBtn = styled.div`
  height: 30px;
  padding-left: 35px;

  button {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      color: ${colors.grey1};
    }
  }
`;

export default MyPageFooter;
