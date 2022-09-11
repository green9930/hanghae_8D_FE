import { Navigate, Route, Routes } from "react-router-dom";
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
import { getCookie } from "api/cookies";
import { useQuery } from "react-query";

const Router = () => {
  const { isLoading, data: isLogin } = useQuery(
    "loginState",
    () => (getCookie("accessToken") ? true : false),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
    }
  );

  if (isLoading) return null;
  // console.log("ISLOGIN", isLogin);

  return (
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
      <Route path="/edit/:id" element={<EditPage />} />
      <Route
        path="/mypage"
        element={isLogin ? <MyPage /> : <Navigate to="/" />}
      />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
