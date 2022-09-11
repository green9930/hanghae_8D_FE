import Header from "components/header/Header";
import styled from "styled-components";

const MobileLayout = ({ title, children }) => {
  return (
    <StLayout>
      <Header title={title} />
      {children}
    </StLayout>
  );
};

export default MobileLayout;

const StLayout = styled.div`
  width: 100%;
  margin: 0 auto;
`;
