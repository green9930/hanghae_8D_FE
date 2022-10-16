import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const [myList, setMyListState] = useRecoilState(myListState);
  const [alarmList, setAlarmListState] = useRecoilState(alarmListState);
  const [nickName, setNickNameState] = useRecoilState(nickNameState);
  const setTitleState = useSetRecoilState(myPageTitleState);
  const newAlarms = useRecoilValue(newAlarmsState);
  const isLogin = useRecoilValue(loginState);

  const navigate = useNavigate();
  const location = useLocation();
  const { HeaderLogo, MyPageLogo, MyPageAlarm, SearchLogo } = icons;

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
      <Button variant="image" name="checkLogo" onClickHandler={clickLogo}>
        <HeaderLogo />
      </Button>
      <StHeaderTitle>{title}</StHeaderTitle>
      <StButton>
        <Button
          variant="image"
          name="searchLogo"
          onClickHandler={() => navigate("/search")}
        >
          <SearchLogo />
        </Button>
        <Button
          variant="image"
          name="mypageLogo"
          onClickHandler={clickNavigator}
          isDisabled={
            !nickName &&
            !alarmList &&
            !myList &&
            location.pathname === "/mypage"
          }
        >
          {isLogin && newAlarms ? (
            <MyPageAlarm />
          ) : (
            <MyPageLogo width="20px" height="20px" />
          )}
        </Button>
      </StButton>
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

const StButton = styled.div`
  display: flex;
  align-items: right;
  gap: 15px;
`;

export default Header;
