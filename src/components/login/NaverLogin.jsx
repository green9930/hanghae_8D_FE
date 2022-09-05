import { setCookie } from "api/cookies";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const naver = async () => {
        try {
          const res = await axios.get(
            `http://3.39.233.75/user/signin/naver?code=${code}`
          );
          console.log(res);
          (await res.headers.authorization) &&
            setCookie("naverCookie", res.headers.authorization);
          window.alert("LOGIN SUCCESS!");
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
