import icons from "assets";
import styled from "styled-components";

const Header = ({ title }) => {
  const { HeaderLogo, MyPageLogo } = icons;

  return (
    <StHeader>
      <HeaderLogo />
      <StHeaderTitle>{title}</StHeaderTitle>
      <MyPageLogo />
    </StHeader>
  );
};

const StHeader = styled.div`
  background-color: #9083f7;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const StHeaderTitle = styled.div`
  color: white;
`;

export default Header;
