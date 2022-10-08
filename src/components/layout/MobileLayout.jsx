import styled from "styled-components";
import Header from "components/header/Header";
import { colors } from "styles/theme";
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
    <StMobileLayout>
      <StMobileHeader>
        <Header title={title} />
      </StMobileHeader>
      {children}
    </StMobileLayout>
  );
};

export default MobileLayout;

const StMobileLayout = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  background: ${colors.white};
  @media screen and (min-width: 950px) {
    width: 500px;
  }
`;

const StMobileHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  @media screen and (min-width: 950px) {
    width: 500px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
