import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  newAlarmsLengthState,
  newAlarmsState,
  nickNameState,
} from "state/atom";
import handleRankColor from "utils/handleRankColor";
import { colors, fontSize } from "styles/theme";
import MyActivities from "components/mypage/MyActivities";

const MAX_NICKNAME_LENGTH = 7;
const MIN_NICKNAME_LENGTH = 1;

const UserInfo = () => {
  /* 닉네임 수정 ------------------------------------------------------------------- */
  const [newName, setNewName] = useState("");
  const [nickNameVali, setNickNameVali] = useState({
    message: "",
    isValid: true,
  });
  const [openNickNameAlert, setOpenickNameAlert] = useState(false);
  const [isOpenRankModal, setIsOpenRankModal] = useState(false);

  const setNewAlarms = useSetRecoilState(newAlarmsState);
  const setNewAlarmsLength = useSetRecoilState(newAlarmsLengthState);
  const [isEdit, setIsEdit] = useRecoilState(nickNameState);
  const isOpenMyList = useRecoilValue(myListState);
  const isOpenAlarmList = useRecoilValue(alarmListState);

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

  /* 사용자 정보 GET --------------------------------------------------------------- */
  const { isLoading: myProfileLoading, data: myProfileData } = useQuery(
    "myprofile",
    getMyProfile,
    {
      onSuccess: (data) => setNewAlarms(!data.data.data.alarmStatus),
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
    onSuccess: () => queryClient.invalidateQueries("myprofile"),
  });

  const { isLoading: alertNotiLoading } = useQuery(
    "alertNoti",
    getMyNotification,
    {
      onSuccess: (data) => setNewAlarmsLength(data.data.count),
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
            <MyActivities articleCount={articleCount} />
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
    isOpenMyList || isOpenAlarmList ? "156px" : "206px"};
  padding: ${({ isOpenMyList, isOpenAlarmList }) =>
    isOpenMyList || isOpenAlarmList ? "20px 0" : "50px 0 40px 0"};
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
    font-size: ${fontSize.large20};
    font-weight: 500;
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
  height: 40px;
  position: relative;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -56px;
    width: 56px;
    height: 24px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    color: ${colors.subP};
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.regular14};
  }
`;

const StName = styled.span`
  display: inline-block;
  height: 40px;
  max-width: 132px;
  color: ${colors.white};
  font-size: ${fontSize.large24};
  font-weight: 700;
  @media screen and (max-width: 350px) {
    font-size: ${fontSize.large20};
    max-width: 102px;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StNickName = styled.span`
  display: inline-block;
  height: 40px;
  color: ${colors.white};
  font-size: ${fontSize.large24};
  font-weight: 700;
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
