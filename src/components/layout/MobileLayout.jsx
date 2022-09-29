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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StBackgroundImg = styled.div`
  padding-top: 64px;
  width: 360px;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 10%;

  img {
    width: 100%;
    height: 100%;
    @media screen and (max-width: 950px) {
      display: none;
    }
  }
`;

const StBrowserLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: ${colors.white};
  min-width: 360px;
  position: absolute;
  left: 55%;

  @media (min-width: 950px) {
    width: 500px;
  }

  @media (max-width: 950px) {
    left: 50%;
    transform: translateX(-50%);
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StBrowserHeader = styled.div`
  width: 100%;
  position: fixed;
  z-index: 100;
  @media (min-width: 950px) {
    width: 500px;
  }
`;

const StMobileLayout = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  background: ${colors.mainP};
`;

const StMobileHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;
