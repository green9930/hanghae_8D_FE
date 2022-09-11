import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "api/axios";
import { setCookie } from "api/cookies";
import { useSetRecoilState } from "recoil";
import { loginState } from "state/atom";

const NaverLogin = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const naver = async () => {
        try {
          const res = await instance.get(`/user/signin/naver?code=${code}`);
          console.log(res);
          if (await res.headers.authorization) {
            setCookie("accessToken", res.headers.authorization);
            setCookie("refreshToken", res.headers.refreshtoken);
          }
          window.alert("LOGIN SUCCESS!");
          setIsLogin(true);
          navigate("/");
        } catch (err) {
          window.alert("LOGIN FAILED!");
          navigate("/");
        }
      };
      naver();
    }
  }, []);

  return null;
};

export default NaverLogin;
