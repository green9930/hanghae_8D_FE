import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "components/elements/Button";
import { alarmListState, myListState } from "state/atom";
import { fontSize } from "styles/theme";
import icons from "assets";
import { getCookie } from "api/cookies";

const Header = ({ title }) => {
  const setMyListState = useSetRecoilState(myListState);
  const setAlarmListState = useSetRecoilState(alarmListState);

  const navigate = useNavigate();
  const { HeaderLogo, MyPageLogo } = icons;
  const location = useLocation();

  const clickNavigator = () => {
    setMyListState(false);
    setAlarmListState(false);
    getCookie("accessToken") ? navigate("/mypage") : navigate("/login");
  };

  const clickLogo = () => {
    location.pathname === "/" ? window.location.reload() : navigate("/");
  };

  return (
    <StHeader>
      <Button variant="image" onClickHandler={clickLogo}>
        <HeaderLogo />
      </Button>
      <StHeaderTitle>{title}</StHeaderTitle>
      <Button variant="image" onClickHandler={clickNavigator}>
        <MyPageLogo />
      </Button>
    </StHeader>
  );
};

const StHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 64px;
  background-color: #9083f7;
  padding: 0 20px;
`;

const StHeaderTitle = styled.div`
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: ${fontSize.large20};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
`;

export default Header;
