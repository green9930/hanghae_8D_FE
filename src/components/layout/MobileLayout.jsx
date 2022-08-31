import styled from "styled-components";

const MobileLayout = (props) => {
  return <StLayout>{props.children}</StLayout>;
};

export default MobileLayout;

const StLayout = styled.div`
  max-width: 375px;
  width: 100%;
  background: lightgray;
  margin: 0 auto;
`;
