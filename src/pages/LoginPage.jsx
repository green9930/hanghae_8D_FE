import Header from "components/header/Header";
import MobileLayout from "components/layout/MobileLayout";
import styled from "styled-components";
import Login from "components/login/Login";

const LoginPage = () => {
  return (
    <MobileLayout>
      <Header/>
      <Login/>
    </MobileLayout>
  );
};

export default LoginPage;
