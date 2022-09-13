import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "api/cookies";
import { instance } from "api/axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "state/atom";

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
          console.log(res);
          if (await res.headers.authorization) {
            setCookie("accessToken", res.headers.authorization);
            setCookie("refreshToken", res.headers.refreshtoken);
            eventSource = new EventSource(
              `${process.env.REACT_APP_BASE_URL}/api/subscribe`
            );
            msetEventSource(eventSource); //구독

            eventSource.onopen = (event) => {
              console.log("EVENTSOURCE OPENED");
            };
            eventSource.onmessage = (event) => {
              console.log("result", event.data);
              setData((old) => [...old, event.data]);
              setValue(event.data);
            };
            eventSource.onerror = (event) => {
              console.log(event.target.readyState);
              if (event.target.readyState === EventSource.CLOSED) {
                console.log(
                  "eventsource closed (" + event.target.readyState + ")"
                );
              }
              eventSource.close();
            };

            setListening(true);
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
    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  return null;
};

export default KakaoLogin;
