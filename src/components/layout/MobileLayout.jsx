import { BrowserView, MobileView } from "react-device-detect";
import styled from "styled-components";
import Header from "components/header/Header";
import { colors } from "styles/theme";
import bg from "assets/bg.png";
import { useEffect } from "react";

const MobileLayout = ({ title, children }) => {
  const setScreenSize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", setScreenSize);
    return () => window.removeEventListener("resize", setScreenSize);
  });
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
  display: flex;
  justify-content: space-around;
`;

const StBackgroundImg = styled.div`
  width: 26vw;
  /* position: absolute;
  bottom: 0;
  left: 14.5%; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media screen and (max-width: 950px) {
      display: none;
    }
  }
`;

const StBrowserLayout = styled.div`
  width: 500px;
  height: 100%;
  /* position: relative; */
  /* left: 56%; */
  overflow-y: scroll;
  background: ${colors.white};
`;

const StBrowserHeader = styled.div`
  width: 500px;
  position: fixed;
  /* top: 0;
  left: 56%; */
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
