import styled from "styled-components";
import icons from "assets";
import Button from "components/elements/Button";
import { colors } from "styles/theme";

const MyPageFooter = () => {
  const { SendMessage, Logout, Unregister } = icons;

  return (
    <UserInfoFooter>
      <StFooterBtn>
        <Button variant="image">
          <SendMessage />
          <span>의견보내기</span>
        </Button>
      </StFooterBtn>
      <StFooterBtn>
        <Button variant="image">
          <Logout />
          <span>로그아웃</span>
        </Button>
      </StFooterBtn>
      <StFooterBtn>
        <Button variant="image">
          <Unregister />
          <span>회원탈퇴</span>
        </Button>
      </StFooterBtn>
    </UserInfoFooter>
  );
};

const UserInfoFooter = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  background: ${colors.grey7};
  padding-top: 30px;
  flex-grow: 1;
`;

const StFooterBtn = styled.div`
  button {
    align-items: center;
    margin-bottom: 10px;
    margin-left: 35px;
    display: flex;
    gap: 10px;

    span {
      color: ${colors.grey1};
    }
  }
`;

export default MyPageFooter;
