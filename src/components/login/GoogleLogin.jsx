import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "api/cookies";
import { instance } from "api/axios";

const GoogleLogin = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const google = async () => {
        try {
          const res = await instance.get(`/user/signin/google?code=${code}`);
          console.log(res);
          if (await res.headers.authorization) {
            setCookie("accessToken", res.headers.authorization);
            setCookie("refreshToken", res.headers.refreshtoken);
          }
          window.alert("LOGIN SUCCESS!");
          navigate("/");
        } catch (err) {
          window.alert("LOGIN FAILED!");
          navigate("/");
        }
      };
      google();
    }
  }, []);

  return null;
};

export default GoogleLogin;
