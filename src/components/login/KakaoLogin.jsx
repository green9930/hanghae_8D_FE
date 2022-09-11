import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "api/cookies";
import { instance } from "api/axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "state/atom";

const KakaoLogin = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const kakao = async () => {
        try {
          const res = await instance.get(`/user/signin/kakao?code=${code}`);
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
      kakao();
    }
  }, []);

  return null;
};

export default KakaoLogin;
