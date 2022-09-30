import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
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
import { loginState, newAlarmsState } from "state/atom";
import { getCookie } from "api/cookies";

const Router = () => {
  const [loading, setIsLoading] = useState(false);

  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const setNewAlarms = useSetRecoilState(newAlarmsState);

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
              },
              withCredentials: true,
            }
          );
          /* EVENTSOURCE ONOPEN ------------------------------------------------------- */
          eventSource.onopen = async (event) => {
            // const result = await event;
            // console.log("EVENTSOURCE ONOPEN", result);
          };

          /* EVENTSOURCE ONMESSAGE ---------------------------------------------------- */
          eventSource.onmessage = async (event) => {
            const res = await event.data;
            if (!res.includes("EventStream Created.")) setNewAlarms(true); // 헤더 마이페이지 아이콘 상태 변경
            queryClient.invalidateQueries("myprofile"); // 프로필 업데이트
            queryClient.invalidateQueries("alertNoti"); // 알람 리스트 개수 변경
            queryClient.invalidateQueries("alertLists"); // 알림 목록 업데이트
          };

          /* EVENTSOURCE ONERROR ------------------------------------------------------ */
          eventSource.onerror = async (event) => {
            // const result = await event;
            // console.log("EVENTSOURCE ONERROR", result);
            if (!event.error.message.includes("No activity"))
              eventSource.close();
          };
        } catch (error) {
          // console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  });

  /* 로그인 상태 확인 ---------------------------------------------------------------- */
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
