import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "components/elements/Button";
import Modal from "components/layout/Modal";
import LogoutAlert from "components/mypage/LogoutAlert";
import UnregisterAlert from "components/mypage/UnregisterAlert";
import { loginState } from "state/atom";
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
    setIsLogin(true);
    navigate("/mypage");
  };

  return (
    <UserInfoFooter>
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
    </UserInfoFooter>
  );
};

const UserInfoFooter = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 50% 50%;
  background: ${colors.grey7};
  padding-top: 30px;
`;

const StFooterBtn = styled.div`
  button {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    margin-left: 35px;

    span {
      color: ${colors.grey1};
    }
  }
`;

export default MyPageFooter;
