import icons from "assets";
import Button from "components/elements/Button";
import { useState } from "react";
import styled from "styled-components";
import { colors, fontSize } from "styles/theme";
import handleRankColor from "utils/handleRankColor";
import MyPageFooter from "components/mypage/MyPageFooter";
import MyList from "./MyList";
import AlarmList from "./AlarmList";

const UserInfo = () => {
  const [isOpenMyList, setIsOpenMyList] = useState(false);
  const [isOpenAlarmList, setIsOpenAlarmList] = useState(false);

  const profile = {
    nickName: "테스트아이디",
    userEmail: "test@gmail.com",
    userRank: "S",
    userPoint: "500",
  };
  const { nickName, userEmail, userRank, userPoint } = profile;

  const { List, Alarm, RankList } = icons;

  const fullUserRank = (rank) => {
    switch (rank) {
      case "B":
        return "Bronze";
      case "S":
        return "Silver";
      case "G":
        return "Gold";
      case "P":
        return "Platinum";
      case "D":
        return "Diamond";
      default:
        return "";
    }
  };

  const handleShowMyList = () => {
    setIsOpenMyList(true);
    setIsOpenAlarmList(false);
  };

  const handleShowAlarmList = () => {
    setIsOpenAlarmList(true);
    setIsOpenMyList(false);
  };

  return (
    <UserInfoContainer>
      <StUserInfo isOpenMyList={isOpenMyList} isOpenAlarmList={isOpenAlarmList}>
        <StName>{nickName}</StName>
        <StUserEmail>{userEmail}</StUserEmail>
        <StUserRankContainer>
          <StUserRank rankcolor={handleRankColor(userRank)}>
            {fullUserRank(userRank)}
          </StUserRank>
          <StUserPoint>{userPoint}</StUserPoint>
        </StUserRankContainer>
      </StUserInfo>
      {isOpenMyList && <MyList />}
      {isOpenAlarmList && <AlarmList />}
      {!isOpenMyList && !isOpenAlarmList && (
        <>
          <StActivities>
            <StBtn>
              <Button variant="image" onClickHandler={handleShowMyList}>
                <List />
                <StText>
                  <span>내가 쓴 게시글</span>
                  <span>00개</span>
                </StText>
              </Button>
            </StBtn>
            <StBtn>
              <Button variant="image" onClickHandler={handleShowAlarmList}>
                <Alarm />
                <StText>
                  <span>알림</span>
                  <span>00개</span>
                </StText>
              </Button>
            </StBtn>
            <StBtn>
              <Button variant="image">
                <RankList />
                <StText>
                  <span>등급표</span>
                </StText>
              </Button>
            </StBtn>
          </StActivities>
          <MyPageFooter />
        </>
      )}
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StUserInfo = styled.div`
  background: ${colors.mainP};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: ${({ isOpenMyList, isOpenAlarmList }) =>
    isOpenMyList || isOpenAlarmList ? "20px 0" : "60px 0 50px 0"};
  transition: padding 0.8s;
  -webkit-transition: padding 0.8s;
`;

const StName = styled.span`
  color: ${colors.white};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large24};
`;

const StUserEmail = styled.span`
  color: ${colors.white};
  font-weight: 700;
  font-size: ${fontSize.regular18};
`;

const StUserRankContainer = styled.div`
  display: flex;
`;

const StUserRank = styled.div`
  padding: 6px 28px;
  background: ${({ rankcolor }) => rankcolor};
  color: ${colors.white};
  border-radius: 30px 0 0 30px;
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.regular18};
  font-weight: 700;
`;

const StUserPoint = styled.div`
  padding: 6px 20px;
  color: ${colors.mainP};
  background: ${colors.subO};
  border-radius: 0 30px 30px 0;
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.regular18};
  font-weight: 700;
`;

const StActivities = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 60px 0;
`;

const StBtn = styled.div`
  height: 100px;

  button {
    font-weight: 700;
    position: relative;
  }
`;

const StText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  bottom: -40px;
  width: 100%;
  height: 40px;
  padding-top: 10px;
  white-space: nowrap;
  color: ${colors.grey1};
`;

export default UserInfo;
