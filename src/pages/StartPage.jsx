import Start from "components/etc/Start";
import styled from "styled-components";
import { colors } from "styles/theme";
import { BrowserView, MobileView } from "react-device-detect";
import bg from "assets/bg.png";

const StartPage = () => {
  return (
    <>
      <BrowserView>
        <StBackground>
          <StBackgroundImg>
            <img alt="background" src={bg} />
          </StBackgroundImg>
          <StBrowserLayout>
            <Start />
          </StBrowserLayout>
        </StBackground>
      </BrowserView>
      <MobileView>
        <StMobileLayout>
          <Start />
        </StMobileLayout>
      </MobileView>
    </>
  );
};

export default StartPage;

const StBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-y: scroll;
  @media screen and (min-width: 950px) {
    display: flex;
    justify-content: space-around;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StBackgroundImg = styled.div`
  width: 400px;

  img {
    padding-top: 64px;
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
  @media (min-width: 950px) {
    width: 500px;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StMobileLayout = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  background: ${colors.white};
`;
