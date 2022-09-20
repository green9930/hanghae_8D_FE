import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "api/cookies";
import { instance } from "api/axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "state/atom";
import StartPage from "components/etc/StartPage";

const KakaoLogin = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [meventSource, msetEventSource] = useState(null);

  let code = new URL(window.location.href).searchParams.get("code");
  let eventSource;

  useEffect(() => {
    if (code) {
      const kakao = async () => {
        try {
          const res = await instance.get(`/user/signin/kakao?code=${code}`);
          if (await res.headers.authorization) {
            setCookie("accessToken", res.headers.authorization);
            setCookie("refreshToken", res.headers.refreshtoken);
            //   eventSource = new EventSource(
            //     `${process.env.REACT_APP_BASE_URL}/api/subscribe`,
            //     {
            //       headers: {
            //         Authorization: res.headers.authorization,
            //       },
            //     },
            //     {
            //       withCredentials: true,
            //     }
            //   );
            //   msetEventSource(eventSource); //구독
            //   eventSource.onmessage = (event) => {
            //     setData((old) => [...old, event.data]);
            //     setValue(event.data);
            //   };
            //   eventSource.onerror = (event) => {
            //     // if (event.target.readyState === EventSource.CLOSED) {
            //     //   console.log(
            //     //     "eventsource closed (" + event.target.readyState + ")"
            //     //   );
            //     // }
            //     eventSource.close();
            //   };
            //   setListening(true);
          }
          setIsLogin(true);
          setTimeout(() => {
            navigate("/");
          }, 500);
        } catch (err) {
          window.alert("LOGIN FAILED!");
          // navigate("/");
          console.log(err);
        }
      };
      kakao();
    }
    return () => {
      // eventSource.close();
    };
  }, []);

  return <StartPage />;
};

export default KakaoLogin;
