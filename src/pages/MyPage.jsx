import MobileLayout from "components/layout/MobileLayout";
import UserInfo from "components/mypage/UserInfo";
import styled from "styled-components";

const MyPage = () => {
  return (
    <MobileLayout title="MY">
      <UserInfo />
    </MobileLayout>
  );
};

export default MyPage;
