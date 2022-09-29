import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import DetailPage from "pages/DetailPage";
import ErrorPage from "pages/ErrorPage";
import FormPage from "pages/FormPage";
import MainPage from "pages/MainPage";
import EditPage from "pages/EditPage";
import MyPage from "pages/MyPage";
import LoginPage from "pages/LoginPage";
import KakaoLogin from "components/login/KakaoLogin";
import NaverLogin from "components/login/NaverLogin";
import GoogleLogin from "components/login/GoogleLogin";
import { loginState, newAlarmsLengthState, newAlarmsState } from "state/atom";
import { getCookie } from "api/cookies";

import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useQueryClient } from "react-query";

const Router = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const setNewAlarms = useSetRecoilState(newAlarmsState);
  const setNewAlarm = useSetRecoilState(newAlarmsState);
  const [newAlarmsLength, setNewAlarmsLength] =
    useRecoilState(newAlarmsLengthState);
  const [loading, setIsLoading] = useState(false);

  /* 실시간 알림 수신 TEST ----------------------------------------------------------- */
  const [listening, setListening] = useState(false);
  const [eventSourceStatus, setEventSourceStatus] = useState(null);

  const queryClient = useQueryClient();
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (loading && isLogin) {
      let eventSource;
      const fetchSse = async () => {
        try {
          eventSource = new EventSource(
            `${process.env.REACT_APP_BASE_URL}/api/subscribe`,
            {
              headers: {
                Authorization: getCookie("accessToken"),
                Connection: "keep-alive",
              },
              withCredentials: true,
            }
          );
          // console.log("EVENTSOURCE", eventSource);
          // console.log("EVENTSOURCE RESPONSE", eventSource);
          /* EVENTSOURCE ONOPEN ------------------------------------------------------- */
          eventSource.onopen = async (event) => {
            const result = await event;
            // console.log("EVENTSOURCE ONOPEN", result);
            // setEventSourceStatus(result.type); //구독
          };

          /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
          eventSource.onmessage = async (event) => {
            // 헤더 마이페이지 아이콘 상태 변경
            const res = await event.data;
            if (!res.includes("EventStream Created.")) setNewAlarms(true);
            // 알람 리스트 개수 변경
            queryClient.invalidateQueries("myprofile");
            queryClient.invalidateQueries("alertNoti");
            queryClient.invalidateQueries("alertLists");
            // const json = JSON.parse(res);
            // console.log("EVENTSOURCE MESSAGE : ", json);
            // setNewAlarm(json);
          };

          /* EVENTSOURCE ONERROR ------------------------------------------------------ */
          eventSource.onerror = async (event) => {
            const result = await event;
            // console.log("EVENTSOURCE ONERROR", result);
            // console.log(event.error.message); // No activity within 45000 milliseconds.
            event.error.message.includes("No activity")
              ? eventSource.close()
              : setEventSourceStatus(result.type); //구독
            setListening(false);
          };
          setListening(true);
        } catch (error) {
          // console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  });

  useEffect(() => {
    const fetchLoading = async () => {
      try {
        (await getCookie("accessToken")) ? setIsLogin(true) : setIsLogin(false);
        await setIsLoading(true);
      } catch (err) {
        // console.log("GET LOGIN STATE", err);
      }
    };
    fetchLoading();
  }, [isLogin]);

  /* 서버 페이지 접근 테스트 중 ---------------------------------------------------------- */
  return (
    <>
      {loading ? (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route path="/user/signin/kakao" element={<KakaoLogin />} />
          <Route path="/user/signin/naver" element={<NaverLogin />} />
          <Route path="/user/signin/google" element={<GoogleLogin />} />
          <Route
            path="/form"
            element={isLogin ? <FormPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/detail/:id"
            element={isLogin ? <DetailPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={isLogin ? <EditPage /> : <Navigate to="/" />}
          />
          <Route
            path="/mypage"
            element={isLogin ? <MyPage /> : <Navigate to="/" />}
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      ) : null}
    </>
  );
};

export default Router;
