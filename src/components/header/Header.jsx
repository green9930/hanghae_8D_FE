import { useNavigate, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "components/elements/Button";
import { alarmListState, myListState, myPageTitleState } from "state/atom";
import { getCookie } from "api/cookies";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const Header = ({ title }) => {
  const setMyListState = useSetRecoilState(myListState);
  const setAlarmListState = useSetRecoilState(alarmListState);
  const setTitleState = useSetRecoilState(myPageTitleState);

  const navigate = useNavigate();
  const { HeaderLogo, MyPageLogo } = icons;
  const location = useLocation();

  const clickNavigator = () => {
    setMyListState(false);
    setAlarmListState(false);
    setTitleState("MY");
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
  padding: 0 20px;
  background-color: ${colors.mainP};
`;

const StHeaderTitle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${colors.white};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large20};
`;

export default Header;
