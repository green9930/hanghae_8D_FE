// import { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Router from "shared/Router";
import styled from "styled-components";
import { colors } from "styles/theme";

const App = () => {
  return (
    <>
      <BrowserView>
        <ResponsiveContainer>
          <Router />
        </ResponsiveContainer>
      </BrowserView>
      <MobileView>
        <Router />
      </MobileView>
    </>
  );
};

const ResponsiveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    333.21deg,
    ${colors.mainP} 18.97%,
    ${colors.subP} 148.99%
  );
`;

export default App;
