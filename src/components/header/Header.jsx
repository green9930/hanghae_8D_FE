import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "components/elements/Button";
import {
  alarmListState,
  loginState,
  myListState,
  myPageTitleState,
  newAlarmsState,
  nickNameState,
} from "state/atom";
import { getCookie } from "api/cookies";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const Header = ({ title }) => {
  const setMyListState = useSetRecoilState(myListState);
  const setAlarmListState = useSetRecoilState(alarmListState);
  const setTitleState = useSetRecoilState(myPageTitleState);
  const setNickNameState = useSetRecoilState(nickNameState);
  const newAlarms = useRecoilValue(newAlarmsState);
  const isLogin = useRecoilValue(loginState);

  const navigate = useNavigate();
  const location = useLocation();
  const { HeaderLogo, MyPageLogo, MyPageAlarm } = icons;

  const queryClient = useQueryClient();

  const clickNavigator = () => {
    setNickNameState(false);
    setMyListState(false);
    setAlarmListState(false);
    setTitleState("MY");
    queryClient.invalidateQueries("myprofile");
    getCookie("accessToken") ? navigate("/mypage") : navigate("/login");
  };

  const clickLogo = () =>
    location.pathname === "/" ? window.location.reload() : navigate("/");

  return (
    <StHeader>
      <Button variant="image" onClickHandler={clickLogo}>
        <HeaderLogo />
      </Button>
      <StHeaderTitle>{title}</StHeaderTitle>
      <Button variant="image" onClickHandler={clickNavigator}>
        {isLogin && newAlarms ? (
          <MyPageAlarm />
        ) : (
          <MyPageLogo width="20px" height="20px" />
        )}
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
