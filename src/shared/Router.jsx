import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
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
import { loginState } from "state/atom";
import { getCookie } from "api/cookies";

const Router = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLoading = async () => {
      try {
        (await getCookie("accessToken")) ? setIsLogin(true) : setIsLogin(false);
        await setIsLoading(true);
      } catch (err) {
        console.log("GET LOGIN STATE", err);
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
