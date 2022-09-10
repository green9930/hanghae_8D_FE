import styled from "styled-components";
import { colors } from "styles/theme";
import icons from "assets";
import Button from "components/elements/Button";
import { useNavigate } from "react-router-dom";

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
  padding: 70px 35px 0px 35px;
  p {
    margin-top: 10px;
    font-size: 20px;
    line-height: 24px;
    font-family: "twayfly", "Noto Sans KR", sans-serif;
    color: ${colors.grey3};
  }
`;

const ErrorTitle = styled.h1`
  font-size: 70px;
  letter-spacing: -1.5px;
  color: ${colors.mainP};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
`;
const StError = styled.div`
  margin-top: 60px;
  position: relative;
`;

const StErrorHome = styled.div`
  position: absolute;
  top: 26px;
  left: 160px;
`;
export default ErrorMessage;
