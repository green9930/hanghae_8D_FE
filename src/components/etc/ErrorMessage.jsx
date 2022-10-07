import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/theme";
import icons from "assets";

const ErrorMessage = () => {
  const navigate = useNavigate();
  const { Error, ErrorHome } = icons;

  return (
    <StErrorMessage>
      <ErrorTitle>404</ErrorTitle>
      <p>
        Page Not Found
        <br />
        <br /> 홈으로 이동하시거나,
        <br />
        뒤로가기를 눌러주세요😂
      </p>
      <StError>
        <Error />
        <StErrorHome>
          <ErrorHome onClick={() => navigate("/")} />
        </StErrorHome>
      </StError>
    </StErrorMessage>
  );
};

const StErrorMessage = styled.div`
  position: relative;
  top: 64px;
  padding: 70px 35px 0px 35px;
  background: ${colors.white};
  height: calc(100vh - 64px);

  p {
    margin-top: 10px;
    color: ${colors.grey3};
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    font-size: 20px;
    line-height: 24px;
  }
`;

const ErrorTitle = styled.h1`
  color: ${colors.mainP};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
  font-size: 70px;
  letter-spacing: -1.5px;
`;

const StError = styled.div`
  margin-top: 60px;
  position: relative;
`;

const StErrorHome = styled.div`
  position: absolute;
  top: 26px;
  left: 160px;
  cursor: pointer;
`;

export default ErrorMessage;
