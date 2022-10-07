import styled from "styled-components";
import MainCarousel from "components/main/MainCarousel";
import MainList from "components/main/MainList";
import { colors } from "styles/theme";

const Main = () => {
  return (
    <StMainWrap>
      <MainCarousel />
      <StMainContainer>
        <MainList />
      </StMainContainer>
    </StMainWrap>
  );
};

const StMainWrap = styled.div`
  width: 100%;
  min-height: calc(100vh - 64px);
  position: relative;
  top: 64px;
  left: 0;
  background-color: ${colors.white};
`;

const StMainContainer = styled.div`
  position: sticky;
  top: 64px;
  left: 0;
  background-color: ${colors.white};
`;

export default Main;
