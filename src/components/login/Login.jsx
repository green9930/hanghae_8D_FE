import styled from "styled-components";

const Login = () => {
  return (
    <div>
      <StLoginTitle>
        안녕하세요. <br />
        책첵입니다.
      </StLoginTitle>
      <StLoginContent>서비스 이용을 위해 로그인해 주세요.</StLoginContent>
      <StBtns>
        <button>카카오 계정으로 로그인</button>
        <button>네이버 계정으로 로그인</button>
        <button>구글 계정으로 로그인</button>
      </StBtns>
      <StCopyright>ⓒ 항해 8기 2조</StCopyright>
    </div>
  );
};

const StLoginTitle = styled.div`
  font-size: 39px;
  margin-left: 42px;
  margin-top: 70px;
  letter-spacing: -1px;
`;
const StLoginContent = styled.div`
  font-size: 16px;
  color: 999999;
  margin-left: 42px;
  margin-top: 10px;
  letter-spacing: -1px;
`;
const StBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
const StCopyright = styled.div`
  margin-top: 18px;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  color: #cccccc;
`;

export default Login;
