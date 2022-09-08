import styled from "styled-components";
import MobileLayout from "components/layout/MobileLayout";
import Detail from "components/detail/Detail";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <MobileLayout>
      <Detail page={id} />
    </MobileLayout>
  );
};

export default DetailPage;
