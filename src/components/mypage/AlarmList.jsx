import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import AlarmCard from "components/mypage/AlarmCard";
import { getAlertLists } from "api/alarmApi";
import { alarmListState } from "state/atom";

const AlarmList = () => {
  const setAlarmListState = useSetRecoilState(alarmListState);

  /* -------------------------------- 데이터 Read -------------------------------- */
  const { isLoading, data } = useQuery("alertLists", getAlertLists, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
    onError: () => setAlarmListState(false),
  });

  if (isLoading) return null;

  return (
    <StAlarmList>
      {data.data.map((val) => (
        <li key={val.notificationId}>
          <AlarmCard alarmItem={val} />
        </li>
      ))}
    </StAlarmList>
  );
};

const StAlarmList = styled.ul`
  padding: 0 35px;
`;

export default AlarmList;
