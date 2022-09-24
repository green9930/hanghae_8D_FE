import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import styled from "styled-components";
import AlarmCard from "components/mypage/AlarmCard";
import { getAlertLists } from "api/alarmApi";
import { getCookie } from "api/cookies";
import { alarmListState, loginState } from "state/atom";

const AlarmList = () => {
  /* 실시간 알림 수신 TEST ----------------------------------------------------------- */
  const [listening, setListening] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [value, setValue] = useState(null);
  const [eventSourceStatus, setEventSourceStatus] = useState(null);

  const setAlarmListState = useSetRecoilState(alarmListState);
  const isLogin = useRecoilValue(loginState);

  /* 실시간 알림 수신 TEST DATA READ ------------------------------------------------- */
  const {
    isSuccess,
    isLoading,
    data: alarmData,
  } = useQuery("alertLists", getAlertLists, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
    onError: () => setAlarmListState(false),
  });

  /* 실시간 알림 수신 TEST ----------------------------------------------------------- */

  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    let eventSource;
    const fetchSse = async () => {
      try {
        eventSource = new EventSource(
          `${process.env.REACT_APP_BASE_URL}/api/subscribe`,
          {
            headers: {
              Authorization: getCookie("accessToken"),
            },
            withCredentials: true,
          }
        );
        console.log("EVENTSOURCE RESPONSE", eventSource);
        /* EVENTSOURCE ONOPEN ------------------------------------------------------- */
        eventSource.onopen = async (event) => {
          const result = await event;
          console.log("EVENTSOURCE ONOPEN", result);
          setEventSourceStatus(result.type); //구독
        };

        /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
        eventSource.onmessage = async (event) => {
          const res = await JSON.parse(event.data);
          console.log("EVENTSOURCE MESSAGE : ", res);
          setAlarms((prev) => [...prev, res]);
          // setValue(res);
        };

        /* EVENTSOURCE ONERROR ------------------------------------------------------ */
        eventSource.onerror = async (event) => {
          const result = await event;
          console.log("EVENTSOURCE ONERROR", result);
          console.log(event.error.message); // No activity within 45000 milliseconds.
          // if (event.target.readyState === EventSource.CLOSED) {
          //   console.log(
          //     "eventsource closed (" + event.target.readyState + ")"
          //   );
          // }
          event.error.message.includes("No activity within 45000 milliseconds.")
            ? setEventSourceStatus(result.type) //구독
            : eventSource.close();
        };
        setListening(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSse();
    return () => eventSource.close();
  });

  if (isLoading) return null;
  if (isSuccess) {
    console.log("ALARMLIST", [...alarms.reverse(), ...alarmData.data]);
    return (
      <StAlarmList>
        {[...alarms.reverse(), ...alarmData.data].map((val) => (
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
`;

export default AlarmList;
