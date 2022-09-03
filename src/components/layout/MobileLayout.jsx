import Header from "components/header/Header";
import styled from "styled-components";

const MobileLayout = (props) => {
  return (
    <StLayout>
      <Header />
      {props.children}
    </StLayout>
  );
};

export default MobileLayout;

const StLayout = styled.div`
  width: 100%;
  /* background: lightgray; */
  margin: 0 auto;
`;
