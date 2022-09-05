import { Route, Routes } from "react-router-dom";
import DetailPage from "pages/DetailPage";
import ErrorPage from "pages/ErrorPage";
import FormPage from "pages/FormPage";
import MainPage from "pages/MainPage";
import MyPage from "pages/MyPage";
import LoginPage from "pages/LoginPage";
import KakaoLogin from "components/login/KakaoLogin";
import NaverLogin from "components/login/NaverLogin";
import GoogleLogin from "components/login/GoogleLogin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user/signin/kakao" element={<KakaoLogin />} />
      <Route path="/user/signin/naver" element={<NaverLogin />} />
      <Route path="/user/signin/google" element={<GoogleLogin />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
