import { useRecoilValue } from "recoil";
import MobileLayout from "components/layout/MobileLayout";
import UserInfo from "components/mypage/UserInfo";
import { myPageTitleState } from "state/atom";

const MyPage = () => {
  const titleState = useRecoilValue(myPageTitleState);
  return (
    <MobileLayout title={titleState}>
      <UserInfo />
    </MobileLayout>
  );
};

export default MyPage;
