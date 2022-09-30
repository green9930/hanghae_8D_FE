import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie, setWeekCookie } from "api/cookies";
import { instance } from "api/axios";
import { useSetRecoilState } from "recoil";
import Modal from "components/layout/Modal";
import EmailAlert from "components/login/EmailAlert";
import RegisterAlert from "components/login/RegisterAlert";
import StartPage from "pages/StartPage";
import { getMyProfile } from "api/mypageApi";
import { loginState, newAlarmsState } from "state/atom";

const GoogleLogin = () => {
  const [email, setEmail] = useState("");
  /* EMAIL수신동의 ---------------------------------------------------------------- */
  const [showEmailAlert, setShowEmailAlert] = useState(false);
  const [showRegisterAlert, setShowRegisterAlert] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const setIsLogin = useSetRecoilState(loginState);
  const setNewAlarms = useSetRecoilState(newAlarmsState);
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      const google = async () => {
        try {
          const res = await instance.get(`/user/signin/google?code=${code}`);
          if (await res.headers.authorization) {
            setCookie("accessToken", res.headers.authorization);
            setWeekCookie("refreshToken", res.headers.refreshtoken);
            setIsLogin(true);

            const { data } = await getMyProfile();
            setNewAlarms(!data.data.alarmStatus);
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
          setRegisterMessage(err.response.data.errorMessage);
          setShowRegisterAlert(true);
        }
      };
      google();
    }
  }, []);

  const handleEmailAlert = () => {
    setShowEmailAlert(false);
    navigate("/");
  };

  const handleRegisterAlert = () => {
    setShowRegisterAlert(false);
    window.location.replace("/login");
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
      {showRegisterAlert ? (
        <Modal handleOpenModal={handleRegisterAlert} height="216px">
          <RegisterAlert
            handleOpenModal={handleRegisterAlert}
            message={registerMessage}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default GoogleLogin;
