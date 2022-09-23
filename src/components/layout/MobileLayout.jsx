import { BrowserView, MobileView } from "react-device-detect";
import styled from "styled-components";
import Header from "components/header/Header";
import { colors } from "styles/theme";
import bg from "assets/bg.png";

const MobileLayout = ({ title, children }) => {
  return (
    <>
      <BrowserView>
        <StBackground>
          <StBackgroundImg>
            <img alt="background" src={bg} />
          </StBackgroundImg>
          <StBrowserLayout>
            <StBrowserHeader>
              <Header title={title} />
            </StBrowserHeader>
            {children}
          </StBrowserLayout>
        </StBackground>
      </BrowserView>
      <MobileView>
        <StMobileLayout>
          <StMobileHeader>
            <Header title={title} />
          </StMobileHeader>
          {children}
        </StMobileLayout>
      </MobileView>
    </>
  );
};

export default MobileLayout;

const StBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
`;

const StBackgroundImg = styled.div`
  width: 514px;
  position: absolute;
  bottom: 0;
  left: 14.5%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StBrowserLayout = styled.div`
  width: 520px;
  height: 100%;
  position: relative;
  overflow-y: scroll;
  left: 56%;
  background: ${colors.white};
`;

const StBrowserHeader = styled.div`
  width: 520px;
  position: fixed;
  top: 0;
  left: 56%;
  z-index: 100;
`;

const StMobileLayout = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  background: ${colors.white};
`;

const StMobileHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
