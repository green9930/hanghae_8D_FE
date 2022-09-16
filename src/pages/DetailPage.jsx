import { useParams } from "react-router-dom";
import MobileLayout from "components/layout/MobileLayout";
import Detail from "components/detail/Detail";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <MobileLayout title="체크">
      <Detail page={id} />
    </MobileLayout>
  );
};

export default DetailPage;
