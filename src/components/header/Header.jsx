import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/headerLogo.svg";
import { ReactComponent as MyPageLogo } from "../../assets/myPageLogo.svg";
const Header = ({ title }) => {
  return (
    <StHeader>
      <Logo />
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
