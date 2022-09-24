import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "api/cookies";
import { instance } from "api/axios";
import { useSetRecoilState } from "recoil";
import Modal from "components/layout/Modal";
import EmailAlert from "components/login/EmailAlert";
import StartPage from "components/etc/StartPage";
import { getMyProfile } from "api/mypageApi";
import { loginState } from "state/atom";

const GoogleLogin = () => {
  const [email, setEmail] = useState("");
  /* EMAIL수신동의 ---------------------------------------------------------------- */
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const google = async () => {
        try {
          const res = await instance.get(`/user/signin/google?code=${code}`);
          if (await res.headers.authorization) {
            setCookie("accessToken", res.headers.authorization);
            setCookie("refreshToken", res.headers.refreshtoken);
            setIsLogin(true);

            const { data } = await getMyProfile();
            setEmail(data.data.userEmail);
            if (data.data.isAccepted) {
              return setTimeout(() => navigate("/"), 500);
            } else {
              getCookie("emailAlertCookie_google") === data.data.userEmail
                ? setTimeout(() => navigate("/"), 500)
                : setShowEmailAlert(true);
            }
          }
        } catch (err) {
          window.alert("LOGIN FAILED!");
          window.location.replace("/");
          console.log(err);
        }
      };
      google();
    }
  }, []);

  const handleEmailAlert = () => {
    setShowEmailAlert(false);
    navigate("/");
  };

  return (
    <div>
      <StartPage />
      {showEmailAlert ? (
        <Modal handleOpenModal={handleEmailAlert} height="216px">
          <EmailAlert
            handleOpenModal={handleEmailAlert}
            social="google"
            email={email}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default GoogleLogin;
