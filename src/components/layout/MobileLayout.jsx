import styled from "styled-components";
import Header from "components/header/Header";

const MobileLayout = ({ title, children }) => {
  return (
    <StLayout>
      <StHeader>
        <Header title={title} />
      </StHeader>
      {children}
    </StLayout>
  );
};

export default MobileLayout;

const StLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const StHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
`;
