import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Modal from "components/layout/Modal";
import RankModal from "components/mypage/RankModal";
import Button from "components/elements/Button";
import {
  alarmListState,
  myListState,
  myPageTitleState,
  newAlarmsLengthState,
  nickNameState,
} from "state/atom";
import { colors } from "styles/theme";
import icons from "assets";

const MyActivities = ({ articleCount }) => {
  const [isOpenRankModal, setIsOpenRankModal] = useState(false);

  const setTitleState = useSetRecoilState(myPageTitleState);
  const newAlarmsLength = useRecoilValue(newAlarmsLengthState);
  const setIsEdit = useSetRecoilState(nickNameState);
  const setIsOpenMyList = useSetRecoilState(myListState);
  const setIsOpenAlarmList = useSetRecoilState(alarmListState);

  const { List, Alarm, RankList } = icons;

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

  return (
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
      {isOpenRankModal && (
        <Modal height="354px" handleOpenModal={handleShowRankModal}>
          <RankModal handleOpenModal={handleShowRankModal} />
        </Modal>
      )}
    </StActList>
  );
};

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

export default MyActivities;
