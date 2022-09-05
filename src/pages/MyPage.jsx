import MobileLayout from "components/layout/MobileLayout";
import User from "components/mypage/User";
import styled from "styled-components";

const MyPage = () => {
  return (
    <MobileLayout title="MY">
      <User />
    </MobileLayout>
  );
};

export default MyPage;
