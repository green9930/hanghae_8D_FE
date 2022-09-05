import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "api/cookies";

const KakaoLogin = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const kakao = async () => {
        try {
          const res = await axios.get(
            `http://3.39.233.75/user/signin/kakao?code=${code}`
          );
          console.log(res);
          (await res.headers.authorization) &&
            setCookie("kakaoCookie", res.headers.authorization);
          window.alert("LOGIN SUCCESS!");
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
