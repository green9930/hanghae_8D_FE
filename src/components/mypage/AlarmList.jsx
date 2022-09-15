import styled from "styled-components";
import AlarmCard from "components/mypage/AlarmCard";
import { useQuery } from "react-query";
import { getAlertLists } from "api/alarmApi";

const AlarmList = () => {
  /* -------------------------------- 데이터 Read -------------------------------- */
  const checkAlertLists=useQuery("alertLists",getAlertLists,{
    refetchOnWindowFocus: false,
    onSuccess:(data)=>{
      console.log(data)
    },
    onError:()=>{
      
    }
  })
console.log("체크!!!",checkAlertLists.data.data)
 if (checkAlertLists.isLoading) {
  return null;
 }

  return (
    <StAlarmList>
      {checkAlertLists.data.data.map((val) => (
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
