import MobileLayout from "components/layout/MobileLayout";
import UserInfo from "components/mypage/UserInfo";
import { useRecoilValue } from "recoil";
import { myPageTitleState } from "state/atom";
import styled from "styled-components";

const MyPage = () => {
  const titleState = useRecoilValue(myPageTitleState);
  return (
    <MobileLayout title={titleState}>
      <UserInfo />
    </MobileLayout>
  );
};

export default MyPage;
