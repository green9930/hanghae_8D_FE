import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "components/elements/Button";
import { fontSize } from "styles/theme";
import icons from "assets";
import { getCookie } from "api/cookies";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { HeaderLogo, MyPageLogo } = icons;

  const clickNavigator = () =>
    getCookie("accessToken") ? navigate("/mypage") : navigate("/login");

  return (
    <StHeader>
      <Button variant="image" onClickHandler={() => navigate("/")}>
        <HeaderLogo />
      </Button>
      <StHeaderTitle>{title}</StHeaderTitle>
      <Button variant="image" onClickHandler={clickNavigator}>
        <MyPageLogo />
      </Button>
    </StHeader>
  );
};

const StHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: #9083f7;
  padding: 0 20px;
`;

const StHeaderTitle = styled.div`
  color: white;
  font-size: ${fontSize.large20};
  font-family: "twayfly", "Noto Sans KR", sans-serif;
`;

export default Header;
