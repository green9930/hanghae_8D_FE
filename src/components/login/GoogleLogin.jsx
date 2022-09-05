import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "api/cookies";

const GoogleLogin = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const google = async () => {
        try {
          const res = await axios.get(
            `http://3.39.233.75/user/signin/google?code=${code}`
          );
          console.log(res);
          (await res.headers.authorization) &&
            setCookie("googleCookie", res.headers.authorization);
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
