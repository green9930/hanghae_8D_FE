import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { loginState, newAlarmsState } from "state/atom";
import { getCookie } from "api/cookies";
import { lazy } from "react";

const DetailPage = lazy(() => import("pages/DetailPage"));
const ErrorPage = lazy(() => import("pages/ErrorPage"));
const FormPage = lazy(() => import("pages/FormPage"));
const MainPage = lazy(() => import("pages/MainPage"));
const EditPage = lazy(() => import("pages/EditPage"));
const MyPage = lazy(() => import("pages/MyPage"));
const LoginPage = lazy(() => import("pages/LoginPage"));
const KakaoLogin = lazy(() => import("components/login/KakaoLogin"));
const NaverLogin = lazy(() => import("components/login/NaverLogin"));
const GoogleLogin = lazy(() => import("components/login/GoogleLogin"));

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
            if (!event.error.message.includes("No activity"))
              eventSource.close();
          };
        } catch (error) {}
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
        window.alert("사용자 정보가 없습니다. 다시 로그인 해주세요.");
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
