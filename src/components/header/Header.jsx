import icons from "assets";
import styled from "styled-components";
import { fontSize } from "styles/theme";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const { HeaderLogo, MyPageLogo } = icons;
  const navigate= useNavigate()

  const onClickMain=()=>{
    navigate("/")
  }
  const onClickMypage=()=>{
    navigate("/mypage")
  }

  return (
    <StHeader >
      <HeaderLogo onClick={onClickMain} />
      <StHeaderTitle>{title}</StHeaderTitle>
      <MyPageLogo onClick={onClickMypage}/>
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
  font-size: ${fontSize.large20};
`;

export default Header;
