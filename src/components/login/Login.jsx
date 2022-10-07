import styled from "styled-components";
import Button from "components/elements/Button";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUTH_URL } from "api/login";
import { colors, fontSize } from "styles/theme";
import icons from "assets";

const Login = () => {
  const { LogoKakao, LogoGoogle, LogoNaver } = icons;

  return (
    <StLogin>
      <StLoginMessage>
        <StLoginTitle>
          안녕하세요. <br /> <span>책첵</span>입니다.
        </StLoginTitle>
        <StLoginContent>서비스 이용을 위해 로그인해 주세요.</StLoginContent>
      </StLoginMessage>
      <StBtns>
        <Button
          size="large_round"
          onClickHandler={() => (window.location.href = KAKAO_AUTH_URL)}
        >
          <LogoKakao />
          카카오 계정으로 로그인
        </Button>
        <Button
          size="large_round"
          onClickHandler={() => (window.location.href = NAVER_AUTH_URL)}
        >
          <LogoNaver />
          네이버 계정으로 로그인
        </Button>
        <Button
          size="large_round"
          onClickHandler={() => (window.location.href = GOOGLE_AUTH_URL)}
        >
          <LogoGoogle />
          구글 계정으로 로그인
        </Button>
      </StBtns>
      <StCopyright>ⓒ 항해 8기 2조</StCopyright>
    </StLogin>
  );
};

const StLogin = styled.div`
  position: relative;
  top: 64px;
  padding: 0 35px;
  @media screen and (max-width: 350px) {
    padding: 0 15px;
  }
  height: calc(100vh - 64px);
  background: ${colors.white};
`;
const StLoginMessage = styled.div`
  margin: 0 7px 60px 7px;
  padding-top: 70px;
  background: ${colors.white};
`;

const StLoginTitle = styled.h2`
  color: ${colors.black};
  font-size: ${fontSize.large28};
  font-weight: 400;

  span {
    color: ${colors.mainP};
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.large32};
  }
`;

const StLoginContent = styled.span`
  margin-top: 10px;
  font-size: ${fontSize.regular16};
  color: ${colors.grey3};
`;

const StBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;

  button {
    text-align: center;
    position: relative;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: ${fontSize.regular18};

    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const StCopyright = styled.span`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: ${colors.grey4};
  font-weight: 400;
`;

export default Login;
