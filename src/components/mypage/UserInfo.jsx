import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BrowserView, MobileView } from "react-device-detect";
import styled from "styled-components";
import Modal from "components/layout/Modal";
import MyList from "components/mypage/MyList";
import AlarmList from "components/mypage/AlarmList";
import RankModal from "components/mypage/RankModal";
import MyPageFooter from "components/mypage/MyPageFooter";
import NickNameAlert from "components/mypage/NickNameAlert";
import Button from "components/elements/Button";
import Input from "components/elements/Input";
import {
  getMyNotification,
  getMyProfile,
  patchAcceptEmail,
  patchMyProfile,
} from "api/mypageApi";
import {
  alarmListState,
  myListState,
  myPageTitleState,
  newAlarmsLengthState,
  newAlarmsState,
  nickNameState,
} from "state/atom";
import handleRankColor from "utils/handleRankColor";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const MAX_NICKNAME_LENGTH = 7;
const MIN_NICKNAME_LENGTH = 1;

const UserInfo = () => {
  const [isOpenRankModal, setIsOpenRankModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [nickNameVali, setNickNameVali] = useState({
    message: "",
    isValid: true,
  });
  const [openNickNameAlert, setOpenickNameAlert] = useState(false);

  const setTitleState = useSetRecoilState(myPageTitleState);
  const setNewAlarms = useSetRecoilState(newAlarmsState);
  const [newAlarmsLength, setNewAlarmsLength] =
    useRecoilState(newAlarmsLengthState);
  const [isEdit, setIsEdit] = useRecoilState(nickNameState);
  const [isOpenMyList, setIsOpenMyList] = useRecoilState(myListState);
  const [isOpenAlarmList, setIsOpenAlarmList] = useRecoilState(alarmListState);

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

  const { isLoading: myProfileLoading, data: myProfileData } = useQuery(
    "myprofile",
    getMyProfile,
    {
      onSuccess: (data) => {
        setNewAlarms(!data.data.data.alarmStatus);
      },
      refetchOnWindowFocus: false,
    }
  );

  /* 닉네임 수정 ------------------------------------------------------------------- */
  const queryClient = useQueryClient();
  const { isLoading: nickNameLoading, mutate: patchMutate } = useMutation(
    patchMyProfile,
    {
      onSuccess: ({ data }) => {
        setIsEdit(false);
        queryClient.invalidateQueries("myprofile");
        setNickNameVali({ message: data.data, isValid: true });
        setOpenickNameAlert(true);
      },
      onError: ({ response }) => {
        console.log(response.data.errorMessage);
        setNickNameVali({
          message: response.data.errorMessage,
          isValid: false,
        });
        setOpenickNameAlert(true);
      },
    }
  );

  /* 이메일 수신 동의 ---------------------------------------------------------------- */
  const { mutate: patchAcceptEmailMutate } = useMutation(patchAcceptEmail, {
    onSuccess: (data) => queryClient.invalidateQueries("myprofile"),
  });

  const { isLoading: alertNotiLoading, data: alertNotiData } = useQuery(
    "alertNoti",
    getMyNotification,
    {
      onSuccess: (data) => {
        setNewAlarmsLength(data.data.count);
      },
      refetchOnWindowFocus: false,
    }
  );

  if (myProfileLoading) return null;

  const {
    articleCount,
    userName,
    nickName,
    userEmail,
    userRank,
    userPoint,
    isAccepted,
  } = myProfileData.data.data;

  if (alertNotiLoading) return null;
  if (nickNameLoading) return null;

  /* 작성 게시글 목록 ---------------------------------------------------------------- */
  const handleShowMyList = () => {
    setIsEdit(false);
    setIsOpenMyList(true);
    setIsOpenAlarmList(false);
    setIsOpenRankModal(false);
    setTitleState(`내가 쓴 게시글(${articleCount})`);
  };

  /* 알람 목록 -------------------------------------------------------------------- */
  const handleShowAlarmList = () => {
    setIsEdit(false);
    setIsOpenAlarmList(true);
    setIsOpenMyList(false);
    setIsOpenRankModal(false);
    setTitleState("알림");
  };

  /* 포인트 정보 ------------------------------------------------------------------- */
  const handleShowRankModal = () => {
    setIsEdit(false);
    setIsOpenRankModal(!isOpenRankModal);
  };

  /* 닉네임 수정 ------------------------------------------------------------------- */
  const handleEditor = () => {
    setIsEdit(true);
    setNewName(nickName);
  };

  const handleChangeNickName = (e) => {
    const { value } = e.target;
    if (value.trim().length > MAX_NICKNAME_LENGTH) return;
    setNewName(value.replace(" ", ""));
    setNickNameVali({
      message: "",
      isValid: true,
    });
  };

  const handleSubmitNickName = () => {
    const regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (
      newName.length > MAX_NICKNAME_LENGTH ||
      newName.length < MIN_NICKNAME_LENGTH
    ) {
      setNickNameVali({
        message: "닉네임은 1~6글자로\n 작성해 주세요.",
        isValid: false,
      });
      setOpenickNameAlert(true);
    } else if (!regExp.test(newName)) {
      setNickNameVali({
        message: "닉네임은 한글, 영어, 숫자만\n 입력 가능합니다.",
        isValid: false,
      });
      setOpenickNameAlert(true);
    } else {
      setNickNameVali({
        message: "",
        isValid: true,
      });
      patchMutate({ nickName: newName });
    }
  };

  const handleNickNameAlert = () => {
    setOpenickNameAlert(false);
    setNickNameVali({
      ...nickNameVali,
      isValid: true,
    });
  };

  return (
    <UserInfoContainer>
      <StUserInfo isOpenMyList={isOpenMyList} isOpenAlarmList={isOpenAlarmList}>
        {isEdit ? (
          <StNickNameInput isDisabled={nickNameVali.isValid}>
            <Input value={newName} onChangeHandler={handleChangeNickName} />
            <Button
              theme="transparent"
              isDisabled={!nickNameVali.isValid}
              onClickHandler={handleSubmitNickName}
            >
              적용
            </Button>
          </StNickNameInput>
        ) : (
          <StNameContainer>
            <StName>{userName}</StName>
            <StNickName>&nbsp;/ {nickName}</StNickName>
            {isOpenMyList || isOpenAlarmList ? null : (
              <Button theme="transparent" onClickHandler={handleEditor}>
                수정
              </Button>
            )}
          </StNameContainer>
        )}
        {openNickNameAlert && (
          <Modal handleOpenModal={handleNickNameAlert}>
            <NickNameAlert
              message={nickNameVali.message}
              handleOpenModal={handleNickNameAlert}
            />
          </Modal>
        )}
        <StUserEmail>{userEmail}</StUserEmail>
        <StUserRankContainer>
          <StUserRank rankcolor={handleRankColor(userRank)}>
            {fullUserRank(userRank)}
          </StUserRank>
          <StUserPoint>{userPoint}P</StUserPoint>
        </StUserRankContainer>
      </StUserInfo>
      {isOpenMyList && <MyList />}
      {isOpenAlarmList && <AlarmList />}
      {!isOpenMyList && !isOpenAlarmList && (
        <>
          <StActivities>
            <StActList>
              <StBtn>
                <Button variant="image" onClickHandler={handleShowMyList}>
                  <List />
                  <StText>
                    <span>내가 쓴 게시글</span>
                    <span>{articleCount}개</span>
                  </StText>
                </Button>
              </StBtn>
              <StBtn>
                <Button variant="image" onClickHandler={handleShowAlarmList}>
                  <Alarm />
                  <StText>
                    <span>알림</span>
                    <span>{newAlarmsLength}개</span>
                  </StText>
                </Button>
              </StBtn>
              <StBtn>
                <Button variant="image" onClickHandler={handleShowRankModal}>
                  <RankList />
                  <StText>
                    <span>등급표</span>
                  </StText>
                </Button>
              </StBtn>
            </StActList>
            <StEmail>
              <StEmailMessage>이메일 수신 동의</StEmailMessage>
              <StEmailButton>
                <StAllowBtn>
                  <Button
                    theme={isAccepted ? "p_filled" : "p_outline"}
                    onClickHandler={() =>
                      !isAccepted &&
                      patchAcceptEmailMutate({ isAccepted: true })
                    }
                  >
                    수신 동의
                  </Button>
                </StAllowBtn>
                <StDeclineBtn>
                  <Button
                    theme={isAccepted ? "p_outline" : "p_filled"}
                    onClickHandler={() =>
                      isAccepted &&
                      patchAcceptEmailMutate({ isAccepted: false })
                    }
                  >
                    수신 거부
                  </Button>
                </StDeclineBtn>
              </StEmailButton>
            </StEmail>
          </StActivities>
          {isOpenRankModal && (
            <Modal height="354px" handleOpenModal={handleShowRankModal}>
              <RankModal handleOpenModal={handleShowRankModal} />
            </Modal>
          )}
          <MobileView>
            <StUserInfoFooter>
              <MyPageFooter />
            </StUserInfoFooter>
          </MobileView>
          <BrowserView>
            <StBrowserUserInfoFooter>
              <MyPageFooter />
            </StBrowserUserInfoFooter>
          </BrowserView>
        </>
      )}
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 64px;
`;

const StUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: ${colors.mainP};
  height: ${({ isOpenMyList, isOpenAlarmList }) =>
    isOpenMyList || isOpenAlarmList ? "140px" : "192px"};
  padding: ${({ isOpenMyList, isOpenAlarmList }) =>
    isOpenMyList || isOpenAlarmList ? "20px 0" : "50px 0"};
  transition: padding 0.8s;
  -webkit-transition: padding 0.8s;
`;

const StNickNameInput = styled.div`
  position: relative;

  input {
    width: 210px;
    height: 40px;
    border-radius: 5px;
    border: ${({ isDisabled }) =>
      isDisabled ? `0.5px solid ${colors.grey3}` : `0.5px solid ${colors.red}`};
    color: ${colors.grey1};
    text-align: center;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.large20};
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 40px;
    padding: 0;
    color: ${({ isDisabled }) =>
      isDisabled ? `${colors.mainP}` : `${colors.grey3}`};
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.regular14};
  }
`;

const StNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -56px;
    width: 56px;
    height: 24px;
    text-align: center;
    color: ${colors.subP};
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.regular14};
  }
`;

const StName = styled.span`
  max-width: 132px;
  color: ${colors.white};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large24};
  @media screen and (max-width: 350px) {
    font-size: ${fontSize.large20};
    max-width: 102px;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StNickName = styled.span`
  color: ${colors.white};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.large24};
  @media screen and (max-width: 350px) {
    font-size: ${fontSize.large20};
  }
`;

const StUserEmail = styled.span`
  color: ${colors.white};
  font-weight: 700;
  font-size: ${fontSize.regular18};
`;

const StUserRankContainer = styled.div`
  display: flex;
  height: 30px;
`;

const StUserRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  background: ${({ rankcolor }) => rankcolor};
  padding: 6px 28px;
  border-radius: 30px 0 0 30px;
  color: ${colors.white};
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.regular18};
  font-weight: 700;
`;

const StUserPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 82px;
  background: ${colors.subO};
  border-radius: 0 30px 30px 0;
  color: ${colors.mainP};
  font-family: "Roboto", "Noto Sans KR", sans-serif;
  font-size: ${fontSize.regular18};
  font-weight: 700;
`;

const StActivities = styled.div`
  background-color: ${colors.white};
  height: 274px;
  padding: 60px 0 30px 0;
`;

const StActList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 0 35px;
  gap: 50px;
  @media screen and (max-width: 350px) {
    gap: 26px;
  }
`;

const StBtn = styled.div`
  height: 100px;

  button {
    position: relative;
    font-weight: 700;
  }
`;

const StText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: -40px;
  padding-top: 10px;
  white-space: nowrap;
  color: ${colors.grey1};
`;

const StEmail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 35px 0 35px;
`;

const StEmailMessage = styled.span`
  color: ${colors.grey1};
  font-size: ${fontSize.regular14};
`;

const StEmailButton = styled.div`
  display: flex;

  button {
    height: 30px;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.small12};
  }
`;

const StAllowBtn = styled.div`
  width: 100px;
  @media screen and (max-width: 350px) {
    width: 76px;
  }

  button {
    border-radius: 30px 0 0 30px;
  }
`;

const StDeclineBtn = styled.div`
  width: 100px;
  @media screen and (max-width: 350px) {
    width: 76px;
  }

  button {
    border-radius: 0 30px 30px 0;
  }
`;

// StUserInfoFooter position fixed일 경우 로그아웃, 회원탈퇴 모달 딤처리 시 헤더 적용 안됨
const StUserInfoFooter = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px 30px;
  grid-row-gap: 10px;
  background: ${colors.grey7};
  padding-top: 30px;
  /* position: fixed; */
  width: 100%;
  height: calc(100vh - 530px);
  bottom: 0;
`;

const StBrowserUserInfoFooter = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30px 30px;
  grid-row-gap: 10px;
  background: ${colors.grey7};
  padding-top: 30px;
  position: fixed;
  width: 100%;
  height: calc(100vh - 524px);
  bottom: 0;
  @media (min-width: 950px) {
    width: 500px;
  }
`;

export default UserInfo;
