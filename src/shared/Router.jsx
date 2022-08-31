import { Route, Routes } from "react-router-dom";
import DetailPage from "pages/DetailPage";
import ErrorPage from "pages/ErrorPage";
import FormPage from "pages/FormPage";
import MainPage from "pages/MainPage";
import MyPage from "pages/MyPage";
import LoginPage from "pages/LoginPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
