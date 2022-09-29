import { useQuery, useQueryClient } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import AlarmCard from "components/mypage/AlarmCard";
import { getAlertLists } from "api/alarmApi";
import {
  alarmListState,
  newAlarmsLengthState,
  newAlarmsState,
} from "state/atom";
import { colors } from "styles/theme";

const AlarmList = () => {
  const setAlarmListState = useSetRecoilState(alarmListState);
  const setNewAlarms = useSetRecoilState(newAlarmsState);
  const setNewAlarmsLength = useSetRecoilState(newAlarmsLengthState);

  // const queryClient = useQueryClient();

  const {
    isSuccess,
    isLoading,
    data: alarmData,
  } = useQuery("alertLists", getAlertLists, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      // 헤더 마이페이지 아이콘 상태 변경
      setNewAlarms(false);
      // 알람 리스트 개수 변경
      setNewAlarmsLength(0);
      // queryClient.invalidateQueries("myprofile");
    },
    onError: () => setAlarmListState(false),
  });

  if (isLoading) return null;
  if (isSuccess) {
    return (
      <StAlarmList>
        {alarmData.data.map((val) => (
          <li key={val.notificationId}>
            <AlarmCard alarmItem={val} />
          </li>
        ))}
      </StAlarmList>
    );
  }
};

const StAlarmList = styled.ul`
  padding: 0 35px;
  @media screen and (max-width: 350px) {
    padding: 0 15px;
  }
  background: ${colors.white};
`;

export default AlarmList;
