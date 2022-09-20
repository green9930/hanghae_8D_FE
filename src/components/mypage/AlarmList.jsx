import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import AlarmCard from "components/mypage/AlarmCard";
import { getAlertLists } from "api/alarmApi";
import { alarmListState, loginState } from "state/atom";
import { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "api/cookies";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const AlarmList = () => {
  const setAlarmListState = useSetRecoilState(alarmListState);
  const isLogin = useRecoilValue(loginState);

  /* 실시간 알림 수신 TEST ----------------------------------------------------------- */
  const [listening, setListening] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [value, setValue] = useState(null);
  const [meventSource, msetEventSource] = useState(null);

  /* -------------------------------- 데이터 Read -------------------------------- */
  // const { isLoading, data } = useQuery("alertLists", getAlertLists, {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {},
  //   onError: () => setAlarmListState(false),
  // });

  /* 실시간 알림 수신 TEST DATA READ ------------------------------------------------- */
  const { isSuccess, isLoading, data } = useQuery("alertLists", getAlertLists, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data.data);
      setAlarms(data.data);
    },
    onError: () => setAlarmListState(false),
  });

  /* 실시간 알림 수신 TEST ----------------------------------------------------------- */

  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    const fetchSse = async () => {
      try {
        const eventSource = new EventSource(
          `${process.env.REACT_APP_BASE_URL}/api/subscribe`,
          {
            headers: {
              Authorization: getCookie("accessToken"),
            },
          },
          {
            withCredentials: true,
          }
        );
        console.log(eventSource);
        msetEventSource(eventSource); //구독
        eventSource.onmessage = (event) => {
          const res = JSON.parse(event.data);
          console.log(res);
          // alarmType : "comment"
          // articlesId : 751
          // createdAt : "0분 전"
          // message : "12375님! 게시물에 작성된 댓글 알림이 도착했어요!\n\n확인하러가기 https://www.chackcheck99.com/detail/751"
          // notificationId : 477
          // readStatus : false
          // title : "테스트 게시글"
          setAlarms((prev) => [...prev, res]);
          setValue(event.data);
        };
        eventSource.onerror = (event) => {
          console.log("EVENTSOURCE ERROR", event);
          // if (event.target.readyState === EventSource.CLOSED) {
          //   console.log(
          //     "eventsource closed (" + event.target.readyState + ")"
          //   );
          // }
          eventSource.close();
        };
        setListening(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSse();
    // return () => eventSource.close();
  }, []);

  if (isLoading) return null;
  if (isSuccess) {
    console.log("ALARMS", alarms.reverse());

    return (
      <StAlarmList>
        {[...alarms.reverse(), ...data.data].map((val) => (
          <li key={val.notificationId}>
            <AlarmCard alarmItem={val} />
          </li>
        ))}
      </StAlarmList>
    );
  }

  /* 원본 ----------------------------------------------------------------------- */
  // if (isLoading) return null;

  // return (
  //   <StAlarmList>
  //     {data.data.map((val) => (
  //       <li key={val.notificationId}>
  //         <AlarmCard alarmItem={val} />
  //       </li>
  //     ))}
  //   </StAlarmList>
  // );
};

const StAlarmList = styled.ul`
  padding: 0 35px;
`;

export default AlarmList;
